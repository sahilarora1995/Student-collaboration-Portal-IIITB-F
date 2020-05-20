import React from 'react';
import {Navbar,Nav, Button,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class NavigationBar extends React.Component{

  	  constructor(props) {
		    super(props);
		    this.state = {value: true};

		    this.logout = this.logout.bind(this);
      }

    // redirecting to Login on clicking Logout
    logout=(event)=>{

      event.preventDefault();
      localStorage.clear();
    }

    admin(){
      if(localStorage.getItem("role")==="admin")
        {
          return(
            <NavDropdown title="Verify" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/adminVerify/1">Previous Year Questions</NavDropdown.Item>
                    <NavDropdown.Item href="/adminVerify/2">Interview Experiences</NavDropdown.Item>
                    <NavDropdown.Item href="/adminVerify/3">Video Resources</NavDropdown.Item>
            </NavDropdown>
          );
        }
    }

  render(){
    if(!localStorage.getItem("user"))
    {
      alert("you have to log in");
      return <Redirect to="/"/> ;
    }
    
      return(
        <Navbar collapseOnSelect bg="dark" variant="dark" fixed="top" style={{height: '50px'}}>
            <Navbar.Brand href="/welcome" >STUDENT COLLABORATION PORTAL</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/pyq/">Previous Year Questions</NavDropdown.Item>
                    <NavDropdown.Item href="/readIntervieworwrite/">Interview Experiences</NavDropdown.Item>
                    <NavDropdown.Item href="/videoPage/">Video Resources</NavDropdown.Item>
                    <NavDropdown.Item href="/mockSchedule/">Mock Interviews</NavDropdown.Item>
                  </NavDropdown>
                  {this.admin()}
                </Nav>

          <Nav pullright="true" className="ml-auto">
            <Button size="sm" variant="secondary" onClick={this.logout}><Link to="/">Logout</Link></Button>
          </Nav>
          </Navbar.Collapse>
        </Navbar>);
    
  }
}
export default NavigationBar;
