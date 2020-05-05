import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand mr-5" href="/">
        Palmetto Gardens
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#nav-menu"
        aria-controls="nav-menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    <div id="nav-menu" className="collapse navbar-collapse">

    <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            ABOUT
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/produce">
            PRODUCE
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/services">
            SERVICES
          </a>
        </li>
        <li>
          <a className="nav-link" href="/order">
            ORDER
          </a>
        </li>
        <li>
          <a className="nav-link" href="/contact">
            CONTACT
          </a>
        </li>
      </ul>
    </div>
     
    </nav>
  );
}

export default Nav;
