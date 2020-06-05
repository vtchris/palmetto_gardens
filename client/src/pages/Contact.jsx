import React, { Component } from "react";
import API from "../utils/API";
import Notifications, { notify } from "../components/Notifications";

class Contact extends Component {
  state = {
    to: "",
    from: "",
    subject: "",
    text: "",
  };
  componentDidMount = () => {
    API.getSettings().then((res) => {
      this.setState({ to: res.data[0].email });
    });
  };
  handleOnChange = (e) => {
    const newState = this.state;

    newState[e.currentTarget.name] = e.currentTarget.value;

    this.setState(newState);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const newState = this.state;

    API.postEmail(newState).then((res) => {
      newState.from = "";
      newState.subject = "";
      newState.text = "";
      this.setState(newState);
      notify("Email Sent","far fa-envelope");
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
                  name="from"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Email Address"
                  value={this.state.from}
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
