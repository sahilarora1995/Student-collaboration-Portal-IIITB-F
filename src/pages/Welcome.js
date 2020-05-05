import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import  {Card,Container,Row,Jumbotron,Col, Button} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    if(localStorage.getItem('loggedin')==='false')
    {
      alert("you have to log in");
      return <Redirect to="/"/> ;
    }
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
                 <Jumbotron className="bg-dark text-white">
                 <h1>WELCOME TO STUDENT COLLABORATION PORTAL</h1>
                 </Jumbotron>
              <div>
                  <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><b>Our Services</b></Card.Header>
                    <Card.Body>
                        <Row>
                          <Col>
                            <Button size="sm" variant="success" type="submit" 
                            onClick={()=>{localStorage.setItem('resourcetype',JSON.stringify('PYQ'));
                                          this.props.history.push("/semester");}}>Previous Year Questions</Button>
                            </Col>
                            <Col>
                            <Button size="sm" variant="success" type="submit"
                            onClick={()=>{localStorage.setItem('resourcetype',JSON.stringify('VideoResources'));
                                          this.props.history.push("/semester");}}>Important Video Resources</Button>
                            </Col>
                          </Row>
                          <br/>
                        <Row>
                          <Col>
                            <Button size="sm" variant="success" type="submit"
                            onClick={()=>{this.props.history.push("/readIntervieworwrite");}}>Interview Experience by Seniors</Button>
                            </Col>
                            <Col>
                            <Button size="sm" variant="success" type="submit"
                            onClick={()=>{localStorage.setItem('resourcetype',"Mock Interviews");
                                          this.props.history.push("/semester");}}>Mock Interviews</Button>
                            </Col>
                          </Row>
                    </Card.Body>
                  </Card>
                  
                </div>   
              </Col>
            </Row>
          </Container>
          </center>

        );
    }
}

export default Welcome;