import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo">
        <div className="logo">STAYWISE</div>
      </div>
      <div className="footer-section about">
        <h4>About Us</h4>
        <ul>
          <li>
            <a href="#">Rooms</a>
          </li>
          <li>
            <a href="#">Amenities</a>
          </li>
          <li>
            <a href="#">Book Now</a>
          </li>
        </ul>
      </div>
      <div className="footer-section terms">
        <h4>Terms & Conditions</h4>
        <ul>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Newsletter</a>
          </li>
        </ul>
      </div>
      <div className="footer-section subscribe">
        <h4>Subscribe</h4>
        <p>Join our mailing list to receive updates and exclusive offers.</p>
        <form className="subscribe-form">
          <label htmlFor="email">Title</label>
          <input type="text" id="email" placeholder="email address" />
          <button type="submit" className="button-dark">
            Subscribe to our newsletter
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
