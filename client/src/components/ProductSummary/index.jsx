import React from "react";

function ProductSummary({ name, img, price, desc, unit }) {
  return (
    <div className="card m-2">
      <div className="card-body text-left">
        <div className="container">
          <div className="row">
            <div className="col col-12">
              <h4 className="card-title">{name}</h4>
            </div>
          </div>
          <div className="row mb-1">
            <div className="col col-4">
              <img src={img} className={img ? "img-fluid visible" : "hidden"} />
            </div>
            <div className="col col-8">
              {`$${price.toFixed(2)} per ${unit}`}
            </div>
          </div>
          <div className="row">
              <div className="col col-12">
              {desc 
                ? desc.length > 43 
                ? desc.substring(0, 40) + `...` 
                : desc
                : ""}
              </div>
            
            </div>
        </div>
      </div>
    </div>
  );
}
export default ProductSummary;
