import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from "./utils/API";
import Admin from "./pages/Admin";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import Produce from "./pages/Produce";
import Services from "./pages/Services";
import './App.css';

class App extends Component {
  state = {
    settings: {}
  }
  componentDidMount = () => {
    API.getSettings().then(results => {     
      this.setState({ settings: results.data[0] });
    })
  }
  render() {  
    return (
      <div className="App">
        <Nav />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/order" component={Order}/>            
            <Route exact path="/produce" component={Produce} />
            <Route exact path="/services" component={Services} />
            <Route path="/admin" component={Admin} /> 
          </Switch>
        </Router>
        <Footer 
          settings={this.state.settings}
        >
        </Footer>
      </div>
    );
  }
}

export default App;