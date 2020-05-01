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

//-----------------------------------------------------------------------
// currency converter main
class CurrencyConverter extends React.Component { //changed
	constructor(props) {
		super(props);

		this.state = {
			base: "USD",
			date: '',
			rates: null,
			base2: "HKD",
			quote1: null,
			quote2: null,
			amount1: "",
			finalAmount: ""
		};

		this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
		this.changeSecondaryCurrency = this.changeSecondaryCurrency.bind(this);
		this.fetchUpdate = this.fetchUpdate.bind(this);
		this.conversion = this.conversion.bind(this);
	}

	componentDidMount() {
		//const finalAmount = this.props.convertedAmount;

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
					quote2: response.rates[this.state.base2]
				})
			// console.log(this.state.quote2, response.rates[this.state.base2])
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
		const { base, rates, base2, quote1, quote2, amount1, finalAmount } = this.state;

		return (
			<div>
				<div id="container" className="container-fluid pb-3">
					<Navbar />
					<div className="text-center p-3 mb-1">
						<h2 className="mb-2">Currency Converter</h2>
					</div>
					<DropDown rates={rates} base={base} base2={base2} quote1={quote1} quote2={quote2} changeBaseCurrency={this.changeBaseCurrency} changeSecondaryCurrency={this.changeSecondaryCurrency} conversion={this.conversion} amount1={amount1} finalAmount={finalAmount} />
				</div>
				<div className="container-fluid pt-2 pl-4 pb-2 text-center border-top">
					<h4>Currency Rate</h4>
					<ListAllRate rates={rates}/>
				</div>
				<footer className="pt-2 pl-2 pb-2 footerBackground footerText d-flex inline-block justify-content-center">
					<a className="nav-link iconpad footerLogoColor" href="https://www.instagram.com/meyran.l/" target="blank"><i className="fab fa-instagram"></i></a>
					<a className="nav-link iconpad footerLogoColor" href="https://www.facebook.com/meyran.lee" target="blank"><i className="fab fa-facebook-square"></i></a>
					<a className="nav-link footerLogoColor" href="https://github.com/aesopt91113" target="blank"><i className="fab fa-github"></i></a>
				</footer>
			</div>
		)
	}
}

export default CurrencyConverter;
