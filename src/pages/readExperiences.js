import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Container,Row,Col,Button,Card, CardDeck, Table, Jumbotron} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
  
class readExperiences extends Component { 

    constructor(props){
      super(props);
      this.state = { filter: "",exp:[],load:true};
  }

  writeExp = () =>{
    this.props.history.push("/writeExp");
  }

  
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };
  
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
  
      //filtering data 
      var { filter,exp } = this.state;
      filter = filter.toLowerCase();
      var filteredData = [];
      filteredData=exp.filter(item => {
        var temp=String(item.company);
        if( temp.indexOf(filter)!== -1 || String(item.title.toLowerCase()).indexOf(filter)!== -1 || String(item.name.toLowerCase).indexOf(filter)!== -1 )
        return item;
      });
         return(    
            <div>
                <center>
                     
                <div class="searchBox">
                <input class="searchInput"type="text" value={filter} onChange={this.handleChange} name="" placeholder="Search"/>
                <button class="searchButton" href="#">
                <i class="material-icons">
                 search
                </i>
                </button>
                </div>
                  <Jumbotron>
                    <br/>
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
                                        </tr>):(filteredData.length>0)?(filteredData.map((e) =>
                                        (<tr key={e.id}>
                                              <td>{e.title}</td>
                                              <td>{e.name}</td>
                                              <td>{e.company}</td>
                                              <td><a href={"/readOneExp/"+e.id} className={"text-white"}><b> Link </b></a></td>
                                          </tr>))):(exp.map((e) =>
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
