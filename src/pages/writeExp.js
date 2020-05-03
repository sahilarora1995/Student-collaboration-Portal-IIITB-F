import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class writeExp extends Component {
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
          
          localStorage.setItem('interviewExp',JSON.stringify(this.state.value));
           console.log(JSON.parse(localStorage.getItem('interviewExp')))
          this.props.history.push('/verify');
        
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
        <div id="wrapper">

	<form id="paper" method="get" action="">

		<div id="margin">Title: <input id="title" type="text" name="title"></input></div>
		<textarea placeholder="Share your interview experience in Detail..." id="text" rows="6"  styles="overflow: hidden; word-wrap: break-word; resize: none; height: 160px; "></textarea>  
		<input id="button" type="submit" value="Create"onClick={this.handleChange}></input>
		
	</form>

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

export default writeExp;