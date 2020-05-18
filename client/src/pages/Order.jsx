import React, { Component } from "react";
import API from "../utils/API";
import Product from "../components/Product";
import ProductSummary from "../components/ProductSummary";
import Category from "../components/Category";

class Order extends Component {
  state = {
    categories: [],
    allProducts: [],
    category: 0,
    products: [],
    product: [],
    cart: [],
  };
  componentDidMount() {
    let newState = this.state;

    API.getProductsActive()
      .then((respProd) => {
        newState.allProducts = respProd.data;
        let cats = respProd.data.map((prod) => prod.CategoryId);

        API.getCategories().then((respCat) => {
          newState.categories = respCat.data.filter(
            (cat) => cat.active && cats.includes(cat.id)
          );

          this.setState(newState);
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleCategoryClick = (e) => {
    const newState = this.state;
    const cat = +e.target.dataset.id;
   
    console.log('***NEW STATE')
    console.log(newState)

    newState.category = cat;
    let stupid = this.state.allProducts
    console.log(cat)
    newState.products = stupid.filter(
      (prod) => prod.CategoryId === cat
    );

    console.log(newState);
    this.setState(newState);
  };
  handleProductClick = (e) => {
    
    const newState = this.state;
    const id = +e.currentTarget.parentNode.getAttribute("id");
    
    newState.product = [newState.allProducts.find(prod => prod.id === id)];
    newState.products = [];
    this.setState(newState);
    console.log(newState)
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-12 text-left">
              <h1>
                {this.state.category
                  ? `Shop: ${
                      this.state.categories.filter(
                        (cat) => cat.id === this.state.category
                      )[0].category
                    }`
                  : `Shop`}
              </h1>
            </div>
          </div>

          <div className="row text-center">
            {this.state.categories.map((cat) => (
              <Category
                key={cat.id}
                category={cat.category}
                id={cat.id}
                img={cat.img}
                onClick={this.handleCategoryClick}
              ></Category>
            ))}
          </div>
          <div className="row">
            { this.state.products.length > 0 ?
              this.state.products.map((prod) => (
                <ProductSummary
                  key={prod.id}
                  id={prod.id}
                  name={prod.itm_name}
                  img={prod.itm_img}
                  price={prod.itm_prc}
                  desc={prod.itm_description}
                  unit={prod.itm_unit_of_measure}
                  onClick={this.handleProductClick}
                />
              ))
            :
            this.state.product              
              .map((prod) => (
                <Product 
                  key={prod.id} 
                  id={prod.id}
                  name={prod.itm_name}
                  img={prod.itm_img}
                  price={prod.itm_prc}
                  desc={prod.itm_description}
                  unit={prod.itm_unit_of_measure}
                  ></Product>
              ))
            }
            
            
          </div>
        </div>
      </>
    );
  }
}

export default Order;
