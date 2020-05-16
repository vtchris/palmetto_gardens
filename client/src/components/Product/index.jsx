import React from "react";

function Product(props) {
  return (
    <div className="card border-secondary m-2">
      {/* <div className="card-header"></div> */}
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p>{`$${props.price.toFixed(2)} per ${props.unit}`}</p>
      </div>
      <input type="text" pattern="[0-9]"></input>
      <div className="card-footer">
        <button className="btn btn-lg btn-success">
          <span className="fas fa-cart-plus mr-3"></span> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
