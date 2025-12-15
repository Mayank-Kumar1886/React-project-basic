import React from "react";
import { NavLink } from "react-router-dom";
import "./UIstyles/Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <img
            src="https://imgs.search.brave.com/rw0BtzCH0g5Naup9F_Tt_3yVuG83Zv9KlA9IJh6Ln84/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zY2hv/b2wtbG9nby1vcGVu/LWJvb2stc3R1ZGVu/dC1zaWxob3VldHRl/LWtub3dsZWRnZS1l/ZHVjYXRpb24tc3lt/Ym9sLXVuaXZlcnNp/dHktbGlicmFyeS1i/b29rc3RvcmUtbG9n/b3R5cGUtdGVtcGxh/dGUtdmVjdG9yLTIx/Mzk0NjE5MS5qcGc"
            alt="College Logo"
          />
        </NavLink>
      </div>

      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/students">Students</NavLink>
          </li>
          <li>
            <NavLink to="/teachers">Teachers</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
