import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";
class NewStudentForm1 extends React.Component {
  state = {
    name:"",
    email:"",
    name1 : this.props.student["name"],
    email1 : this.props.student["email"],
    date : this.props.student["day"],
    time : this.props.student["time"],
    topic : this.props.student["about"]
    //time: "",
    //phone: ""
  };

  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStudent = e => {
    e.preventDefault();

  //  const { pk, name, email, day, time, phone,about } = this.props.student;
   // const {pk1, name1, email1} = this.state;
    const user = {
      //name1: this.props.student.name,
      //email1 : this.props.student.email
    }
    var str = this.state["name"];
    var email = this.state["email"]
    if (str == "")
      alert("name is empty re-enter the name")
    else if (email == "")
      alert("email cannot be empty!")
    else{
      axios.post(API_URL+'sendmail/' + this.props.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();

      });
      axios.delete(API_URL + this.props.pk).then(() => {
      this.props.resetState();
    });
      alert("Congrats! your meeting scheduled with " + this.props.student["name"])
    }
  };

  
  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form  onSubmit={this.createStudent}>
        <FormGroup>
          <Label for="name" >Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
            placeholder="Martin Luther King, Jr."
          />
        </FormGroup>
        <FormGroup>
          <Label for="email" >Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            placeholder="myemail@email.com"
            
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudentForm1;