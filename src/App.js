import React from 'react'
import Navbar from './components/navbar.js'
import DropDown from './components/dropDownList.js'

// check status after fetch
const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}

// convert data into jsoin format
const json = (response) => response.json()

//------------------------------------------------------------------------
// currency converter main
class CurrencyConverter extends React.Component { //changed
  constructor(props) {
    super(props);

    this.state = {
      base: "",
      date: '',
      rates: null,
    };
  }

  componentDidMount() {
    this.fetchPrimaryCurrency();
  }

  fetchPrimaryCurrency(country) {
    //const code = string(country);
    fetch("https://alt-exchange-rate.herokuapp.com/latest?base=USD")
      .then(checkStatus)
      .then(json)
      .then((response) => {
        console.log(response);
        this.setState({ rates: response.rates });
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  handleTopChange(event) {
    //const currency1 = this.convert(event.taget.value, this.state., this.)
  }

  changeToBottomCurrency(amount, rate) {
    //return amount * this.state.rates{}
  }

  convert(amount, rate, equation) { // should be fine
    const input = parseFloat(amount);

    if (Number.isNan(input)) {
      return '';
    }
    return equation(input, rate).toFixed(4);
  }

  findSecondaryCurrency() {
    //if
  }

  render() {
    const { base, date, rates } = this.state;

    return (
      <div id="container" className="container-fluid">
        <Navbar />
        <div className="text-center p-3 mb-2">
          <h2 className="mb-2">Currency Converter</h2>
        </div>
        <DropDown rates={rates} />
      </div>
    )
  }
}

export default CurrencyConverter;
