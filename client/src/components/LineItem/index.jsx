import React from "react";

function LineItem(props) {
  return (
    <div className="mb-1 container">
      <div className="card card-body mx-auto">
        <div className="row no-gutters">
          <div className="col-2">
            <button className="btn btn-danger">X</button>
          </div>
  <div className="col-5">{props.name}</div>
          <div className="col-2">{props.qty}</div>
          <div className="col-3">${props.prc.toFixed(2)} {props.taxable ? '*' : ''}</div>
        </div>
      </div>
    </div>
  );
}

export default LineItem;
