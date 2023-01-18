/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { USER_SERVER } from "../../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LoginOutlined,
  LogoutOutlined,
  StarOutlined,
  UserAddOutlined,
  EditOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  //logout state
  if (user.userData && !user.userData.isAuth) {
    return (
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" style={{ color: "#090707" }}>
            <HomeOutlined />
            Home
          </Nav.Link>
          <Nav.Link href="/search" style={{ color: "#090707" }}>
            <SearchOutlined />
            Search
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2} href="/login" style={{ color: "#090707" }}>
            <LoginOutlined />
            Signin
          </Nav.Link>
          <Nav.Link eventKey={2} href="/register" style={{ color: "#090707" }}>
            <UserAddOutlined />
            Signup
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );
  } else {
    //login state
    return (
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" style={{ color: "#090707" }}>
            <HomeOutlined />
            Home
          </Nav.Link>
          <Nav.Link href="/search" style={{ color: "#090707" }}>
            <SearchOutlined />
            Search
          </Nav.Link>
          <Nav.Link href="/favorite" style={{ color: "#090707" }}>
            <StarOutlined />
            Favorites
          </Nav.Link>
          <Nav.Link href="/review" style={{ color: "#090707" }}>
            <EditOutlined />
            Review
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            eventKey={2}
            href="#memes"
            onClick={logoutHandler}
            style={{ color: "#090707" }}
          >
            <LogoutOutlined />
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );
  }
}

export default withRouter(RightMenu);
