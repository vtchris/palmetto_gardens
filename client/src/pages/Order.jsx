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
<<<<<<< Updated upstream
    
    API.getProductsActive().then(respProd => {
      newState.products = respProd.data;
      let cats = respProd.data.map(prod => prod.CategoryId)      

      API.getCategories().then(respCat => {        
        newState.categories = respCat.data.filter(cat => cats.includes(cat.id))
        this.setState(newState);
        console.log(this.state)
=======

    Promise.all([
      fetch(),
      fetch()
    ]).then(([res1, res2]) => {

    })

   

    // Get active products
    API.getProductsActive()
      .then((respProd) => {
        newState.allProducts = respProd.data;
        let cats = respProd.data.map((prod) => prod.CategoryId);

        // Get ALL categories
        API.getCategories().then((respCat) => {
          // Filter categories to show only active categories with products
          newState.breadcrumb.categories = respCat.data.filter(
            (cat) => cat.active && cats.includes(cat.id)
          );

          this.updateState(newState);
        });
>>>>>>> Stashed changes
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
