import React from 'react';
import axios from 'axios';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo,envelope} from '@fortawesome/free-solid-svg-icons';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
  
//import { URL } from "../constants";



export default class Register extends React.Component {
	
	initialState = {id:'',name:'',mail:'', password:'',emailverified:false};
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
		if(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/.test(this.state.password)===false){
			ToastsStore.error("Weak Password Dude! Minimum 8 characters,Max 20, Atleast 1 Uppercase, Lowercase,digit, special character 😟");
		}
		else if(this.state.emailverified===true){
		axios.post('http://localhost:8000/loginData/', user)
		.then(response => {
				ToastsStore.success("Successfully Registered");
				this.reset();
		})
		.catch(error => console.log(error));
	   }
	   else if(this.state.emailverified===false){
		ToastsStore.error("First verify Email ID To proceed.. 😟");
	   }
	   else{
        ToastsStore.error("Unknown Error.. Please try after sometime! 😟");
	   }

	}
	
	reset = () => {
		this.setState(() => this.initialState);
	}
	login = () => {
		this.props.history.push('/');
	}

	

    confirmEmail =()=>{
		const user = {
			rollNumber: this.state.id,
			email: this.state.mail,
		}
		if(this.state.id==="" || this.state.name==="" || this.state.password==="")
		{
			ToastsStore.error("Fill All details to proceed.. 😟");
		}
		else if(user.email===""){
			ToastsStore.warning("Enter the EmailID to get an OTP 😶");
		}
        else if(/^[a-zA-Z0-9.]+@iiitb.org+$/.test(user.email)===false){
			ToastsStore.error("Enter the Valid IIITB Id 😟");
		}
		else{
		console.log(user);
		axios.post('http://localhost:8000/confirmEmailID/', user)
		.then(response => {
			
			ToastsStore.success("OTP Send.. Click verify OTP to proceed 🤩");
		})
		.catch(error => console.log(error));
	}
	}
	verifyEmail =()=>{
		const user = {
		    otp: this.state.otp
        }
		console.log(user.otp);
		if(this.state.mail===""){
			ToastsStore.warning("OTP Can't be generated without providing Email ID😕 ")

		}
		else if (user.otp===""){
			ToastsStore.warning("First enter OTP to validate 😕 ")
			
		}
		else if(user.otp.match(/^[0-9]/) === null){
			ToastsStore.info("OTP can be only Numeric! 🤕")
			
		}
		else if(user.otp.length != 4){
			ToastsStore.warning("OTP length should be only 4 😕 ")
			
		}
		else{
		axios.post('http://localhost:8000/verifyEmailID/', user)
		.then(response => {
				ToastsStore.success("OTP Verified 🥳");
				this.state.emailverified=true
		})
		.catch(error => {
			ToastsStore.error("WRONG OTP 😟. Please try Again!");
		
		});
	}
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
				   <Form.Group as={Col} controlId="formGrid">
				  		<Form.Label>Enter OTP</Form.Label>
					    <Form.Control required autoComplete="off"
					    	type="password" name="otp"
					    	value={this.state.otp}
					    	onChange={this.onChange}
					    	placeholder="Enter OTP Received on your Email" 
					    	className={"bg-dark text-white"}/>
				  </Form.Group>
			  	</Form.Row>
			</Card.Body>

			
			<Button size="sm" variant="primary" onClick={this.confirmEmail}>Send OTP<i class="fas fa-envelope"></i></Button>
			&nbsp;
			<Button  size="sm" variant="primary" onClick={this.verifyEmail}>Validate OTP</Button>
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
