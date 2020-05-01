import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class verify extends Component {
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
       
      
            localStorage.setItem('year',JSON.stringify(this.state.value));
            

            const prod={
  subject:JSON.parse(localStorage.getItem('id')),
  year: JSON.parse(localStorage.getItem('year')),
  resourceType: JSON.parse(localStorage.getItem('resourcetype')),
  semester: JSON.parse(localStorage.getItem('sem')),
};
            console.log(prod)
            

          this.props.history.push('/getorPost');
        
        event.preventDefault();
      }
       state = {
    redirect: false
  }

 

   render() {
      const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }
      setTimeout(function(){
            window.location.href = 'http://localhost:3000/verified/';
         }, 5000);   
      
    return (
        
      <div class="container">
  <section>
  <p>

  <span>
    VERIFYING FROM ADMINS.. PLEASE BE PATIENT..
  </span>
  &mdash;  &mdash;
</p>
    <div class="loader loader-1">
      <div class="loader-outter"></div>
      <div class="loader-inner"></div>
    </div>
  </section>  
</div>
    
    );
   }
}

export default verify;