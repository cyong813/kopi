import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from '../assets/images/coffee_icon.png';

<Navbar>
    <Navbar.Brand href="#home">
      <img
        src={Logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
    </Navbar.Brand>
  </Navbar>

  export default Navbar;