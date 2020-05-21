import React, { Component } from 'react';
import axios from 'axios';
import  {Container,Row,Col, Card,Form,Button} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

class writeExp extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '',grad_year:'',company:'',placed_year:'',title:'',exp:''};

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(event) { 
    this.setState({
			[event.target.name]:event.target.value
		});
  }
    
  handleSubmit(e){
    e.preventDefault() // Stop form submit
    
    const details={
      name:localStorage.getItem("user"),
      yearPassout:this.state.grad_year,
      yearPlaced:this.state.placed_year,
      experience:this.state.exp,
      title:this.state.title,
      company:this.state.company
    }
    console.log(details);
    
  axios.post("http://localhost:8000/interviewData/", details).
  then(response => {
      //ToastsStore.success("Submitted, admin will verify");
      alert("Submitted, admin will verify");
      this.props.history.push('/readExperiences');
  }).
  catch(error => 
    ToastsStore.error("please enter valid inputs"));
  }

    render() {
      const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }
     
        return (
          
          <center>
            <NavigationBar/>
            <ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
            <Container>
            <Row>
              <Col lg={12} style={marginTop}>
              <div>
                  <Card className={"border border-dark bg-dark text-white"}>
                    <Form id="FormId" onSubmit={this.handleSubmit}>
                    <Card.Body>
                    <Card.Header>Experience Form</Card.Header>
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGrid">
                                <Form.Label>Graduation Year from IIITB</Form.Label>
                                <Form.Control as="select" value={this.state.grad_year} name="grad_year" onChange={this.onChange} required className={"bg-dark text-white"}>
                                  <option></option>
                                  <option value="2014">2014</option>
                                  <option value="2015">2015</option>
                                  <option value="2016">2016</option>
                                  <option value="2017">2017</option>
                                  <option value="2018">2018</option>
                                  <option value="2019">2019</option>
                                  <option value="2020">2020</option>
                                </Form.Control>
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGrid">
                              <Form.Label>Company</Form.Label>
                              <Form.Control type="text" name="company" value={this.state.company} onChange={this.onChange}
                                placeholder="Enter company name you are working in"
                                className={"bg-dark text-white"}/>
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGrid">
                                <Form.Label>Placement year</Form.Label>
                                <Form.Control as="select" value={this.state.placed_year} name="placed_year" onChange={this.onChange} required className={"bg-dark text-white"}>
                                  <option></option>
                                  <option value="2014">2014</option>
                                  <option value="2015">2015</option>
                                  <option value="2016">2016</option>
                                  <option value="2017">2017</option>
                                  <option value="2018">2018</option>
                                  <option value="2019">2019</option>
                                  <option value="2020">2020</option>
                                </Form.Control>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGrid">
                              <Form.Label>Title of Experience</Form.Label>
                              <Form.Control type="text" name="title" value={this.state.title} onChange={this.onChange}
                                placeholder="Enter title"
                                className={"bg-dark text-white"}/>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGrid">
                              <Form.Label>Your Experience</Form.Label>
                              <Form.Control as="textarea" placeholder="Share your interview experience in Detail..." id="text" rows="6"  styles="overflow: hidden; word-wrap: break-word; resize: none; height: 160px;white-space:pre-wrap;" 
                              name="exp" value={this.state.exp} onChange={this.onChange} className={"bg-dark text-white"}></Form.Control>
                          </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                    <Button size="sm" variant="success" type="submit">Submit</Button>
                    </Card.Footer>
                    </Form>
                  </Card>
                  
                </div>   
              </Col>
            </Row>
          </Container>
          </center>

        );
    }
}

export default writeExp;
