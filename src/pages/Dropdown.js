import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'

class Dropdown extends Component {
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
    if(this.state.value== 'c')
    {
      this.props.history.push('/');
    }
    else if (this.state.value=='p') {
      this.props.history.push('/');
    }
    event.preventDefault();
  }
  
    onSubmit = () => {
          this.props.history.push('/');
      
   }

   handleClick() { this.props.history.push('/subjects'); console.log('this is:', this); } 
   handleClickp() { this.props.history.push('/'); console.log('this is:', this); }
   render() {
      const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }
     
    return (
      <center>
      <Container>
       <Row>
       <Col lg={12} style={marginTop}>
        <div className="FormCenter" >
      <form onSubmit={this.handleSubmit}>
         <div className="FormField"> 
        <label>
         <Jumbotron className="bg-dark text-white">
                <h1> SELECT THE YEAR :</h1>
                </Jumbotron>
          
          <select className="FormField__Buttonp mr-20" value={this.state.value} onChange={this.handleChange}>
            <option   className="FormField__Label" value="2014">2014</option>
            <option    className="FormField__Label" value="2015">2015</option>
            <option     className="FormField__Label" value="2016">2016</option>
            <option     className="FormField__Label" value="2017">2017</option>
            <option     className="FormField__Label" value="2018">2018</option>
            <option     className="FormField__Label" value="2019">2019</option>
            <option     className="FormField__Label" value="2020">2020</option>
          </select>
        </label>
        <input  className="FormField__Button mr-20" type="submit" value="Submit" />
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

export default Dropdown;