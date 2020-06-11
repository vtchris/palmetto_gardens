import React from "react";
import "./styles.css";

function Footer({ settings }) {
  const CSZ = `${settings.city}, ${settings.state} ${settings.zipCode}`;
  return (
    <footer className="footer text-muted mt-auto p-2">
      <div className="row mr-0">
        <section className="col-md-4 col-12 pl-5">
          <ul className="list-unstyled text-left">
            <li>EMAIL: {settings.email}</li>
            <li>PHONE: {settings.phone1}</li>
            <li></li>
          </ul>
        </section>
        <section className="col-md-4 col-12">
          <h2>{settings.companyName}</h2>
        </section>
        <section className="col-md-4 col-12">
          <ul className="list-unstyled text-left">
            <li>ADDRESS: {settings.address1}</li>
            <li>{CSZ}</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
