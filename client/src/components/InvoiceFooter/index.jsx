import React from "react";

function InvoiceFooter({ invoice }) {
  return (
    <div className="card-footer">
      <div className="row">
        <div className="col col-8 text-right">Subtotal:</div>
        <div className="col col-4 text-right">${invoice.inv_subtotal}</div>
      </div>
      <div className="row pb-1">
        <div className="col col-8 text-right">Tax:</div>
        <div className="col col-4 text-right">${invoice.inv_tax}</div>
      </div>
      <div className="row border-top pt-1">
        
        <div className="col col-8 text-right"><h4>Total:</h4></div>
        <div className="col col-4 text-right"><h4>${invoice.inv_total}</h4></div>
      </div>
    </div>
  );
}

export default InvoiceFooter;
