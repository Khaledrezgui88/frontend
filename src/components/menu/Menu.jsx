import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Gmc</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/products')} >
              Products
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/users')}>
              Users
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/orders')}>
              Orders
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/categories')}>
              Category
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </div>
  )
}

export default Menu