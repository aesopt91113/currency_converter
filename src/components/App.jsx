import React from 'react';
import { Switch, Route } from "react-router-dom";

import Navbar from './Navbar';
import Converter from './Converter';
import Graph from './Graph';

function App() {
  return (
    <div id="app" className="App">
      <Navbar />

      <Switch>
        <Route path="/graph" component={Graph} />
        <Route path="/" component={Converter} />
      </Switch>
    </div>
  );
}

export default App;
