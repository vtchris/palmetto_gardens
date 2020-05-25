import React, { Component } from "react";
import API from "../utils/API";
import Category from "../components/Category";
import Product from "../components/Product";
import ProductSummary from "../components/ProductSummary";

class Order extends Component {
  state = {
    breadcrumb: { categories: [], categoryName: "", products: [] },
    allProducts: [],
    category: 0,
    products: [],
    product: [],
    qty: 0,
    cart: [],
    invoice: {},
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
          newState.breadcrumb.categories = respCat.data.filter(
            (cat) => cat.active && cats.includes(cat.id)
          );

          this.updateState(newState);
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
    newState.breadcrumb.categoryName = newState.breadcrumb.categories.find(category => category.id === cat).category;
   
    // Get products in selected category
    const prods = this.state.allProducts;
    newState.products = prods.filter((prod) => prod.CategoryId === cat);
    newState.breadcrumb.products = newState.products;       
    
    this.updateState(newState);
  };
  handleBreadcrumbClick = (e) => {
    let newState = this.state;
    console.log(e.currentTarget)
    if(e.currentTarget.dataset.id === "cats"){newState.category = 0}
    else { newState.products = newState.breadcrumb.products}
    this.updateState(newState);
  };
  handleProductClick = (e) => {
    const newState = this.state;
    // Get the id of the selected product
    const id = +e.currentTarget.parentNode.getAttribute("id");

    // Get the matching product object if already in cart
    let product = [newState.cart.find((prod) => prod.id === id)];
    // Get the matching product object if not in cart
    if (!product[0]) {
      product = [newState.allProducts.find((prod) => prod.id === id)];
    }
    console.log(product);
    newState.product = product;
    newState.qty = product[0].qty || 0;
    // Clear the state products list so they will no longer be displayed
    newState.products = [];

    this.updateState(newState);
  };
  handleQtyChange = (e) => {
    const newState = this.state;
    // Get qty entered, remove decimals
    const qty = e.target.value.replace(/\./gi, "");
    newState.qty = Math.abs(qty);
    this.updateState(newState);
  };
  handleAddToCart = (e) => {
    e.preventDefault();

    // Don't add zero qty
    if (!this.state.qty) return;

    const newState = this.state;

    // Get the selected product to add to the cart
    const item = newState.product[0];

    // Determine if item is already in cart
    const idx = this.state.cart.findIndex((itm) => itm.id === item.id);
    if (idx > -1) {
      // If item is in cart, update qty
      console.log(idx);
      newState.cart[idx].qty = +this.state.qty;
    } else {
      // Add the qty key with the requested qty
      item.qty = +this.state.qty;
      newState.cart.push(item);
    }

    console.log(item);

    this.updateInvoice(newState);
  };
  handleDelete = (e) => {
    e.stopPropagation();
    const newState = this.state;

    // Get id of line item being deleted
    const id = e.currentTarget.dataset.id;

    // Get index of the item in the cart
    const idx = newState.cart.findIndex((item) => item.id == id);
    // Remove item from cart
    newState.cart.splice(idx, 1);

    // Update invoice
    this.updateInvoice(newState);
  };
  handleLineItemClick = (e) => {
    const newState = this.state;

    const id = e.currentTarget.dataset.id;
    // Get index of the item in the cart
    const idx = newState.cart.findIndex((item) => item.id == id);
    const item = newState.cart[idx];
    newState.product = [item];
    newState.qty = item.qty;
    this.updateState(newState);
  };
  updateInvoice = (newState) => {
    // Total all items, and apply sales tax
    const taxable = this.totalItems(newState.cart, true);
    const tax = (taxable * 0.06).toFixed(2);
    const nontaxable = this.totalItems(newState.cart, false);
    const total = (+taxable + +tax + +nontaxable).toFixed(2);
    const invoice = {
      subtotal: (+taxable + +nontaxable).toFixed(2),
      tax: tax,
      total: total,
    };
    newState.invoice = invoice;
    this.updateState(newState);
  };
  totalItems = (items, taxable) => {
    // Filter and total items based on taxable status
    const total = items
      .filter((item) => (taxable ? item.taxable : !item.taxable))
      .reduce((t, item) => t + +(item.itm_prc * item.qty).toFixed(2), 0);
    return total;
  };
  updateState = (newState) => {
    console.log(newState)
    this.setState(newState);
  };
  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-12 text-left">
              <h3>
                {this.state.category
                  ? <><a href="#" data-id="cats" onClick={this.handleBreadcrumbClick}>Categories</a> > <a href="#" data-id="prods" onClick={this.handleBreadcrumbClick}>{this.state.breadcrumb.categoryName}</a></>                   
                  : `Select a Category`}
              </h3>
            </div>
          </div>

          <div className="row text-center">
            {this.state.category
              ? ""
              : this.state.breadcrumb.categories.map((cat) => (
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
                    lineDelete={this.handleDelete}
                    lineClick={this.handleLineItemClick}
                    invoice={this.state.invoice}
                  ></Product>
                ))}
          </div>
        </div>
      </>
    );
  }
}

export default Order;
