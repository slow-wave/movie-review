import React from "react";
import Menu from "./Sections/Menu";
import "./Sections/Navbar.css";
import logo from "./Sections/logo.png";

function NavBar() {
  return (
    <nav className="menu" style={{ zIndex: 5, width: "100%" }}>
      <div className="menu__logo">
        <a href="/">
          <img src={logo} alt="logo" style={{ width: "60px" }} />
        </a>
      </div>
      <div>
        <Menu />
      </div>
    </nav>
  );
}

export default NavBar;
