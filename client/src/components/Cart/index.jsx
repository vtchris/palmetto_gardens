import React from "react";
import LineItem from "../LineItem";
import InvoiceFooter from "../InvoiceFooter";
import ProductForm from "../ProductForm";
import AddressForm from "../AddressForm";

function Cart(props) {
  let prod = props.prod;
  return (
    <div className="container no-gutters">
      <div className="row">
        <div className="col col-lg-7 col-12">
          {props.isCheckingOut ? (
            <AddressForm
              user={props.user}
              onUserChange={props.onUserChange}
              onSaveOrder={props.onSaveOrder}
            ></AddressForm>
          ) : !props.isSubmitted ? (
            <ProductForm
              desc={prod.itm_description}
              id={prod.id}
              img={prod.itm_img}
              name={prod.itm_name}
              price={prod.itm_prc}
              qty={props.qty}
              unit={prod.itm_unit_of_measure}
              lineClick={props.lineClick}
              onChange={props.onChange}
              onClick={props.onClick}
            ></ProductForm>
          ) : (
            <>
              <h2>Order Submitted.</h2>
              <h3>Thank you for your business!</h3>
            </>
          )}
        </div>
        <div className="col col-lg-5 col-12 border border-secondary rounded card cart">
          <h3>Shopping Cart</h3>
          {!props.cart[0]
            ? ""
            : props.cart.map((itm) => (
                <LineItem
                  key={itm.id}
                  id={itm.id}
                  name={itm.itm_name}
                  qty={itm.qty}
                  prc={itm.itm_prc}
                  taxable={itm.taxable}
                  onDelete={props.lineDelete}
                  lineClick={props.lineClick}
                >
                  {" "}
                </LineItem>
              ))}
          {props.cart[0] ? (
            <InvoiceFooter invoice={props.invoice}></InvoiceFooter>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
