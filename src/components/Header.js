import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';



const Header = ({handleAuth,handleLogOut,user}) => {
   
    return ( 
     <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Covid-19 Map Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Map</Nav.Link>
                    <Nav.Link href="#link">Global Stats</Nav.Link>
                </Nav>  
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
                {user
                ?(
                <Navbar.Text> 
                    Signed in as: <span> {user.displayName}</span> 
                    
                    
                    
                    <button
                    className="btn btn-outline-danger btn-sm" 
                    onClick={handleLogOut}> Log Out
                    </button>    
                </Navbar.Text>)
                :
                (<button className="btn btn-outline-success btn-sm" onClick={handleAuth}>Log In With Google</button>)}

        </Navbar.Collapse>
        </Navbar>

     );
    
}
 
export default Header;