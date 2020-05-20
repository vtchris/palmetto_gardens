import React, { Component } from "react";
import API from "../utils/API";
import Category from "../components/Category";
import Product from "../components/Product";
import ProductSummary from "../components/ProductSummary";
import LineItem from "../components/LineItem";

class Order extends Component {
  state = {
    categories: [],
    allProducts: [],
    category: 0,
    products: [],
    product: [],
    qty: 0,
    cart: [],
  };
  componentDidMount() {
    let newState = this.state;

    // Get active products
    API.getProductsActive()
      .then((respProd) => {
        newState.allProducts = respProd.data;
        let cats = respProd.data.map((prod) => prod.CategoryId);

        // Get ALL categories
        API.getCategories().then((respCat) => {
          // Filter categories to show only active categories with products
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
    // Get selected category id
    const cat = +e.target.dataset.id;
    newState.category = cat;
    const prods = this.state.allProducts;

    // Get products in seleceted category
    newState.products = prods.filter((prod) => prod.CategoryId === cat);

    this.setState(newState);
  };
  handleProductClick = (e) => {
    const newState = this.state;
    // Get the id of the selected product
    const id = +e.currentTarget.parentNode.getAttribute("id");

    // Get the matching product object
    newState.product = [newState.allProducts.find((prod) => prod.id === id)];
    // Clear the state products list so they will no longer be displayed
    newState.products = [];

    this.setState(newState);
    console.log(newState);
  };
  handleQtyChange = (e) => {
    // Get qty entered, remove decimals
    const qty = e.target.value.replace(/\./gi, "");
    this.setState({ qty: qty });
  };
  handleAddToCart = (e) => {
    e.preventDefault();
    const newState = this.state;

    // Get the selected product to add to the cart
    const item = newState.product[0];
    // Add the qty key with the requested qty
    item.qty = +this.state.qty;
    console.log(item);
    newState.cart.push(item)
    this.setState(newState)
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
            {this.state.products.length > 0
              ? this.state.products.map((prod) => (
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
              : this.state.product.map((prod) => (
                  <Product
                    key={prod.id}
                    id={prod.id}
                    name={prod.itm_name}
                    img={prod.itm_img}
                    qty={this.state.qty}
                    price={prod.itm_prc}
                    desc={prod.itm_description}
                    unit={prod.itm_unit_of_measure}
                    onChange={this.handleQtyChange}
                    onClick={this.handleAddToCart}
                    cart={this.state.cart}
                  ></Product>
                ))}
          </div>
        </div>
      </>
    );
  }
}

export default Order;
