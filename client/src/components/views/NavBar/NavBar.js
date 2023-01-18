import React from "react";
import Menu from "./Sections/Menu";
import "bootstrap/dist/css/bootstrap.css";
import "./Sections/Navbar.css";
import logo from "./Sections/logo.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" style={{ width: "40px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Menu />
      </Container>
    </Navbar>
  );
}

export default NavBar;
