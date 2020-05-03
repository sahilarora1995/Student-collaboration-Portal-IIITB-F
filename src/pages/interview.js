import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class interview extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
        
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
          
            localStorage.setItem('sem',JSON.stringify(this.state.value));
          this.props.history.push('/subjects');
        
        event.preventDefault();
      }

  
    render() {
      const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }
     

        return (
          
          <center>
            <NavigationBar history={this.props.history}/>
          <Container >
            <Row>
              <Col lg={12} style={marginTop}>
                 
                <Jumbotron className="bg-dark text-white">
                <h1>WELCOME TO STUDENT COLLOLABORATION PORTAL</h1>

                </Jumbotron>

                <div className="FormCenter" >
                    <form onSubmit={this.handleSubmit} className="FormFields">
                      <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">WELCOME TO STUDENT COLLOLABORATION PORTAL</label>
              
                    
                      </div>
        
                      <div className="FormField">
                  
                        <input type="text" className="FormField__Input" placeholder="Enter you name.."  value={this.state.value} onChange={this.handleChange}/>
                        <input type="text" className="FormField__Input" placeholder="which year you got placed?" name="password"  />                        
                        <input type="text" className="FormField__Input" placeholder="Which company you atr placed in ?"  value={this.state.value} onChange={this.handleChange}/>
                        <input type="text" className="FormField__Input" placeholder="which year you graduated ?" name="password"  />                        
                        <button class="btn" type="submit" onClick={() => this.handleClick()}>Write your Experience Here..</button>
                   
              
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

export default interview;