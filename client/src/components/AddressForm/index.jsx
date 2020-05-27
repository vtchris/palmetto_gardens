import React from "react";

function AddressForm(props) {
  return (
    <form className="pr-5 pl-5">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="First Name"
      ></input>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Last Name"
      ></input>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Address 1"
      ></input>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Address 2"
      ></input>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="City"
      ></input>
      <div className="row">
        <div className="col col-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="State"
          ></input>
        </div>
        <div className="col col-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Zip Code"
          ></input>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Phone Number"
      ></input>
      <textarea        
        className="form-control mb-2"
        rows="4"
        placeholder="Special delivery/spreading instructions?"
      ></textarea>
      <button className="btn btn-lg btn-success">Submit</button>
    </form>
  );
}

export default AddressForm;
