import React from 'react';
import {Navbar,Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component{

  	  constructor(props) {
		    super(props);
		    this.state = {value: true};

		    this.logout = this.logout.bind(this);
      }

    // redirecting to Login on clicking Logout
    logout=(event)=>{

      event.preventDefault();
      localStorage.setItem("loggedin",false);
      localStorage.clear();
      this.setState({value:false});
      window.location.reload();

      
    }
  render(){
    // Login page
    if(localStorage.getItem('loggedin')==="false"||localStorage.getItem('loggedin')==="")
    }
  render(){
    // Login page
    if(localStorage.getItem('loggedin')&&(localStorage.getItem('loggedin')==="false"||localStorage.getItem('loggedin')===""))
 c599f8def127873a431fd13e1cfbef7ca2dd12bb
    {
      return(
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/" >STUDENT COLLABORATION PORTAL</Navbar.Brand>
        </Navbar>);
    }
    else
    { // other pages on login will get Logout button
      return(
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/welcome" >STUDENT COLLABORATION PORTAL</Navbar.Brand>
          <Nav pullright="true" className="ml-auto">
          <Button size="sm" variant="secondary" onClick={this.logout}><Link to="/">Logout</Link></Button>
          </Nav>

          <Button className="ml-auto" size="sm" variant="secondary" onClick={this.logout}><Link to="/">Logout</Link></Button>

          
        </Navbar>);
    }
  }
}
export default NavigationBar;