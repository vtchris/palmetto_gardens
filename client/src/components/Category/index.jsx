import React from "react";

function Category({ category, id, img, onClick }) {
  return (
    <div className="card bg-light m-2" role="button" data-id={id} onClick={onClick} >
      
      <div className="card-header bg-secondary text-white">
      <h5 className="card-title">{category}</h5>
      </div>
      <div className="card-body">
        <img className="img-fluid" src={img} alt={`${category} icon`}/>
      </div>
    </div>
  );
}

export default Category;
