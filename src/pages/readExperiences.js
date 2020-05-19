import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Container,Row,Col,Button,Card, CardDeck, Table, Jumbotron} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
  
class readExperiences extends Component { 

    constructor(props){
      super(props);
      this.state = {exp:[]};
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
      })
    .catch(error => {
      console.log("error getting");
    })
  }

  // function to return the display html to render
    fileData = () => { 

      if(this.state.exp)
      {
        const exps = this.state.exp.map((e) =>
            (
            <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.name}</td>
                <td>{e.company}</td>
                <td><a href={"/readOneExp/"+e.id} className={"text-white"}><b> Link </b></a></td>
            </tr>));
  
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
                        {exps}
                        </thead>
                    </Table>
                      <hr/>
                      <Button onClick={this.writeExp}>Write Exp</Button>
                    </Jumbotron>
                
                </center>
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
