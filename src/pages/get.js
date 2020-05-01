import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Navbar,Nav,Container,Row,Jumbotron,Col,Table,Image,Figure,Card} from 'react-bootstrap'
  
class get extends Component { 

  initialState={
    images:[],
  }
    constructor(props){
      super(props);
      this.state = {images:[]};
  }
  
  // get request may take few seconds, meanwhile response will have [Promise] object, once the data is got, response gets converted to JSON string
  // so using async, await for the response to load
  // everytime the state changes, render is called again. Therefore, we should not try changing state from render

  async componentDidMount(){
    
    await axios.get('/upload',
      {params: {subject: "Algorithms",
      year: 1,
      resourceType: "PrevYearPapers",
      semester: 1}
    }).
    then(Response =>{
      this.setState({images:Response.data}); 
    }).
    catch(error => {
      console.log("error getting");
    })
  }

  // function to return the display html to render
    fileData = () => { 

      if(this.state.images)
      {
        const image1 = this.state.images.map(({id,file,subject,year,resourceType,semester}) =>
          (<div>
              
              <Figure.Image
                width={400}
                height={400}
                src={file}
              />
              
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
      console.log("hi");
      return ( 
        <center>
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