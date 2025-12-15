import {FaHeart,FaShoppingCart,FaUser} from "react-icons/fa";
import "./Nav.css";

const Nav = () => {
  return (
    <nav>
      <div className="nav-container">
        <input
          type="text"
          placeholder="Enter your search shoes"
          className="search-input"
        />
      </div>
      <div className="profile-container">
        <a href="#">
           <FaHeart className="nav-icons"/>
        </a>
        <a href="">
           <FaShoppingCart className="nav-icons"/>
        </a>
        <a href="">
           <FaUser className="nav-icons"/>
        </a>
      </div>
    </nav>
  );
};
export default Nav;
