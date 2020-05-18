import React, { Component } from 'react';
import axios, { post } from 'axios';
import  {Col,Table} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import {Card, Form, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';

class semester extends Component {
	constructor(props) {
            super(props);
            this.state={
            semesters:[
            { sem: 1,  subjects: ['Algorithms', 'ML', 'MML','SS','CNW','DM']},
            { sem: 2, subjects: ['SPE', 'Data Modelling', 'WAN','MAS']},
            { sem: 3, subjects: ['job3-1', 'job3-2', 'job3-3']},
            { sem: 4, subjects: ['job3-1', 'job3-2', 'job3-3']}
            ],
            selectedSem:1,
            selectedSub:'',
            year:'',
            request:'',
            images:[],
            file:null
        };
		
        this.onChange = this.onChange.bind(this);
        this.onGet=this.onGet.bind(this);
        this.fileUpload=this.fileUpload.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        this.fileDownload=this.fileDownload.bind(this);
        this.onPost=this.onPost.bind(this);
    }
    
    async componentDidMount(){
        await axios.get('/getData/')
        .then(Response =>{
            this.setState({images:Response.data});
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

        if(year==''||subject=='')
            return alert("Please fill all details");

        params.subject=subject;
        params.year=year;
        params.resourceType=resourcetype;
        params.semester=sem;

        console.log(params);

        axios.get('/getData/',
        {params}
        ).
        then(Response =>{
        this.setState({images:Response.data});
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
            return alert("Please fill all the details");

        this.fileUpload(this.state.file).then((response)=>{
          console.log(response.data);
        })
    
        this.props.history.push('/verify');
      }
    
      fileUpload(file){
        const url = '/postData/';
        const formData = new FormData();
        formData.set('subject',this.state.selectedSub);
        formData.set('year',this.state.year);
        formData.set('resourceType',"PYQ");
        formData.set('semester',this.state.selectedSem);
        
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

    fileDownload = () => {

        if(this.state.images)
        {
          const image1 = this.state.images.map((e) =>
            (
            <tr key={e.id}>
                <td>{e.semester}</td>
                <td>{e.subject}</td>
                <td>{e.year}</td>
                <td><a href={"/readOnePYQ/"+e.id} className={"text-white"}><b> Link </b></a></td>
            </tr>));
  
         return(
             
            <div>
                <center>
                    <Table className={"border border-dark bg-dark text-white"}>
                        <thead>
                        <tr>
                            <th>Semester</th>
                            <th>Subject</th>
                            <th>Year</th>
                            <th>Link</th>
                        </tr>
                        {image1}
                        </thead>
                    </Table>
                
                </center>
            </div>
          );
        }
        return ;
      }
    

	render() {

        var semester;
        this.state.semesters.map((semester1) => {
        if(semester1.sem == this.state.selectedSem)
            semester=semester1.subjects;
        })
        console.log(semester);

		return(
		<div>
            <NavigationBar/>
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
                    <Form.Label>Submit</Form.Label>
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

export default semester;