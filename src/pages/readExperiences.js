import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Container,Row,Col,Button,Card, CardDeck, Table, Jumbotron} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
  
class readExperiences extends Component { 

    constructor(props){
      super(props);
      this.state = {exp:[],load:true};
  }

  writeExp = () =>{
    this.props.history.push("/writeExp");
  }
  
  // get request may take few seconds, meanwhile response will have [Promise] object, once the data is got, response gets converted to JSON string
  // so using async, await for the response to load
  // everytime the state changes, render is called again. Therefore, we should not try changing state from render

  async componentDidMount(){

    await axios.get('/interviewData/')
    .then(Response =>{
        var verified =  Response.data.filter(function(tuple) {
          return tuple.verified ==true;
        });
        this.setState({exp:verified});
        this.setState({load:false});
      })
    .catch(error => {
      console.log("error getting");
    })
  }

  // function to return the display html to render
    fileData = () => {
  
         return(
             
            <div>
                <center>
                  <Jumbotron>
                    <h2 style={{color:"black"}}>Interview Experiences</h2><br/>
                    <Table className={"border border-dark bg-dark text-white"}>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Company</th>
                            <th>Link</th>
                        </tr>
                        {this.state.exp.length<=0?this.state.load?(<tr>
                                        <td colSpan="6" align="center">
                                            <b>Loading...</b>
                                        </td>
                                        </tr>):(<tr>
                                        <td colSpan="6" align="center">
                                            <b>There is no data yet</b>
                                        </td>
                                        </tr>):(this.state.exp.map((e) =>
                                        (<tr key={e.id}>
                                              <td>{e.title}</td>
                                              <td>{e.name}</td>
                                              <td>{e.company}</td>
                                              <td><a href={"/readOneExp/"+e.id} className={"text-white"}><b> Link </b></a></td>
                                          </tr>)))}
                        </thead>
                    </Table>
                      <hr/>
                      <Button onClick={this.writeExp}>Write Exp</Button>
                    </Jumbotron>
                
                </center>
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
  
  export default readExperiences; 
