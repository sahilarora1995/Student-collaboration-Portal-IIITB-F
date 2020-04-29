import React from 'react';
import {Navbar,Nav, Button} from 'react-bootstrap';

class NavigationBar extends React.Component{

  	  constructor(props) {
		    super(props);
		    this.state = {value: ''};

		    this.logout = this.logout.bind(this);
		  }

    // redirecting to Login on clicking Logout
    logout=()=>{
      localStorage.setItem("loggedin",false);
      this.props.history.push("/");
    }
  render(){
    // Login page
    if(localStorage.getItem('loggedin')==="false")
    {
      return(
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/" >STUDENT COLLOBORATION PORTAL</Navbar.Brand>
            <Nav pullRight className="ml-auto">
          </Nav>
        </Navbar>);
    }
    else
    { // other pages on login will get Logout button
      return(
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/" >STUDENT COLLOBORATION PORTAL</Navbar.Brand>
            <Nav pullRight className="ml-auto">
          </Nav>
          <Button className="ml-auto" size="sm" variant="secondary" onClick={this.logout}>Logout</Button>
        </Navbar>);
    }
  }
}
export default NavigationBar;