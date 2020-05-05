import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import Produce from "./pages/Produce";
import Services from "./pages/Services";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/produce" component={Produce} />
          <Route exact path="/services" component={Services} />
        </Switch>
      </Router>     
    </div>
  );
}

export default App;
