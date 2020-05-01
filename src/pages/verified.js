import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class verified extends Component {
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
          alert("REDIRECTING YOU TO HOME PAGE !!")
            window.location.href = 'http://localhost:3000/welcome/';
         }, 7000);   
      
    return (
        
      <div class="container">
  <p>

  <span>
    YOU ARE SUCCESSFULLY BEING VERIFIED.. AND YOUR DATA IS SAVED. THANKS FOR YOUR CONTRIBUTION
  </span>
  &mdash;  &mdash;
</p>
</div>
    );
   }
}

export default verified;