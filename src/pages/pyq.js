import React, { Component } from 'react';
import axios, { post } from 'axios';
import  {Col,Table, Jumbotron} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import {Card, Form, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

class pyq extends Component {
	constructor(props) {
            super(props);
            this.state={filter:"",
            semesters:[
            { sem: 1,  subjects: ['Algorithms', 'ML', 'MML','SS','CNW','Discrete Mathematics']},
            { sem: 2, subjects: ['SPE', 'Data Modelling', 'WAN','MAS']},
            { sem: 3, subjects: ['DesignPatterns', 'ASR', 'OOAD']},
            { sem: 4, subjects: ['thesis']}
            ],
            selectedSem:1,
            selectedSub:'',
            year:'',
            request:'',
            images:[],
            file:null,
            load:true,
        };
		
        this.onChange = this.onChange.bind(this);
        this.onGet=this.onGet.bind(this);
        this.fileUpload=this.fileUpload.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        this.fileDownload=this.fileDownload.bind(this);
        this.onPost=this.onPost.bind(this);
    }
    
    async componentDidMount(){
        await axios.get('http://localhost:8000/getData/')
        .then(Response =>{
            var verified =  Response.data.filter(function(tuple) {
                return tuple.verified ==true;
              });
              this.setState({images:verified});
              this.setState({load:false});
        })
        .catch(error => {
        console.log("error getting");
        })
    }

    onGet(){
                
        var params={};
        var subject=this.state.selectedSub;
        var year=this.state.year;
        var resourcetype="PYQ";
        var sem=this.state.selectedSem;

        if (subject) params.subject = subject;
		if (year) params.year = year;
		if (sem) params.semester = sem;

        params.resourceType=resourcetype;
        this.setState({load:true});

        axios.get('http://localhost:8000/getData/',
        {params}
        ).
        then(Response =>{
            var verified =  Response.data.filter(function(tuple) {
                return tuple.verified ==true;
              });
              this.setState({images:verified});
              this.setState({load:false});
        }).
        catch(error => {
        console.log("error getting");
        })
    }

	onChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
    }

    onFileChange(e) {
        this.setState({file:e.target.files[0]})
    }

    onPost(e){
        e.preventDefault();
        if(this.state.file==null||this.state.year==''||this.state.selectedSub=='')
            return ToastsStore.error("Please fill all details");

        this.fileUpload(this.state.file).then((response) => {
			ToastsStore.success("Successful, admin will verify");

		}).catch(error => {
			ToastsStore.warning("Error in posting");
		})
    
      }
    
      fileUpload(file){
        const url = 'http://localhost:8000/postData/';
        const formData = new FormData();
        formData.set('subject',this.state.selectedSub);
        formData.set('year',this.state.year);
        formData.set('resourceType',"PYQ");
        formData.set('semester',this.state.selectedSem);
        formData.set('author',localStorage.getItem("user"))
        
        formData.append('file',file)
        debugger;
        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
      }

      handleChange = event => {
        this.setState({ filter: event.target.value });
      };

    fileDownload = () => {
        var { filter,images } = this.state;
        filter = filter.toLowerCase();
        var filteredData = [];
        filteredData=images.filter(item => {
            if( String(item.semester).indexOf(filter)!== -1 || String(item.subject.toLowerCase()).indexOf(filter)!== -1 || String(item.year).indexOf(filter)!== -1 )
                return item;
        });
  
         return(
             
            <div>
                
                  <Jumbotron className={"border border-dark bg-dark text-white"}>
                  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width:'300px'}}>
                <Form.Control className={"border border-white bg-dark text-white"} type="text" value={filter} onChange={this.handleChange} name="" placeholder="Search"/>
                </div>
                    <br/>
                    <h2 style={{color:"black"}}></h2><br/>
                    <Table className={"border border-dark bg-dark text-white"}>
                        
                        <thead>
                        <tr>
                            <th>Semester</th>
                            <th>Subject</th>
                            <th>Year</th>
                            <th>Link</th>
                        </tr>
                            {this.state.images.length<=0?
                                this.state.load?(<tr>
                                        <td colSpan="6" align="center">
                                            <b>Loading...</b>
                                        </td>
                                        </tr>):(<tr>
                                        <td colSpan="6" align="center">
                                            <b>There is no data yet</b>
                                        </td>
                                        </tr>):(filteredData.length>0)?(filteredData.map((e) =>
                                        (<tr key={e.id}>
                                              <td>{e.semester}</td>
                                              <td>{e.subject}</td>
                                              <td>{e.year}</td>
                                              <td><a href={"/readOnePYQ/"+e.id} className={"text-white"}><b> Link </b></a></td>
                                          </tr>))):(this.state.images.map((e) =>
                                                    (
                                                    <tr key={e.id}>
                                                        <td>{e.semester}</td>
                                                        <td>{e.subject}</td>
                                                        <td>{e.year}</td>
                                                        <td><a href={"/readOnePYQ/"+e.id} className={"text-white"}><b> Link </b></a></td>
                                                    </tr>)))}
                        </thead>
                    </Table>
                    </Jumbotron>
                
            </div>
          );

      }
    

	render() {

        var semester;
        this.state.semesters.map((semester1) => {
        if(semester1.sem == this.state.selectedSem)
            semester=semester1.subjects;
        })

		return(
		<div>
            <NavigationBar/>
            <ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore}/>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header> Previous Year Questions </Card.Header>
			
			<Form id="FormId">
			<Card.Body>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
			  	<Form.Row>
				  	<Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>semester</Form.Label>
                          <Form.Control as="select" value={this.state.selectedSem} name="selectedSem" onChange={this.onChange} className={"bg-dark text-white"}>
                                {
                                  this.state.semesters.map((semester, i) => {
                                    return <option>{semester.sem}</option>
                                  })
                                }
                            </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>subject</Form.Label>
                          <Form.Control as="select" value={this.state.selectedSub} name="selectedSub" onChange={this.onChange} required className={"bg-dark text-white"}>
                          <option></option>
                                {
                                    semester.map((subject,i) => {
                                      return <option>{subject}</option>
                                    })
                                }
                            </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>year</Form.Label>
                          <Form.Control as="select" value={this.state.year} name="year" onChange={this.onChange} required className={"bg-dark text-white"}>
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
                    <Form.Label>Submit</Form.Label><br/>
                    <Button size="sm" variant="success" onClick={this.onGet}>
			            <FontAwesomeIcon icon={faSave}/> Get </Button>{'  '}<br/>
                    </Form.Group>
			  	</Form.Row>
                  
                </div>
			</Card.Body>
            
			<Card.Footer>
                <input className="btn1" type="file" required onChange={this.onFileChange} /><br/><br/>
                
                <Button size="sm" variant="success" type="submit" onClick={this.onPost}>
			    <FontAwesomeIcon icon={faSave}/> Post </Button>{'  '}
                
			</Card.Footer>
			</Form>
			</Card>
                    {this.fileDownload()}
		</div>
		);
	}
}

export default pyq;
