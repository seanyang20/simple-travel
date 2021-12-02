import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
// import axios from "axios";

export default class Header extends Component {
 
  render() {
    return (
      <header className="header">
        <nav className="header__navbar">
          <ul className="header__navbarList">
          <Link to="/" className="header__navbarItem">
              <li>HOME</li>
            </Link>
            <Link to="/itinerary" className="header__navbarItem">
              <li>ITINERARY</li>
            </Link>
          </ul>
        </nav>
      </header>
    );
  }
}


