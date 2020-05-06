import React from 'react'
import Navbar from './components/navbar.js'
import DropDown from './components/dropDownList.js'
import ListKey from './components/ListKey.js'
import ListRates from  './components/ListRates.js'
import CurrencyList from './components/CurrencyList.js'

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

//-----------------------------------------------------------------------
// currency converter main
class CurrencyConverter extends React.Component { //changed
	constructor(props) {
		super(props);

		this.state = {
			base: "USD",
			rates: null,
			base2: "HKD",
			quote1: null,
			quote2: null,
			amount1: "",
			finalAmount: "",
			currencyBase: "USD",
			currencyRate: null,
		};

		this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
		this.changeSecondaryCurrency = this.changeSecondaryCurrency.bind(this);
		this.fetchUpdate = this.fetchUpdate.bind(this);
		this.conversion = this.conversion.bind(this);
		this.changeCurrencyList = this.changeCurrencyList.bind(this);
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
						quote1: "1.000",
						quote2: response.rates[this.state.base2],
						currencyRate: response.rates
					})
				})
				.catch(error => {
					console.error(error.message);
			})
	}

	fetchUpdate(location) { // checked
		// clear all input
		this.setState({
			amount1: "",
			finalAmount: ""
		})
		// fetch new currency
		fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${location}`)
			.then(checkStatus)
			.then(json)
			.then((response) => {
				this.setState({
					base: response.base,
					rates: response.rates,
					quote1: "1.000",
					quote2: response.rates[this.state.base2],
				})
			})
			.catch(error => {
				console.error(error.message);
			})
	}

	conversion(event, boolean) {
		if (boolean) {
			this.setState({
				amount1: event.target.value,
				finalAmount: event.target.value * this.state.quote2 || ""
			})
		} else {
			this.setState({
				amount1: event.target.value * (1 / this.state.quote2) || "",
				finalAmount: event.target.value
			})
		}
	}

	changeCurrencyList(event) {
		const CurrencyListBase = event.target.text;

		this.updateList(CurrencyListBase);
	}

	updateList(location) { // checked
			// fetch new currency
			fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${location}`)
					.then(checkStatus)
					.then(json)
					.then((response) => {
						this.setState({
								currencyBase: response.base,
								currencyRate: response.rates,
						})
					})
					.catch(error => {
							console.error(error.message);
					})
	}

	changeBaseCurrency(event) { //checked
		const primaryBase = event.target.text;

		this.fetchUpdate(primaryBase);
	}

	changeSecondaryCurrency(event) { //checked
		const secondaryBase = event.target.text;

		this.setState({
			base2: secondaryBase,
			quote2: this.state.rates[secondaryBase]
		})
	}

	render() {
		const { base, rates, base2, quote1, quote2, amount1, finalAmount, currencyRate, currencyBase } = this.state;

		return (
			<div>
				<div id="container" className="container-fluid pb-3">
					<div className="text-center p-3 mb-1">
						<h2 className="mb-2">Currency Converter</h2>
					</div>
						<DropDown rates={rates} base={base} base2={base2} quote1={quote1} quote2={quote2} changeBaseCurrency={this.changeBaseCurrency} changeSecondaryCurrency={this.changeSecondaryCurrency} conversion={this.conversion} amount1={amount1} finalAmount={finalAmount} />
				</div>
				<div className="container-fluid pt-2 pl-4 pb-2 text-center border-top col-6">
					<CurrencyList listBase={currencyBase} listRate={currencyRate} updateList={this.changeCurrencyList}/>
					<table class="table table-dark table-bordered">
						<thead>
							<tr>
								<th scope="col">Country</th>
								<th scope="col">Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><ListKey listRate={currencyRate}/></td>
								<td><ListRates listRate={currencyRate}/></td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>
		)
	}
}

export default CurrencyConverter;
