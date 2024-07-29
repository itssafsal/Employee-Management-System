import React from 'react'
import "./navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Naavbar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg" style={{background:"#2d3035"}}>
      <Container>
        <Navbar.Brand href="#home"><img style={{height:"50px", top:"6px"}} src="/images/logo.png.png" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link id='navlinks'>
              <Link to={'/'} style={{textDecoration:"none", color:"#8a8d93"}}>
              Home
              </Link>
              </Nav.Link>
            
            <NavDropdown title={<span style={{color:"white"}}>Employee</span>} id="collapsible-nav-dropdown">
              <NavDropdown.Item> <Link to={'/emplist'} style={{textDecoration:"none", color:"black"}} > Employee List </Link></NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={'/empcreate'} style={{textDecoration:"none", color:"black"}}>
                Create Employee
                </Link>
              </NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#profile" id='navlinks'>Profile</Nav.Link>
            <Nav.Link id='navlinks'>
              <Link to={'/login'} style={{textDecoration:"none", color:"#8a8d93"}}>
              Logout
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Naavbar
