import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navLinkClass = ({ isActive }) =>
    `py-1 text-sm font-semibold border-b-[3px] transition-all duration-200
     ${
       isActive
         ? "text-black border-b-red-500"
         : "text-gray-400 border-b-transparent hover:text-black"
     }`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/signin");
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-5 py-4 max-w-6xl mx-auto">
        <img
          src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
          alt="logo"
          className="h-6 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <ul className="flex items-center gap-8">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/listings" className={navLinkClass}>
              Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>

          {currentUser ? (
            <li className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="font-semibold text-sm text-black hover:text-red-500 transition"
              >
                {currentUser.username}
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-4 w-44 bg-white rounded-xl shadow-xl border py-2 z-50 animate-fadeIn">
                  <button
                    onClick={() => navigate("/upload")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Upload Property
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <NavLink to="/signin" className={navLinkClass}>
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
