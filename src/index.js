import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './setup/serviceWorker';

import 'bootstrap/js/src/index.js'
import './styles/index.css';

import Chart from './components/Chart.js'
import CurrencyConverter from './App.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar.js';
import Footer from './components/footer.js'

ReactDOM.render(
  <React.StrictMode>
		<Router>
      <Navbar />
			<Switch>
        <Route path="/graph" component={Chart} />
				<Route path="/" component={CurrencyConverter} />
			</Switch>
      <Footer />
		</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
