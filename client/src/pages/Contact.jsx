import React, { Component } from "react";
import API from "../utils/API";
import Notifications, { notify } from "../components/Notifications";

class Contact extends Component {
  state = {
    page: "contact",
    firstName: "",
    lastName: "",
    phone: "",
    settings: {},
    mailOptions: {},
    errors: {
      from: "Email is required.",
      phone: "",
      text: "Message is required.",
    },
  };
  componentDidMount = () => {
    API.getSettings().then((res) => {
      this.setState({
        mailOptions: {
          to: res.data[0].email,
        },
        settings: res.data[0],
      });
    });
  };
  handleOnChange = (e) => {
    const newState = this.state;
    const { name, value } = e.target;

    switch (name) {
      case "from":
        newState.mailOptions[name] = value.toLowerCase();
        const validEmailRegex = RegExp(
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
        );
        newState.errors[name] = !validEmailRegex.test(value)
          ? "Invalid email address."
          : "";
          newState.mailOptions[name] = value;
        break;
      case "phone":
        const validPhoneRegex = RegExp(
          /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
        );
        newState.errors[name] =
          !validPhoneRegex.test(value) && value ? "Invalid phone number." : "";
        newState[name] = value;

        break;
      case "subject":
        newState.mailOptions[name] = value;
        break;
      case "text":
        newState.errors[name] =
          value.length < 10 ? "Message must be at least 10 characters." : "";
        newState.mailOptions[name] = value;
        break;
      default:
        newState[name] = value;
    }
    console.log(newState);
    this.setState(newState);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const newState = this.state;

    const errors = Object.values(newState.errors).filter(
      (err) => err.length > 0
    );

    if (errors.length) {
      let msg = errors.reduce((msg, err) => msg.concat(`\n${err}`));
      console.log(msg);
      notify(msg, "fas fa-exclamation-circle");
      return;
    }

    if (!newState.subject) {
      newState.subject = "General Question";
    }

    API.postEmail(newState).then((res) => {
      newState.mailOptions.from = "";
      newState.firstName = "";
      newState.lastName = "";
      newState.phone = "";
      newState.mailOptions.subject = "";
      newState.mailOptions.text = "";
      this.setState(newState);
      notify("Email Sent", "far fa-envelope");
    });
  };
  render() {
    return (
      <>
        <Notifications></Notifications>
        <main className="container mt-4">
          <header className="row">
            <div className="col-12">
              <h1>Contact</h1>
            </div>
          </header>
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
                  value={this.state.mailOptions.from}
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
                  value={this.state.mailOptions.subject}
                  onChange={this.handleOnChange}
                ></input>
                <textarea
                  name="text"
                  className="form-control mb-4"
                  rows="4"
                  placeholder="Message..."
                  value={this.state.mailOptions.text}
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
