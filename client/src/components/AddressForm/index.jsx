import React from "react";

function AddressForm(props) {
  return (
    <div>
      <input type="text" placeholder="First Name"></input>
      <input type="text" placeholder="Last Name"></input>
      <input type="text" placeholder="Address 1"></input>
      <input type="text" placeholder="Address 2"></input>
      <input type="text" placeholder="City"></input>
      <input type="text" placeholder="State"></input>
      <input type="text" placeholder="Zip Code"></input>
      <input type="text" placeholder="Phone Number"></input>
      <input
        type="text"
        placeholder="Special delivery/spreading instructions?"
      ></input>
      <button className="btn btn-lg btn-success">Submit</button>
    </div>
  );
}

export default AddressForm;
