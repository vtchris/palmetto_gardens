import React, { Component } from "react";
import API from "../utils/API";

class Contact extends Component {
  state = {};
  componentDidMount() {
    let emailOptions = {
      to: 'vtchris@hotmail.com'
      
      ,subject: 'This is from contact1'
      ,text: 'this email is sent from the contact page1.'
    }
    //API.postEmail(emailOptions);

  }
  render() {
    return (
      <>
        <h1>Contact</h1>
      </>
    );
  }
}

export default Contact;
