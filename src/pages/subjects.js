import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class subjects extends Component {
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

   handleClick() { this.props.history.push('/Dropdown'); console.log('this is:', this); } 
   handleClickp() { this.props.history.push('/'); console.log('this is:', this); }

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
                        <label className="FormField__Label" htmlFor="name">CHOOSE THE SUBJECTS</label>
              
                    
                      </div>
        
                      <div className="FormField">
                  
                   <input  className="FormField__Button mr-20"  type="submit" value="ALGORITHMS"  onClick={() => this.handleClick()} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="NETWORKS"  onClick={() => this.handleClickU()} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="ML"  onClick={() => this.handleClickU()} /> 
                   <input  className="FormField__Button mr-20"  type="submit" value="MML"  onClick={() => this.handleClickp()} />
    
              
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

export default subjects;