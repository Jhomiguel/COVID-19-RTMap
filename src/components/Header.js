import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";

const Header = ({ handleAuth, handleLogOut, user }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">COVID-19 Map Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse className="justify-content-end">
        {user ? (
          <Navbar.Text>
            Signed in as:
            <Image src={user.PhotoURL} rounded />
            <span> {user.displayName}</span>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogOut}
            >
              {" "}
              Log Out
            </button>
          </Navbar.Text>
        ) : (
          <button
            className="btn btn-outline-success btn-sm"
            onClick={handleAuth}
          >
            Log In With Google
          </button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
