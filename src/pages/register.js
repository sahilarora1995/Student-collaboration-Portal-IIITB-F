import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

export default class Register extends React.Component {
	
	initialState = {id:'',name:'',mail:'', password:''};
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onChange(event) {
		this.setState({
			[event.target.name]:event.target.value
		});
	}
	
	onSubmit(event) {
		event.preventDefault();
		
		const user = {
			rollNumber: this.state.id,
			username:this.state.name,
			EmailId: this.state.mail,
			password: this.state.password
        }
        console.log(user);

        axios.get("http://localhost:8000/loginData/"+user.rollNumber+"/")
		.then(response => {
			if(response.data.rollNumber===user.rollNumber)
			{
				ToastsStore.warning("User ID already exists")	
				this.reset();
				return ;
			}
		})
		.catch(error=>{
		
		axios.post("http://localhost:8000/loginData/", user)
		.then(response => {
				ToastsStore.success("Successfully Registered");
				this.reset();
		})
		.catch(error => console.log(error));
        });
	}
	
	reset = () => {
		this.setState(() => this.initialState);
	}
	login = () => {
		this.props.history.push('/');
	}
	
	render() {
		
		return(
		<div>
			<ToastsContainer position={ToastsContainerPosition.TOP_RIGHT} store={ToastsStore}/>
			<Card className={"border border-dark bg-dark text-white"}>
			<Card.Header> <h3>STUDENT COLLABORATION PORTAL</h3><br/>
				Register </Card.Header>
			
			<Form id="FormId" onSubmit={this.onSubmit} onReset={this.reset}>
			<Card.Body>
				<Form.Row>
			  	   <Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>User Id</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="id"
					    	value={this.state.id}
					    	onChange={this.onChange}
					    	placeholder="Enter Roll Number" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
					<Form.Group as={Col} controlId="formGrid">
					  		<Form.Label>Password</Form.Label>
						    <Form.Control required autoComplete="off"
						    	type="password" name="password"
						    	value={this.state.password}
						    	onChange={this.onChange}
						    	placeholder="Enter password" 
						    	className={"bg-dark text-white"}/>
					  </Form.Group>					    
				</Form.Row>
			  	<Form.Row>
				  	<Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>User Name</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="text" name="name"
					    	value={this.state.name}
					    	onChange={this.onChange}
					    	placeholder="Enter user name" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
				  <Form.Group as={Col} controlId="formGrid">
				      	<Form.Label>Mail ID</Form.Label>
				      <Form.Control required autoComplete="off"
				      	type="email" name="mail"
				      	value={this.state.mail}
				    	onChange={this.onChange}
				      	placeholder="Enter mail id"
				      	className={"bg-dark text-white"}/>
				   </Form.Group>
			  	</Form.Row>
			</Card.Body>
			<Card.Footer style={{"textAlign":"right"}}>
			 <Button size="sm" variant="success" type="submit">
			    <FontAwesomeIcon icon={faSave}/> Submit
			  </Button>
			    {' '}
			    <Button size="sm" variant="info" type="reset">
			    <FontAwesomeIcon icon={faUndo}/> Reset
			  </Button>
			    <br/><br/>
			    <span> Already a user?{' '}
			    		<Button size="sm" variant="secondary" onClick={this.login}>Login</Button>
			    </span>
			</Card.Footer>
			</Form>
			</Card>
			
		</div>
		
		);
	}
}
