import React from "react";
import "./UIstyles/Footer.css";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (

        <footer className="footer">
          <div className="footer-left">
            <NavLink to="/">
              <img
                className="college-logo"
                src="https://imgs.search.brave.com/rw0BtzCH0g5Naup9F_Tt_3yVuG83Zv9KlA9IJh6Ln84/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zY2hv/b2wtbG9nby1vcGVu/LWJvb2stc3R1ZGVu/dC1zaWxob3VldHRl/LWtub3dsZWRnZS1l/ZHVjYXRpb24tc3lt/Ym9sLXVuaXZlcnNp/dHktbGlicmFyeS1i/b29rc3RvcmUtbG9n/b3R5cGUtdGVtcGxh/dGUtdmVjdG9yLTIx/Mzk0NjE5MS5qcGc"
                alt="COllege Logo"
              />
            </NavLink>
            <h2 className="college-name">Gold Institute of Technology</h2>
          </div>
          <div className="right-section">
            <div className="footer-section">
              <h3>Address</h3>
              <p>123, Knowledge Road, Sector 9</p>
              <p>New Delhi, India - 110001</p>
            </div>
            <div className="footer-section">
              <h3>Social Media</h3>
              <p>Instagram: @yourcollege</p>
              <p>Facebook: /yourcollege</p>
              <p>LinkedIn: /yourcollege</p>
            </div>
            <div className="footer-section">
              <h3>Phone</h3>
              <p>+91 9876543210</p>
              <p>+91 9811122233</p>
            </div>

            <div className="footer-section">
              <h3>Email</h3>
              <p>info@yourcollege.edu</p>
              <p>admission@yourcollege.edu</p>
            </div>
          </div>
        </footer>
  );
};

export default Footer;
