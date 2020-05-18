import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Container,Row,Jumbotron,Col,Table,Image,Button,Figure,Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/NavigationBar'
  
class readOnePYQ extends Component { 

    constructor(props){
      super(props);
      this.state = {exp:''};
      this.patch=this.patch.bind(this);
  }

  async componentDidMount(){

    await axios.get('/getData/'+this.props.match.params.id)
    .then(Response =>{
      this.setState({exp:Response.data});
      console.log(this.state.exp);
    })
    .catch(error => {
      console.log("error getting");
    })
  }

  patch = (id,data) => {
    let url="/getData/"+id+"/";
    axios.patch(url,data,{headers:{'Content-Type':'application/json'}} ).then(Response => {console.log(Response)})
    .catch(e => console.log("error"))
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

		const e=this.state.exp;
        
		return (
			<div>
        <NavigationBar/>
              <Card className={"border border-dark bg-dark text-white text-left"}>
                <Card.Header>
                <Row>
                    <Col>
                      <b>Subject: {e.subject},   Year: {e.year},    Sem: {e.semester}</b>
                    </Col>
                    <Col className="text-right">
                        <Button className="btn pull-right" variant="light" size="sm" onClick={() => this.upvote(e.id,e.numberofUpvotes+1)}>
                        <FontAwesomeIcon icon={faThumbsUp}/>{' '}{e.numberofUpvotes}</Button>
                    </Col>
                </Row>
                </Card.Header>
                    <Card.Body className="text-black">
                      <Figure.Image width={400} height={400} src={e.file}/>
                    </Card.Body>
                </Card>
              <br/>
          </div>
		);
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
  
  export default readOnePYQ; 