import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Navbar({ isLoggedIn, userType }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="nav gutter">
      <div className="logo">STAYWISE</div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">Rooms</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>

      {isLoggedIn && userType == "Admin" ? (
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
        </ul>
      ) : (
        isLoggedIn && (
          <div className="details">
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
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
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <button className="authActions">
              <Link to="/login">Login</Link>
            </button>
            <button className="authActions">
              <Link to="/register">Register</Link>
            </button>
          </ul>
        </div>
      )}
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navbar;
