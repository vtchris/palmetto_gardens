import React from "react";

function ProductSummary({ name, img, price, unit }) {
  return (
    <div className="card m-2">
      <div className="card-body">
      <h4 className="card-title">{name}</h4>
        <p>
          <img src={img} className={"img-fluid " + img ? 'visible' : 'hidden'}  />
          
          {`$${price.toFixed(2)} per ${unit}`}
        </p>
      </div>
    </div>
  );
}
export default ProductSummary;
