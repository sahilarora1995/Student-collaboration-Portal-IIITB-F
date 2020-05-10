import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import  {Card,Container,Row,Jumbotron,Col, Button} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
<<<<<<< HEAD
  handleChange(event) {
        
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
            console.log(event.target.id)
            //alert('An essay was submitted: ' + this.state.value);
            localStorage.setItem('resourcetype',JSON.stringify(this.state.value));
            if (this.state.value == "MOCK INTERVIEW")
              this.props.history.push('/mockSchedule');
            else
             this.props.history.push('/semester');
        
        event.preventDefault();
      }
=======
>>>>>>> c599f8def127873a431fd13e1cfbef7ca2dd12bb

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
     <header>
<nav class="nav npc">
    <a href="http://localhost:3000/welcome/" class="nav-item" active-color="orange">Home</a>
    <a href="http://localhost:3000/semester/" class="nav-item" active-color="green">PYQ</a>
    <a href="http://localhost:3000/readIntervieworwrite/" class="nav-item" active-color="blue">INTERVIEWS EXPERIENCES</a>
    <a href="http://localhost:3000/semester/" class="nav-item" active-color="red">VIDEOS</a>
    <a href="#" class="nav-item" active-color="rebeccapurple">MOCK INTERVIEWS</a>
    <a href="http://localhost:3000/aboutus/" class="nav-item" active-color="rebeccapurple">ABOUT US</a>
    <span class="nav-indicator"></span>
  </nav>

<<<<<<< HEAD
                <div className="FormCenter" >
                    <form onSubmit={this.handleSubmit} className="FormFields">
                      <div className="FormField">
                      <span>WELCOME TO STUDENT COLLOLABORATION PORTAL </span>
                                    
                    
                      </div>
        
                      <div className="FormField">
                  
                   <input  className="FormField__Button mr-20"  type="submit" value="PREVIOUS YEAR QUESTIONS"  onClick={this.handleChange} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="MOCK INTERVIEW"  onClick={this.handleChange}/> 
                   <input  className="FormField__Button mr-20"  type="submit" value="TIPS BY SENIORS"  onClick={this.handleChange} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="IMPORTANT VIDEO RESOURCES" onClick={this.handleChange} />
=======
  
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
            <li class="nav__list-item"><a href="http://localhost:3000/semester/" class="hover-target">PYQ</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/semester/" class="hover-target">VIDEOS</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/readIntervieworwrite" class="hover-target">INTERVIEWS EXPERIENCES</a></li>
            <li class="nav__list-item"><a href="#" class="hover-target">MOCK INTERVIEWS</a></li>
            <li class="nav__list-item"><a href="http://localhost:3000/aboutus" class="hover-target">ABOUT US</a></li>
            
        </ul>
    </div>
>>>>>>> c599f8def127873a431fd13e1cfbef7ca2dd12bb
    
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