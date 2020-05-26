import React from "react";

function LineItem(props) {
  return (
    <div data-id={props.id} className="mb-1 container" onClick={props.lineClick}>
      <div className="card card-body mx-auto">
        <div className="row no-gutters">
          <div className="col-2">
            <button
              data-id={props.id}
              className="btn btn-danger"
              onClick={props.onDelete}
            >
              X
            </button>
          </div>
          <div className="col-5">{props.name}</div>
          <div className="col-2">{props.qty}</div>
          <div className="col-3">
            ${props.prc.toFixed(2)} {props.taxable ? "*" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineItem;
