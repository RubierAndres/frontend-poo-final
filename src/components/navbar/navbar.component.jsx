import React from "react";
import { Link } from "react-router-dom";
// import Container from "../container/container.component";
import NavbarList from "./navbar.list";
import { Navbar, Container } from "react-bootstrap";

const HeaderNavbar = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="logo"
                src={require("../../assets/logo.png")}
                alt="Main Logo"
              />
            </Link>
          </Navbar.Brand>
          <NavbarList />
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderNavbar;
