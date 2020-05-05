import React from 'react';
import _ from 'lodash';

import { apiFetch } from '../services/api_utils'

export default class Converter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      primaryBase: 'USD',
      secondaryBase: 'HKD',
      primaryInput: 1,
      secondaryInput: 1,
      activeInputKey: 'primaryInput',
      conversionRates: {},
      conversionLoading: true,
      tableBase: 'USD',
      tableRates: {},
      tableLoading: true
    }

    this.changeInput = this.changeInput.bind(this)
    this.changePrimaryBase = this.changePrimaryBase.bind(this)
    this.getConversionRates = this.getConversionRates.bind(this)

    this.changeTableBase = this.changeTableBase.bind(this)
    this.getTableRates = this.getTableRates.bind(this)
  }

  componentDidMount() {
    this.getConversionRates()
    this.getTableRates()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.primaryBase !== this.state.primaryBase) {
      this.getConversionRates()
    }

    if (prevState.tableBase !== this.state.tableBase) {
      this.getTableRates()
    }
  }

  changeInput(e, inputKey) {
    const value = e.target.value

    this.setState({ activeInputKey: inputKey, [inputKey]: value })
  }

  changePrimaryBase(newBase) {
    this.setState({ primaryBase: newBase, conversionLoading: true })
  }

  getConversionRates() {
    const { primaryBase } = this.state

    apiFetch(`latest?base=${primaryBase}`)
      .then((response) => {
        this.setState({
          conversionRates: response.rates,
        })
      })
      .catch(error => {
        console.error(error.message);
      })
      .finally(() => {
        this.setState({
          conversionLoading: false
        })
      })
  }

  changeTableBase(newBase) {
    this.setState({ tableBase: newBase, tableLoading: true })
  }

  getTableRates() {
    const { tableBase } = this.state

    apiFetch(`latest?base=${tableBase}`)
      .then((response) => {
        this.setState({
          tableRates: response.rates,
        })
      })
      .catch(error => {
        console.error(error.message);
      })
      .finally(() => {
        this.setState({
          tableLoading: false
        })
      })
  }

  render() {
    const {
      activeInputKey, primaryBase, primaryInput, secondaryBase, secondaryInput, conversionRates,
      tableBase, tableRates, tableLoading
    } = this.state

    let activeInputValue = primaryInput
    let primaryConversionRate = 1
    let secondaryConversionRate = conversionRates[secondaryBase]

    if (activeInputKey !== 'primaryInput') {
      activeInputValue = secondaryInput
      primaryConversionRate = 1 / conversionRates[secondaryBase]
      secondaryConversionRate = 1
    }

    return (
      <div id="comp-converter" className="container py-3">
        <h2 className="mb-3">Currency Converter</h2>

        <div className="row">
          <div className="col">
            <h3>Primary Currency</h3>

            <div className="input-group">
              <div className="input-group-prepend">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ primaryBase }</button>
                <div className="dropdown-menu">
                  {
                    Object.keys(_.omit(conversionRates, [primaryBase])).map((key) => (
                      <span key={key} className="dropdown-item" onClick={() => this.changePrimaryBase(key)}>{key}</span>
                    ))
                  }
                </div>
              </div>
              <input type="number" className="form-control" aria-label="Text input with dropdown button" value={activeInputValue * primaryConversionRate || ''} onChange={(e) => { this.changeInput(e, 'primaryInput') }} />
            </div>
          </div>

          <div className="col">
            <h3>Secondary Currency</h3>

            <div className="input-group">
              <div className="input-group-prepend">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ secondaryBase }</button>
                <div className="dropdown-menu">
                  {
                    Object.keys(_.omit(conversionRates, [secondaryBase])).map((key) => (
                      <span key={key} className="dropdown-item">{key}</span>
                    ))
                  }
                </div>
              </div>
              <input type="number" className="form-control" aria-label="Text input with dropdown button" value={activeInputValue * secondaryConversionRate || ''} onChange={(e) => { this.changeInput(e, 'secondaryInput') }} />
            </div>
          </div>
        </div>

        <hr />

        <div>
          <h3 className="mb-3">Conversion Table</h3>

          <div className="mb-3">
            <h4>Base Currency</h4>

            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{tableBase}</button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                  Object.keys(_.omit(tableRates, [tableBase])).map((key) => (
                    <span key={key} className="dropdown-item" onClick={() => this.changeTableBase(key)}>{key}</span>
                  ))
                }
              </div>
            </div>
          </div>

          {
            tableLoading ? (
              <div>
                <i className="fas fa-spinner fa-spin fa-3x" />
              </div>
            ) : (
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Country</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(tableRates).map((key) => {
                      const value = tableRates[key]

                      return (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            )
          }
        </div>
      </div>
    )
  }
}
