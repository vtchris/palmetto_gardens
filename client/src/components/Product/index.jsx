import React from "react";
import LineItem from "../LineItem";
import InvoiceFooter from "../InvoiceFooter";

function Product(props) {
  return (

    <div className="card border-secondary mb-3">
      {/* <div className="card-header"></div> */}
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p>
          {props.price} {props.unit}
        </p>
        <button className="btn btn-lg btn-success">
          <span className="fas fa-cart-plus mr-3"></span> Add to Cart
        </button>

    <div className="container no-gutters">
      <div className="row">
        <div className="col col-lg-7 col-12">
          <form>
            <div className="form-group">
              <div className="row">
                {props.img ? (
                  <div className="col col-md-4 col-12 pull-left">
                    <img
                      src={props.img}
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
                      <span className="fas fa-cart-plus mr-3"></span> Add to
                      Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col col-lg-5 col-12 border border-secondary rounded card cart">

          <h3>Shopping Cart</h3>
          {!props.cart[0]
            ? ""
          : props.cart.map(itm => <LineItem key={itm.id} id={itm.id} name={itm.itm_name} qty={itm.qty} prc={itm.itm_prc} taxable={itm.taxable} onDelete={props.lineDelete} lineClick={props.lineClick}> </LineItem>)
                        
          }
          {props.cart[0] ? <InvoiceFooter invoice={props.invoice}></InvoiceFooter> : ''}
        </div>

      </div>
    </div>
  );
}

export default Product;
