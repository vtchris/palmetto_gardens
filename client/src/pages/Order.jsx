import React, { Component } from "react";
import API from "../utils/API";
import Product from "../components/Product";
import Category from "../components/Category";

class Order extends Component {
  state = {
    categories: [],
    allProducts: [],
    category: 0,
    products: [],
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

    newState.category = cat;
    newState.products = newState.allProducts.filter(
      (prod) => prod.CategoryId === cat
    );

    console.log(newState);
    this.setState(newState);
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
            {this.state.products.map((prod) => (
              <Product
                key={prod.id}
                name={prod.itm_name}
                price={prod.itm_prc}
                unit={prod.itm_unit_of_measure}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Order;
