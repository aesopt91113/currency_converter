import React from 'react';

import Chart from 'chart.js';
import _ from 'lodash';

// check status after fetch
const checkStatus = (response) => {
	if (response.ok) {
		// .ok returns true if response status is 200-299
		return response;
	}
	throw new Error('Request was either a 404 or 500');
}

// convert data into json format
const json = (response) => response.json()

//----------------------------------------------------------------------------------------------------
class Graph extends React.Component {
  constructor(props) {
    super(props);

    // set start date and end date
    this.state = {
      dateStart: new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      dateEnd: new Date().toISOString().split('T')[0],
      country1: "USD",
      country2: "HKD",
      countryName: {},
    }
  }

  componentDidMount() {
    this.fetchChart();
    this.fetchCountryName();
  }

  componentDidUpdate(prevState) {
    if (prevState.country1 !== this.state.country1 || prevState.country2 !== this.state.country2)
      this.fetchChart();
  }

  changeCountry(oldCountry, newCountry) {
    this.setState ({ [oldCountry]: newCountry})
  }

  fetchCountryName() {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.country1}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        this.setState ({
          countryName: data.rates,
        })
        // console.log(this.state.countryName)
        // const omitCoun1 = _.omit(this.state.countryName, [`${this.state.country2}`])
        // const omitCoun2 = _.omit(this.state.countryName, [`${this.state.country1}`])
        //  console.log(omitCoun1, omitCoun2)
      })
  }

  fetchChart() {
    fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${this.state.dateStart}&end_at=${this.state.dateEnd}&base=${this.state.country1}&symbols=${this.state.country2}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        // this gives labels from data
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[this.state.country2]);
        // this chart label is for the chart title
        const graphLabel = `${this.state.country1}/${this.state.country2}`;

        this.buildChart(chartLabels, chartData, graphLabel);
      })
      .catch(error => console.error(error.message));
  }

  buildChart = (labels, data, label) => {
    const elem = document.getElementById('myChart').getContext('2d')
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    console.log(labels,data,label)
    this.chart = new Chart(elem, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }

  render() {
    const { country1, country2, countryName } = this.state;

    return (
      <div className="container-fluid my-3">
        <div className = "text-center my-3">
          <h2>Historical Rate Chart</h2>
        </div>

        <div className= "inline-block d-flex justify-content-center">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle mx-4" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {country1}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              {
                Object.keys(countryName).map((key) => <a className="dropdown-item" key={key} onClick={() => this.changeCountry('country1', key)}>{key}</a>)
              }
            </div>
          </div>
          <h3>to</h3>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle mx-4" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {country2}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              {
                Object.keys(countryName).map((key) => <a className="dropdown-item" key={key} onClick={() => this.changeCountry('country2', key)}>{key}</a>)
              }
            </div>
          </div>
        </div>

        <hr />

        <div>
          <canvas id="myChart" width="300" height="100"></canvas>
        </div>
      </div>
    )
  }
}

export default Graph;
