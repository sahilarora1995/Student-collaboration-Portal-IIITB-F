import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';


class NavigationBar extends React.Component{
  render(){
    return(
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/" >STUDENT COLLOBORATION PORTAL</Navbar.Brand>
          <Nav pullRight className="ml-auto">
        </Nav>
      </Navbar>

    );
  }
}
export default NavigationBar;
