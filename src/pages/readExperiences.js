import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Navbar,Nav,Container,Row,Jumbotron,Col,Table,Image,Button,Figure,Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/NavigationBar'
  
class readExperiences extends Component { 

    constructor(props){
      super(props);
      this.state = {exp:[]};
      this.patch=this.patch.bind(this);
  }
  
  // get request may take few seconds, meanwhile response will have [Promise] object, once the data is got, response gets converted to JSON string
  // so using async, await for the response to load
  // everytime the state changes, render is called again. Therefore, we should not try changing state from render

  async componentDidMount(){

    await axios.get('/interviewData/').
    then(Response =>{
      this.setState({exp:Response.data});
    }).
    catch(error => {
      console.log("error getting");
    })
  }
  
  patch = (id,data) => {
    let url="/interviewData/"+id+"/";
    axios.patch(url,data,{headers:{'Content-Type':'application/json'}} ).then(Response => {console.log(Response)}).
    catch(e => console.log("error"))
    window.location.reload();
  }
  upvote = (id,num) => {
    const data={
      numberofUpvotes: num,
    }
    this.patch(id,data);
  };

  // function to return the display html to render
    fileData = () => { 

      if(this.state.exp)
      {
        const exps = this.state.exp.map((e) =>
          (<div key={e.id}>
              <Card className={"border border-dark bg-white text-dark text-left"}>
                <Card.Header as="h5">Title: 
                  <Card.Link href={"/readOneExp/"+e.id}>{e.title}</Card.Link>
                </Card.Header>
                <Card.Body className="text-black">
                  <Row>
                    <Col>Author: {e.name}</Col>
                    <Col className="text-right">
                      <Button className="btn pull-right" variant="light" size="sm" onClick={() => this.upvote(e.id,e.numberofUpvotes+1)}>
                      <FontAwesomeIcon icon={faThumbsUp}/>{' '}{e.numberofUpvotes}</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br/>
          </div>));

       return(
          <div>
            <h1 className="text-white">Experiences</h1>
                
              {exps}

          </div>
        );
      }
      return ;
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
                  <div>
                    {this.fileData()}
                  </div>
                </Col>
              </Row>
            </Container>
        </center>
      ); 
    } 
  } 
  
  export default readExperiences; 