import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Navbar,Nav,Container,Row,Jumbotron,Col,Table,Image,Button,Figure,Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/NavigationBar'
  
class get extends Component { 

    constructor(props){
      super(props);
      this.state = {images:[],vote:false};
      this.patch=this.patch.bind(this);
  }
  
  // get request may take few seconds, meanwhile response will have [Promise] object, once the data is got, response gets converted to JSON string
  // so using async, await for the response to load
  // everytime the state changes, render is called again. Therefore, we should not try changing state from render

  async componentDidMount(){

    var params={};
    var subject=JSON.parse(localStorage.getItem('id'));
    var year=JSON.parse(localStorage.getItem('year'));
    var resourcetype=JSON.parse(localStorage.getItem('resourcetype'));
    var sem=JSON.parse(localStorage.getItem('sem'));

    if(subject && subject.length)
      params.subject=subject;
    if(year && year.length)
      params.year=year;
    if(resourcetype && resourcetype.length)
      params.resourceType=resourcetype;
    if(sem && sem.length)
      params.semester=sem;

    //console.log(params);

    await axios.get('/getData/',
      {params}
    ).
    then(Response =>{
      this.setState({images:Response.data});
    }).
    catch(error => {
      console.log("error getting");
    })
  }

  patch = (id,data) => {
    let url="/patchData/"+id+"/";
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

  downvote = (id,num) => {
    const data={
      numberofDownvotes: num,
    }
    this.patch(id,data);
  };

  // function to return the display html to render
    fileData = () => { 

      if(this.state.images)
      {
        const image1 = this.state.images.map((e) =>
          (<div key={e.id}>
              <Card className="text-center">
                <Card.Header>
                  <Card.Link href="#">{e.resourceType}  {e.subject}  {e.year}  {e.semester}</Card.Link>
                </Card.Header>
                <Card.Body>
                  <Figure.Image width={400} height={400} src={e.file}/>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Button variant="outline-secondary"  onClick={() => this.upvote(e.id,e.numberofUpvotes+1)} size="sm">
                  <FontAwesomeIcon icon={faThumbsUp}/>{' '}{e.numberofUpvotes}</Button>{' '}
                  {' '}
                  <Button variant="outline-secondary" onClick={() => this.downvote(e.id,e.numberofDownvotes+1)} size="sm">
                  <FontAwesomeIcon icon={faThumbsDown}/>{' '}{e.numberofDownvotes}</Button>
                </Card.Footer>
              </Card>
              <br/>
          </div>));

       return(
          <div>
            <Jumbotron>
              <center>
                
              {image1}

              </center>
            </Jumbotron>
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
  
  export default get; 