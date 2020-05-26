import React from "react";

function Category({ category, id, img, onClick }) {
  return (
    <div className="card bg-light m-2" data-id={id} onClick={onClick}>
      
      <div className="card-header bg-secondary text-white" data-id={id}>
      <h5 className="card-title" data-id={id}>{category}</h5>
      </div>
      <div className="card-body" data-id={id}>
        <img className="img-fluid" src={img} data-id={id} alt={category}/>
      </div>
    </div>
  );
}

export default Category;
