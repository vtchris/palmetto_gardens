import React from "react";

function ProductForm(props) {
  return (
    <form>
      <div className="form-group">
        <div className="row">
          {props.img ? (
            <div className="col col-md-4 col-12 pull-left">
              <img
                src={props.img}
                alt={props.name}
                className="img-fluid img-thumbnail rounded"
              />
            </div>
          ) : (
            ""
          )}
          <div className="col col-md-8 col-12">
            <h1>{props.name}</h1>
            <p>{props.desc}</p>
            <br />
            <p>{`$${props.price.toFixed(2)} per ${props.unit}`}</p>
            <div className="form-group">
              <input
                type="number"
                className="text-right"
                pattern="[0-9]"
                value={props.qty}
                onChange={props.onChange}
              ></input>
            </div>
            <div className="form-group">
              <button
                className="btn btn-lg btn-success"
                data-id={props.id}
                onClick={props.onClick}
              >
                <span className="fas fa-cart-plus mr-3"></span> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
