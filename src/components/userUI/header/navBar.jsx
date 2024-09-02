import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Navbar({ isLoggedIn, userType }) {
  return (
    <nav className="nav">
      <ul>
        <li></li>

        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {isLoggedIn && userType == "Admin" ? (
          <li>
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
        ) : (
          isLoggedIn && (
            <>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
              <li>
                <Link to="/userDetails">User Details</Link>
              </li>
            </>
          )
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
