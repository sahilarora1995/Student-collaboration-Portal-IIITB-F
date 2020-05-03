import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class semester extends Component {
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
                  
                    <input  className="FormField__Button mr-20"  type="submit" value="1"  onClick={this.handleChange}/> 
                   <input  className="FormField__Button mr-20"  type="submit" value="2"  onClick={this.handleChange} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="3"  onClick={this.handleChange} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="4"  onClick={this.handleChange} />
    
              
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

export default semester;