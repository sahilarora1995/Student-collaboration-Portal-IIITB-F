import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class readExperiences extends Component {
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
                        <label className="FormField__Label" htmlFor="name">PAST INTERVIEW EXPERIENCES OF IIITB</label>
              
                    
                      </div>
                      <nav class="navbar navbar-inverse bg-inverse fixed-top bg-faded">
   
</nav>



<div class="container">
    <div class="row">
      <div class="col">
        <div class="card" styles="width: 20rem;">
  <img class="card-img-top" src="https://www.commercebloom.com/wp-content/uploads/2018/07/google-logo.jpg" alt="Card image cap"/>
  <div class="card-block">
    <h4 class="card-title"></h4>
    
    <a href="#" class="add-to-cart btn btn-primary">by Mr. ABC</a>
  </div>
</div>
      </div>
      <div class="col">
        <div class="card" styles="width: 20rem;">
  <img class="card-img-top" src="https://specials-images.forbesimg.com/imageserve/82a018350ea24de796e60ae9d6a9c7da/960x0.jpg?fit=scale.jpg" alt="Card image cap"/>
  <div class="card-block">
    <h4 class="card-title"></h4>
    
    <a href="#" data-name="Banana" data-price="1.22" class="add-to-cart btn btn-primary">By Mr. Ansh Goyal</a>
  </div>
</div>
      </div>
      <div class="col">
        <div class="card" styles="width: 20rem;">
  <img class="card-img-top" src="https://image.shutterstock.com/image-photo/kiev-ukraine-may-07-2015-260nw-276929006.jpg" alt="Card image cap"/>
  <div class="card-block">
    <h4 class="card-title">Lemon</h4>
   
    <a href="#"  class="add-to-cart btn btn-primary">by Mr. XYZ</a>
  </div>
</div>
      </div>
    </div>
</div>

  
 
<div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <table class="show-cart table">
          
        </table>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
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

export default readExperiences;