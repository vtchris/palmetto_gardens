import React from "react";

function AddressForm(props) {
  return (
    <form className="pr-5 pl-5" onChange={props.onUserChange}>
      <input
        type="text"
        name="firstName"
        className="form-control mb-2"
        placeholder="First Name"
        value={props.user.firstName}
      ></input>
      <input
        type="text"
        name="lastName"
        className="form-control mb-2"
        placeholder="Last Name"
        value={props.user.lastName}
      ></input>
      <input
        type="text"
        name="address1"
        className="form-control mb-2"
        placeholder="Address 1"
        value={props.user.address1}
      ></input>
      <input
        type="text"
        name="address2"
        className="form-control mb-2"
        placeholder="Address 2"
        value={props.user.address2}
      ></input>
      <input
        type="text"
        name="city"
        className="form-control mb-2"
        placeholder="City"
        value={props.user.city}
      ></input>
      <div className="row">
        <div className="col col-6">
          <input
            type="text"
            name="state"
            className="form-control mb-2"
            placeholder="State"
            value={props.user.state}
          ></input>
        </div>
        <div className="col col-6">
          <input
            type="text"
            name="zip"
            className="form-control mb-2"
            placeholder="Zip Code"
            value={props.user.zip}
          ></input>
        </div>
      </div>
      <input
        type="text"
        name="email"
        className="form-control mb-2"
        placeholder="Email"
        value={props.user.email}
      ></input>
      <input
        type="text"
        name="phone"
        className="form-control mb-2"
        placeholder="Phone Number"
        value={props.user.phone}
      ></input>
      <textarea
        className="form-control mb-2"
        name="notes"
        rows="4"
        placeholder="Special delivery/spreading instructions?"
        value={props.user.notes}
      ></textarea>
      <button className="btn btn-lg btn-success" onClick={props.onSaveOrder}>
        Submit
      </button>
    </form>
  );
}

export default AddressForm;
