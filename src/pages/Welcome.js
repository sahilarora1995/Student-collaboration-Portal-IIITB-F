import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import  {Card,Container,Row,Jumbotron,Col, Button} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    if(localStorage.getItem('loggedin')==='false')
    {
      alert("you have to log in");
      return <Redirect to="/"/> ;
    }
      const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }
        return (

      <div>  
        <NavigationBar/>
     <header>
<nav class="nav npc">
    <a href="http://localhost:3000/welcome/" class="nav-item" active-color="orange">Home</a>
    <a href="http://localhost:3000/pyq/" class="nav-item" active-color="green">PYQ</a>
    <a href="http://localhost:3000/readIntervieworwrite/" class="nav-item" active-color="blue">INTERVIEWS EXPERIENCES</a>
    <a href="http://localhost:3000/semester/" class="nav-item" active-color="red">VIDEOS</a>
    <a href="http://localhost:3000/mockSchedule/" class="nav-item" active-color="rebeccapurple">MOCK INTERVIEWS</a>
    <a href="http://localhost:3000/aboutus/" class="nav-item" active-color="rebeccapurple">ABOUT US</a>
    <span class="nav-indicator"></span>
  </nav>

  
  <header class="cd-header">
    <div class="header-wrapper">
        <div class="logo-wrap">
            <a href="#" class="hover-target"><span>div</span>dev</a>
        </div>
        <div class="nav-but-wrap">
            <div class="menu-icon hover-target">
                <span class="menu-icon__line menu-icon__line-left"></span>
                <span class="menu-icon__line"></span>
                <span class="menu-icon__line menu-icon__line-right"></span>
            </div>					
        </div>					
    </div>				
</header>
      <div class="nav-overlay"></div>
  <div class="nav nmb">
    <div class="nav__content">
        <ul class="nav__list">
            <li class="nav__list-item"><a href="http://localhost:3000/welcome/" class="hover-target">Home</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/pyq/" class="hover-target">PYQ</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/semester/" class="hover-target">VIDEOS</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/readIntervieworwrite" class="hover-target">INTERVIEWS EXPERIENCES</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/mockSchedule/" class="hover-target">MOCK INTERVIEWS</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/aboutus" class="hover-target">ABOUT US</a></li>
            
        </ul>
    </div>
    
</div>	
</header>

<div class="sp-container">
	<div class="sp-content">
		<div class="sp-globe"></div>
		<h2 class="frame-1">WELCOME</h2>
		<h2 class="frame-2">TO</h2>
		<h2 class="frame-3">STUDENT COLLOBORATION PORTAL OF</h2>
		<h2 class="frame-4">IIITB</h2>
		<h2 class="frame-5">
			<span>WHERE</span>
			<span>  YOU</span>
      <span>  GET</span>
			<span>   EVERYTHING</span>
		</h2>
	</div>
</div>

</div>
        );
    }
    
}

export default Welcome;
