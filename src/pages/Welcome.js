import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event)
  {
        this.setState({value: event.target.value});
  }
    
  handleSubmit(event) {
    console.log(event.target.id)
    localStorage.setItem('resourcetype',JSON.stringify(this.state.value));
    this.props.history.push('/semester');
        
    event.preventDefault();
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
          
          <center>
            <NavigationBar/>
          <Container >
            <Row>
              <Col lg={12} style={marginTop}>
                 
                <Jumbotron className="bg-dark text-white">
                <h1>WELCOME TO STUDENT COLLOLABORATION PORTAL</h1>

                </Jumbotron>

                <div className="FormCenter" >
                    <form onSubmit={this.handleSubmit} className="FormFields">
                      <div className="FormField">
                      <span>WELCOME TO STUDENT COLLOLABORATION PORTAL </span>
                                    
                    
                      </div>
        
                      <div className="FormField">
                  
                   <input  className="FormField__Button mr-20"  type="submit" value="PREVIOUS YEAR QUESTIONS"  onClick={this.handleChange} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="BLOGS BY SENIORS"  onClick={this.handleChange}/> 
                   <input  className="FormField__Button mr-20"  type="submit" value="TIPS BY SENIORS"  onClick={this.handleChange} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="IMPORTANT VIDEO RESOURCES" onClick={this.handleChange} />
    
              
                      </div>
                    </form>
                  </div>
              </Col>
            </Row>
          </Container>
          </center>

        );
    }
}

export default Welcome;