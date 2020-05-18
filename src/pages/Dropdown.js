import React, { Component } from 'react';
import  {Container,Row,Jumbotron,Col} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

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

        event.preventDefault();
            localStorage.setItem('year',JSON.stringify(this.state.value));
            
            const prod={
                subject:JSON.parse(localStorage.getItem('id')),
                year: JSON.parse(localStorage.getItem('year')),
                resourceType: JSON.parse(localStorage.getItem('resourcetype')),
                semester: JSON.parse(localStorage.getItem('sem')),
              };
            console.log(prod)
            
              this.props.history.push('/videoPage');
          
      }

   render() {
      const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }
     
      
    return (
      <center>
        <NavigationBar/>
      <Container>
       <Row>
       <Col lg={12} style={marginTop}>
        <div className="FormCenter" >
      <form onSubmit={this.handleSubmit}>
         <div className="FormField"> 
        
         <Jumbotron className="bg-dark text-white">
                
          <label>Select year</label>
          <br/>
          
          <select className="FormField__Buttonp mr-20" value={this.state.value} onChange={this.handleChange}>
            <option defaultValue>Choose year</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
          </select>
        {'  '}
        <input  className="FormField__Button mr-20" type="submit" value="Submit"/>
        </Jumbotron>
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
