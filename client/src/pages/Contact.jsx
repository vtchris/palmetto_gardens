import React, { Component } from "react";
import API from "../utils/API";

class Contact extends Component {
  state = {};
  componentDidMount() {
    let emailOptions = {
      to: "vtchris@hotmail.com",

      subject: "This is from contact1",
      text: "this email is sent from the contact page1.",
    };
    //API.postEmail(emailOptions);
  }
  handleOnChange = (e) => {
    let newState = this.state;

    console.log(e.currentTarget)
    newState[e.currentTarget.name] = e.currentTarget.value;

    console.log(newState)

    this.setState(newState);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    API.postEmail(this.state);
  };
  render() {
    return (
      <>
        <h1>Contact</h1>
        <main className="container mt-4">
          <div className="row">
            <div className="col-md-6 col-12 offset-md-3">
              <form>
                <input
                  name="to"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Email Address"
                  onChange={this.handleOnChange}
                ></input>
                <input
                  name="subject"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Subject"
                  onChange={this.handleOnChange}
                ></input>
                <textarea
                  name="text"
                  className="form-control mb-4"
                  rows="6"
                  placeholder="Message..."
                  onChange={this.handleOnChange}
                ></textarea>
                <button className="btn btn-lg btn-success" onClick={this.handleSubmit}>Submit</button>
              </form>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default Contact;
