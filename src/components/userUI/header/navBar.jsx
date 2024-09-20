import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Navbar({ isLoggedIn, userType }) {
  return (
    <nav className="nav gutter">
      <div className="logo">STAYWISE</div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">Explore rooms</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>
      {isLoggedIn && userType == "Admin" ? (
        <ul>
          <li>
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
        </ul>
      ) : (
        isLoggedIn && (
          <div className="details">
            <ul>
              <li>{/* <Link to="/booking">Booking</Link> */}</li>
              <li>
                <Link to="/userDetails">User Details</Link>
              </li>
            </ul>
          </div>
        )
      )}
      {!isLoggedIn && (
        <div className="auth">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
