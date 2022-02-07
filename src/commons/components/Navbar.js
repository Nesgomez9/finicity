import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import logo from '../assets/icons/quick-penny-icon.png';
export const NavBar = () => {
  const history = useHistory();
  const routeChange = (path) => {
    history.push(`/${path}`);
  };
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          className="cursor-pointer"
          onClick={() => routeChange('')}
        >
          <img src={logo} height="50" alt="" className="nav-profile-img" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
