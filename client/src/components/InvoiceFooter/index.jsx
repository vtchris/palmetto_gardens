import React from "react";

function InvoiceFooter({ invoice }) {
  return (
    <div className="card-footer">
      <div className="row">
        <div className="col col-7 text-right">Subtotal:</div>
        <div className="col col-5 text-right">${invoice.subtotal}</div>
      </div>
      <div className="row pb-1">
        <div className="col col-7 text-right">Tax:</div>
        <div className="col col-5 text-right">${invoice.tax}</div>
      </div>
      <div className="row border-top pt-1">
        
        <div className="col col-7 text-right"><h4>Total:</h4></div>
        <div className="col col-5 text-right"><h4>${invoice.total}</h4></div>
      </div>
    </div>
  );
}

export default InvoiceFooter;
