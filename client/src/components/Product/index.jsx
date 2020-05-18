import React from "react";

function Product(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-8">
          <form>
            <div className="form-group">
              <h1>{props.name}</h1>
              <p>{props.desc}</p>
              <br />
              <p>{`$${props.price.toFixed(2)} per ${props.unit}`}</p>
            </div>
            <div className="form-group">
              <input type="text" pattern="[0-9]"></input>
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-success">
                <span className="fas fa-cart-plus mr-3"></span> Add to Cart{" "}
              </button>
            </div>
          </form>
        </div>
        <div className="col col-4 border border-secondary rounded">
          <h3>Shopping Cart</h3>
        </div>
      </div>
    </div>  
  );
}

export default Product;
