import React, { Component } from "react";
import API from "../utils/API";
import Product from "../components/Product"

class Order extends Component {
  state = {
    categories: [],
    products:[]
  };
  componentDidMount() {
    let newState = this.state;
    
    API.getProductsActive().then(respProd => {
      newState.products = respProd.data;
      let cats = respProd.data.map(prod => prod.CategoryId)      

      API.getCategories().then(respCat => {        
        newState.categories = respCat.data.filter(cat => cats.includes(cat.id))
        this.setState(newState);
        console.log(this.state)
      })
      
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
