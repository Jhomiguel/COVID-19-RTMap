import React,{useState} from 'react';
import {Navbar, Nav} from 'react-bootstrap';



const Header = ({handleAuth,handleLogOut}) => {
    return ( 
     <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Covid19-Map</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Mapa</Nav.Link>
                    <Nav.Link href="#link">Stadisticas</Nav.Link>
                </Nav>  
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: <a href="#login">Prueba </a>
                <button className="btn btn-outline-danger btn-sm">Log Out</button>
                <button className="btn btn-outline-success btn-sm">Log In</button>
            </Navbar.Text>
        </Navbar.Collapse>
        </Navbar>
     );
}
 
export default Header;