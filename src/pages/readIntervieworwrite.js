import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class readIntervieworwrite extends Component {
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
            console.log(event.target.id)
            localStorage.setItem('resourcetype',JSON.stringify(this.state.value));
          this.props.history.push('/semester');
        
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
                      <span>DO YOU WANT TO READ OR WRITE AN EXPERIENCE..? </span>
                                    
                    
                      </div>
        <center>
                   <div class="select">
  <select name="slct" id="slct">
    <option selected disabled>Choose an option</option>
    <option value="1">READ EXPERIENCES</option>
    <option value="2">WRITE WRITE EXPERIENCES</option>
    <option value="3">GO TO HOME PAGE </option>
  </select>
</div>
</center>
                    </form>
                  </div>
              </Col>
            </Row>
          </Container>
          </center>

        );
    }
}

export default readIntervieworwrite;