import React from 'react'
import Navbar from './components/navbar.js'
import DropDown from './components/dropDownList.js'
import ListAllRate from './components/ListAllRate.js'

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
      base: "USD",
      date: '',
      rates: null,
      base2: "HKD",
      rates2: null,
      value: '1.0000',
      value2: null
    };

    this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
    this.changeSecondaryCurrency = this.changeSecondaryCurrency.bind(this);
    this.fetchUpdate = this.fetchUpdate.bind(this);
    //this.convert = this.convert.bind(this);
  }

  componentDidMount() {
    this.fetchDefault();
  }

  fetchDefault() {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.base}`)
      .then(checkStatus)
      .then(json)
      .then((response) => {
          this.setState({
          rates: response.rates,
          value1: "1.000",
          value2: response.rates[this.state.base2]
        })
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  fetchUpdate(location, boolean) {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${location}`)
      .then(checkStatus)
      .then(json)
      .then((response) => {
        if (boolean === true) {
          this.setState({
            base: response.base,
            rates: response.rates,
            value1: "1.000",
            value2: response.rates[this.state.base2]
          })
        } else {
          this.setState({
            base2: response.base,
            rates: response.rates,
            value1: response.rates[this.state.base],
            value2: "1.000"
          })
        }
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  changeBaseCurrency(event) {
    const primaryBase = event.target.text
    const a = true;
    console.log(primaryBase)

    // refresh new pricing according to the change of base currency
    this.fetchUpdate(primaryBase, true);
  }

  changeSecondaryCurrency(event) {
    const secondaryBase = event.target.text
    const b = false;
    console.log(secondaryBase)
    // add value conversion and set base value as $1
    this.fetchUpdate(secondaryBase, false)
  }

  // convert(event) {
  //   const conversionRate = this.state.value2;
  //   const tempAnswer = userInput * conversionRate;
  //   this.setState({ value2: tempAnswer});
  //
  //   // return <input type="number" className="form-control col-4 ml-2" value={tempAnswer} />;
  // }

  render() {
    const { base, rates, base2, rates2, value1, value2} = this.state;

    return (
      <div>
        <div id="container" className="container-fluid">
          <Navbar />
          <div className="text-center p-3 mb-2">
            <h2 className="mb-2">Currency Converter</h2>
          </div>
          <DropDown rates={rates} base={base} base2={base2} value1={value1} value2={value2} changeBaseCurrency={this.changeBaseCurrency} changeSecondaryCurrency={this.changeSecondaryCurrency} />
        </div>
        <div>
          <ListAllRate />
        </div>
      </div>
    )
  }
}

export default CurrencyConverter;
