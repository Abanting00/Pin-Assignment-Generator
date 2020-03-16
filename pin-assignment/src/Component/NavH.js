import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  NavbarText
} from 'reactstrap';

const NavH = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <NavbarText>
              {props.isDe2 ? <Button onClick={props.onSwitch}>Switch to De1-SoC</Button> :  <Button onClick={props.onSwitch}>Switch to De2</Button>}
            </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavH;