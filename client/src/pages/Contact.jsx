import React, { Component } from "react";
import API from "../utils/API";
import Notifications, { notify } from "../components/Notifications";

class Contact extends Component {
  state = {
    to: "",
    firstName: "",
    lastName: "",
    from: "",
    phone: "",
    subject: "",
    text: "",
    errors: {
      from: "",
      phone: "",
      text: "",
    },
  };
  componentDidMount = () => {
    API.getSettings().then((res) => {
      this.setState({ to: res.data[0].email });
    });
  };
  handleOnChange = (e) => {
    const newState = this.state;
    const { name, value } = e.target;

    switch (name) {
      case "from":
        newState[name] = value.toLowerCase();
        const validEmailRegex = RegExp(
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        );
        newState.errors[name] = !validEmailRegex.test(value)
          ? "Invalid email address."
          : "";
        break;
      case "phone":
        if (value) {
          console.log(value);
          const validPhoneRegex = RegExp(
            /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
          );
          newState.errors[name] = !validPhoneRegex.test(value)
            ? "Invalid phone number."
            : "";
            newState[name] = value;
        }
        break;
      case "text":
        newState.errors[name] =
          value.length < 10 ? "Message must be at least 10 characters." : "";
      default:
        newState[name] = value;
    }
    
    this.setState(newState);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const newState = this.state;

    const errors = Object.values(newState.errors).filter(err => err.length > 0)

    if(!errors.length){
      if(!newState.from){errors.push("Email Address is required.")}
      if(!newState.text){errors.push("Message is required.")}
    }

    if(errors.length){
      let msg = errors.reduce((msg, err) => msg.concat(`\n${err}`) )
      console.log(msg)
      notify(msg, "fas fa-exclamation-circle")
    }    

    return;

    API.postEmail(newState).then((res) => {
      newState.from = "";
      newState.subject = "";
      newState.text = "";
      this.setState(newState);
      notify("Email Sent", "far fa-envelope");
    });
  };
  render() {
    return (
      <>
        <Notifications></Notifications>
        <h1>Contact</h1>
        <main className="container mt-4">
          <div className="row">
            <div className="col-md-6 col-12 offset-md-3">
              <form>
                <input
                  name="firstName"
                  type="text"
                  className="form-control mb-3"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleOnChange}
                ></input>
                <input
                  name="lastName"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleOnChange}
                ></input>
                <input
                  name="from"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Email Address"
                  value={this.state.from}
                  onChange={this.handleOnChange}
                ></input>
                <input
                  name="phone"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Phone Number (optional)"
                  value={this.state.phone}
                  onChange={this.handleOnChange}
                ></input>
                <input
                  name="subject"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Subject"
                  value={this.state.subject}
                  onChange={this.handleOnChange}
                ></input>
                <textarea
                  name="text"
                  className="form-control mb-4"
                  rows="6"
                  placeholder="Message..."
                  value={this.state.text}
                  onChange={this.handleOnChange}
                ></textarea>
                <button
                  className="btn btn-lg btn-success"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Contact;
