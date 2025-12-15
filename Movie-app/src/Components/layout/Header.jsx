import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
const Header = () => {

   const getNavLinkStyle = ({isActive})=>{
     return {
      color:isActive?"#646cff":"black"
     }
   }

  return (
    <header className="section-navbar">
      <section className="top_txt">
        <div className="head container">
          <div className="head_txt">
            <p>Free shipping, 30-day return or refund guarantee.</p>
          </div>
          <div className="sing_in_up">
            <NavLink to="# ">SIGN IN</NavLink>
            <NavLink to="# ">SIGN UP</NavLink>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/">
            <img
              src={logo}
              alt="thapa eCommerce logo"
              className="logo"
              width="80%"
              height="auto"
            />
          </NavLink>
        </div>

        <nav className="navbar">
          <ul>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" style={getNavLinkStyle}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" style={getNavLinkStyle}>
                about
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movie" className="nav-link" style={getNavLinkStyle}>
                movie
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" style={getNavLinkStyle}>
                contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
