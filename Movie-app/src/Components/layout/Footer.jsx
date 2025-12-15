import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../images/logo.png"; // Assuming this is your movie app's logo

const Footer = () => {
  return (
    <footer className="section-footer">
      <div className="footer-container container">

        {/* === Content 1: App Info & Description === */}
        <div className="content_1">
          <NavLink to="/">
            <img src={logo} alt="Thapa Stream Logo" className="footer-logo" />
          </NavLink>
          <p>
            Welcome to **Thapa Stream**, your ultimate destination for
            the latest movies, captivating webseries, and exciting shows!
          </p>
          {/* Optional: Add social media icons here if desired */}
          {/* <div className="social-icons">
               <i className="bx bxl-facebook-square"></i>
               <i className="bx bxl-instagram-alt"></i>
               <i className="bx bxl-twitter"></i>
          </div> */}
        </div>

        {/* === Content 2: Browse by Type === */}
        <div className="content_2">
          <h4>Browse</h4>
          <NavLink to="/category/movies">Movies</NavLink>
          <NavLink to="/category/webseries">Webseries</NavLink>
          <NavLink to="/category/tv-shows">TV Shows</NavLink>
          <NavLink to="/category/anime">Anime</NavLink>
          <NavLink to="/latest">New Releases</NavLink>
        </div>

        {/* === Content 3: Account & Support === */}
        <div className="content_3">
          <h4>Account & Support</h4>
          <NavLink to="/profile">My Profile</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
          <NavLink to="/help">Help Center / FAQs</NavLink>
          <NavLink to="/terms-of-use">Terms of Use</NavLink>
          <NavLink to="/privacy-policy">Privacy Policy</NavLink>
        </div>

        {/* === Content 4: Newsletter/Updates === */}
        <div className="content_4">
          <h4>STAY UPDATED</h4>
          <p>Get exclusive updates on new additions & features!</p>
          <div className="f-mail">
            <input type="email" placeholder="Your Email" aria-label="Newsletter Email" />
            <button className="subscribe-btn" aria-label="Subscribe">
                <i className="bx bx-envelope"></i>
            </button>
          </div>
          <hr />
        </div>
      </div>

      {/* === Copyright Section === */}
      <div className="f-design">
        <div className="f-design-txt">
          <p>&copy; {new Date().getFullYear()} Thapa Stream. Design and Code by Thapa Technical</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;