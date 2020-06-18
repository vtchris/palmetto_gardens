import React, { Component } from "react";
import API from "../utils/API";
import Category from "../components/Category";
import Cart from "../components/Cart";
import Notifications, { notify } from "../components/Notifications";
import ProductSummary from "../components/ProductSummary";

class Order extends Component {
  state = {
    page: "order",
    settings: {},
    breadcrumb: { categories: [], categoryName: "", products: [] },
    allProducts: [],
    category: 0,
    products: [],
    product: [],
    qty: 0,
    tax: 0,
    cart: [],
    invoice: {},
    isCheckingOut: false,
    isSubmitted: false,
    mailOptions: {
      to:'',
      from: '',
      bcc: '',
      subject: 'Order Request'
    },
    user: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      phone1: "",
      email: "",
      notes: "",   
      errors: {
        firstName: "First Name is required.",
        lastName: "Last Name is required.",
        address1: "Address 1 is required.",
        address2: "",
        city: "City is required.",
        state: "State is required.",
        zipCode: "Zip code is required.",
        phone1: "Phone number is required.",
        email: "Email is required.",
        notes: "",
      },
    },
  };

  componentDidMount() {
    let newState = this.state;

    Promise.all([
      API.getSettings(),
      API.getProductsActive(),
      API.getCategories(),
    ])
      .then(([sets, prods, cats]) => {
        newState.settings = sets.data[0];
        newState.tax = newState.settings.taxRate;
        newState.mailOptions.from = `${newState.settings.companyName} <${newState.settings.email}>`
        newState.mailOptions.bcc = newState.settings.email;
        newState.allProducts = prods.data;

        // Filter categories to show only active categories with products
        let prodCats = prods.data.map((prod) => prod.CategoryId);
        newState.breadcrumb.categories = cats.data.filter(
          (cat) => cat.active && prodCats.includes(cat.id)
        );       
        this.updateState(newState);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
    this.updateInvoice(newState);
  };
  handleBreadcrumbClick = (e) => {
    let newState = this.state;
    newState.isCheckingOut = false;
    newState.isSubmitted = false;

    // If cat link is click, display all categories, otherwise display category products
    if (e.currentTarget.dataset.id === "cats") {
      newState.category = 0;
      newState.products = [];
      newState.product = [];
    } else {
      newState.products = newState.breadcrumb.products;
    }
    this.updateState(newState);
  };
  handleCategoryClick = (e) => {
    const newState = this.state;
    // Get selected category id
    const cat = +e.currentTarget.dataset.id;
    newState.category = cat;
    newState.breadcrumb = this.getCategoryProds(newState);
    newState.products = newState.breadcrumb.products;

    this.updateState(newState);
  };
  handleCheckoutClick = (e) => {
    const newState = this.state;

    newState.isCheckingOut = true;
    this.updateState(newState);
  };
  handleDelete = (e) => {
    e.stopPropagation();
    const newState = this.state;

    // Get id of line item being deleted
    const id = e.currentTarget.dataset.id;

    // Get index of the item in the cart
    const idx = newState.cart.findIndex((item) => item.id === id);
    // Remove item from cart
    newState.cart.splice(idx, 1);

    // Update invoice
    this.updateInvoice(newState);
  };
  handleLineItemClick = (e) => {
    const newState = this.state;

    const id = +e.currentTarget.dataset.id;
    // Get index of the item in the cart
    const idx = newState.cart.findIndex((item) => item.id === id);
    const item = newState.cart[idx];
    newState.category = item.CategoryId;
    newState.product = [item];
    newState.qty = item.qty;
    newState.breadcrumb = this.getCategoryProds(newState);
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
  handleSaveOrder = (e) => {
    e.preventDefault();
    const newState = this.state;
    const errors = Object.values(newState.user.errors).filter(
      (err) => err.length > 0
    );

    if (errors.length) {
      let msg = errors.reduce((msg, err) => msg.concat(`\n${err}`));
      console.log(msg);
      notify(msg, "fas fa-exclamation-circle");
      return;
    }

    newState.mailOptions.to = newState.user.email;
    // Make a copy of the user object without mutating the original
    const customer = Object.assign({}, newState.user);
    delete customer.errors;
    delete customer.notes;
    const invoice = Object.assign({}, newState.invoice);

    API.postEmail(newState).then((res) => {
      notify("Order Submitted", "far fa-envelope");
      newState.isCheckingOut = false;
      newState.isSubmitted = true;
      newState.cart = [];

      this.updateState(newState);
    });

    API.postCustomer(customer).then(res => {
      console.log('*************Resp')
      invoice.customer_id = res.data.customer_id;
      console.log(invoice)
      API.postInvoice(invoice).catch(err => console.log(err))
    })


  };
  handleUserUpdate = (e) => {
    const newState = this.state;
    const user = newState.user;
    const { name, value } = e.target;

    user[name] = value.toUpperCase();

    switch (name) {
      case "firstName":
      case "lastName":
        user.errors[name] =
          value.length < 2 ? "Name must be at least 2 characters." : "";
        break;
      case "address1":
        user.errors[name] =
          value.length < 5 ? "Address 1 must be at least 5 characters." : "";
        break;
      case "city":
        user.errors[name] =
          value.length < 3 ? "City must be at least 3 characters." : "";
        break;
      case "state":
        user.errors[name] =
          value.length !== 2 ? "State must be 2 characters." : "";
        break;
      case "zipCode":
        const validZipRegex = RegExp(/^\d{5}(?:[-\s]\d{4})?$/);
        user.errors[name] = !validZipRegex.test(value)
          ? "Invalid zip code."
          : "";
        break;
      case "email":
        user[name] = value.toLowerCase();
        const validEmailRegex = RegExp(
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        );
        user.errors[name] = !validEmailRegex.test(value)
          ? "Invalid email address."
          : "";
        break;
      case "phone1":
        const validPhoneRegex = RegExp(
          /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
        );
        user.errors[name] = !validPhoneRegex.test(value)
          ? "Invalid phone number."
          : "";
        break;
      default:
    }

    newState.user = user;
    this.updateState(newState);
  };
  getCategoryProds = (newState) => {
    newState.breadcrumb.categoryName = newState.breadcrumb.categories.find(
      (category) => category.id === newState.category
    ).category;

    // Get products in selected category
    const prods = this.state.allProducts;
    newState.breadcrumb.products = prods.filter(
      (prod) => prod.CategoryId === newState.category
    );

    return newState.breadcrumb;
  };
  totalItems = (items, taxable) => {
    // Filter and total items based on taxable status
    const total = items
      .filter((item) => (taxable ? item.taxable : !item.taxable))
      .reduce((t, item) => t + +(item.itm_prc * item.qty).toFixed(2), 0);
    return total;
  };
  updateInvoice = (newState) => {
    // Total all items, and apply sales tax
    const taxable = this.totalItems(newState.cart, true);
    const tax = (taxable * this.state.tax).toFixed(2);
    const nontaxable = this.totalItems(newState.cart, false);
    const total = (+taxable + +tax + +nontaxable).toFixed(2);
    const invoice = {
      inv_subtotal: (+taxable + +nontaxable).toFixed(2),
      inv_tax: tax,
      inv_total: total
    };
    newState.invoice = invoice;
    this.updateState(newState);
  };
  updateState = (newState) => {
    console.log(newState);
    this.setState(newState);
  };
  render() {
    return (
      <>
        <Notifications></Notifications>
        <div className="container">
          <div className="row">
            <div className="col col-lg-8 col-12 text-left">
              <h4 className="m-3">
                <button
                  data-id="cats"
                  className="btn btn-link btn-lg"
                  onClick={this.handleBreadcrumbClick}
                >
                  Categories
                </button>
                {this.state.category ? (
                  <>
                    {/* This adds the > between category when appropriate */}                    
                    {" > "}
                    <button
                      data-id="prods"
                      className="btn btn-link btn-lg"
                      onClick={this.handleBreadcrumbClick}
                    >
                      {this.state.breadcrumb.categoryName}
                    </button>
                  </>
                ) : (
                  ""
                )}
              </h4>
            </div>
            <div className="col col-lg-4 col-12 text-right pr-0">
              {this.state.cart.length > 0 && !this.state.isCheckingOut && (
                <button
                  className="btn btn-lg btn-warning mt-3 mb-3"
                  onClick={this.handleCheckoutClick}
                >
                  <span className="fas fa-cash-register mr-3"></span>Checkout
                </button>
              )}
            </div>
          </div>

          <div className="row text-center">
            {this.state.category === 0 &&
              !this.state.isCheckingOut &&
              this.state.breadcrumb.categories.map((cat) => (
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
            {this.state.products.length > 0 && !this.state.isCheckingOut ? (
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
            ) : this.state.product.length > 0 || this.state.isCheckingOut ? (
              <Cart
                prod={this.state.product[0]}
                user={this.state.user}
                qty={this.state.qty}
                onChange={this.handleQtyChange}
                onClick={this.handleAddToCart}
                cart={this.state.cart}
                lineDelete={this.handleDelete}
                lineClick={this.handleLineItemClick}
                invoice={this.state.invoice}
                isCheckingOut={this.state.isCheckingOut}
                isSubmitted={this.state.isSubmitted}
                onUserChange={this.handleUserUpdate}
                onSaveOrder={this.handleSaveOrder}
              ></Cart>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Order;
