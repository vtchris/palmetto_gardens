import React, { Component } from "react";
import API from "../utils/API";
import Product from "../components/Product"

class Order extends Component {
  state = {
    products:[]
  };
  componentDidMount() {
    API.getProductsActive().then((response) => {
      console.log(response.data)
      this.setState({products: response.data});
    }).catch(err => { console.log(err)})
  }

  render() {
    return (
      <>
        <h1>Order</h1>
        {this.state.products.map(prod => 
          <Product 
            key={prod.id} 
            name={prod.itm_name} 
            price={prod.itm_prc}
            unit={prod.itm_unit_of_measure} 
          /> )}
      </>
    );
  }
}

export default Order;
