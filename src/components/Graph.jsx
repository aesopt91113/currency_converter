import React from 'react';
import _ from 'lodash';
import Chart from 'chart.js'

import { apiFetch } from '../services/api_utils';

export default class Graph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chartInstance: null,
      baseKeys: [],
      primaryBase: 'USD',
      secondaryBase: 'HKD',
      startDate: '2017-01-01',
      endDate: '2019-01-30',
      ratesLoading: true
    }

    this.setupChart = this.setupChart.bind(this)
    this.getBaseKeys = this.getBaseKeys.bind(this)
    this.getRates = this.getRates.bind(this)
  }

  componentDidMount() {
    this.getBaseKeys()
    this.getRates()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.primaryBase !== this.state.primaryBase || prevState.secondaryBase !== this.state.secondaryBase) {
      this.getRates()
    }
  }

  setupChart(historicalRates) {
    const { chartInstance, secondaryBase } = this.state
    if (chartInstance) chartInstance.destroy()

    console.log()

    const elem = document.getElementById('myChart').getContext('2d')
    const newInstance = new Chart(elem, {
        type: 'line',
        data: {
          labels: Object.keys(historicalRates),
          datasets: [
            {
              label: secondaryBase,
              data: Object.keys(historicalRates).map((dateKey) => historicalRates[dateKey][secondaryBase])
            }
          ]
        }
    });

    this.setState({ chartInstance: newInstance })
  }

  changeBase(baseKey, baseValue) {
    this.setState({ [baseKey]: baseValue, ratesLoading: true })
  }

  getBaseKeys() {
    apiFetch(`latest`)
      .then((response) => {
        this.setState({
          baseKeys: Object.keys(response.rates),
        })
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  getRates() {
    const { primaryBase, secondaryBase, startDate, endDate } = this.state

    apiFetch(`history?start_at=${startDate}&end_at=${endDate}&base=${primaryBase}&symbols=${secondaryBase}`)
      .then((response) => {
        this.setupChart(response.rates)
      })
      .catch(error => {
        console.error(error.message);
      })
      .finally(() => {
        this.setState({
          ratesLoading: false
        })
      })
  }

  render() {
    const { ratesLoading, primaryBase, secondaryBase, baseKeys } = this.state

    return (
      <div id="comp-graph" className="container py-3">
        <h3 className="mb-3">History Rate Chart</h3>

        <div className="row justify-content-between align-items-center">
          <div className="col">
            <div className="mb-3">
              <h4>Primary</h4>

              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{primaryBase}</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {
                    _.without(baseKeys, primaryBase).map((key) => (
                      <span key={key} className="dropdown-item" onClick={() => this.changeBase('primaryBase', key)}>{key}</span>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="mb-3">
              <h4>Secondary</h4>

              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{secondaryBase}</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {
                    _.without(baseKeys, secondaryBase).map((key) => (
                      <span key={key} className="dropdown-item" onClick={() => this.changeBase('secondaryBase', key)}>{key}</span>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {
          ratesLoading && <div><i className="fas fa-spinner fa-spin fa-3x" /></div>
        }

        <div className={`position-relative ${ratesLoading && 'd-none'}`}>
          <canvas id="myChart" />
        </div>
      </div>
    )
  }
}