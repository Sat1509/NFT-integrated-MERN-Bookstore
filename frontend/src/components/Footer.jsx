import React from 'react';
import { Link } from "react-router-dom"; // Import Link
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import './css/footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="container">
        {/* Left Side - Logo and Nav */}
        <div className="left-section">
          <img src={footerLogo} alt="Logo" className="logo" />
          <div className="footer-links">
            <Link to="/">Home</Link> {/* Use Link instead of a tag */}
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Right Side - Newsletter */}
        <div className="newsletter">
          <p>
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <div className="newsletter-input">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container border-top">
        {/* Left Side - Privacy Links */}
        <ul className="privacy-links">
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
