import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class getorPost extends Component {
  
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGet = this.handleGet.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

   handlePost() { this.props.history.push('/postd'); console.log('this is:', this); } 
   handleGet() { this.props.history.push('/get'); console.log('this is:', this); }

    render() {
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

                <div className="FormCenter" >
                    <form onSubmit={this.handleSubmit} className="FormFields">
                      
                      <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">CHOOSE WHAT YOU WANNA DO?</label>
                      </div>
        
                      <div className="FormField">
                        <input  className="FormField__Button mr-20"  type="submit" value="POST"  onClick={() => this.handlePost()} /> 
                        <input  className="FormField__Button mr-20"  type="submit" value="GET"  onClick={() => this.handleGet()} /> 
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

export default getorPost;