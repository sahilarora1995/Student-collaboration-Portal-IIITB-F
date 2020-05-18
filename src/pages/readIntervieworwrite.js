import React, { Component } from 'react';
import  {Container,Row,Col,Card,Form,Button} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class readIntervieworwrite extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
            console.log(this.state.value);

          if(this.state.value==1)
            this.props.history.push('/readExperiences');
          else if(this.state.value==2)
            this.props.history.push('/writeExp');
        
        event.preventDefault();
      }

  
    render() {
      const marginTop={
        marginTop:"40px",
        alignItems:"center"
      }
     

        return (
                <center>
                <NavigationBar/>
              <Container>
              <Row>
              <Col lg={12} style={marginTop}>
                <div>
                  <Card className={"border border-dark bg-dark text-white text-center"}>
                    
                    <Form id="FormId" onSubmit={this.handleSubmit} >
                    <Card.Body>
                    <span>DO YOU WANT TO READ OR WRITE AN EXPERIENCE..? </span>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGrid">
                            <Form.Label></Form.Label>
                                        <Form.Control as="select" value={this.state.value} onChange={this.handleChange} className={"bg-dark text-white"}>
                                          <option value="1">READ EXPERIENCES</option>
                                          <option value="2">WRITE EXPERIENCES</option>
                                        </Form.Control>
                          </Form.Group>
                        </Form.Row>
                        </div>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"center"}}>
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

export default readIntervieworwrite;
