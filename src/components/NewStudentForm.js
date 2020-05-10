import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";
import moment from 'moment';
import { API_URL } from "../constants";

class NewStudentForm extends React.Component {
  state = {
    pk: 0,
    name: "",
    email: "",
    //time: "",
    //phone: ""
  };

  componentDidMount() {
    if (this.props.student) {
      const { pk, name, email, day, time, phone,about } = this.props.student;
      this.setState({pk, name, email, day, time, phone, about });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStudent = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();

    });
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
      alert("clicked")
    });

  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form  onSubmit={this.props.student ? this.editStudent : this.createStudent}>
        <FormGroup>
          <Label for="name" style={{color:'black'}}>Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
            placeholder = "Dolaaand Trump"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email" style={{color:'black'}}>Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
            placeholder = "trump@potus.gov.us"
          />
        </FormGroup>
        <FormGroup>
          <Label for="day" style={{color:'black'}}>date:</Label>
          <Input
            type="date"
            name="date"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.day)}
            min={moment().format("YYYY-MM-DD")}
          />
        </FormGroup>
        <FormGroup>
          <Label for="time" style={{color:'black'}}>time:</Label>
          <Input
            type="time"
            name="time"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.time)}
            placeholder = ""
          />
          </FormGroup>
          <FormGroup>
          <Label for="about" style={{color:'black'}}>about:</Label>
          <Input
            type="text"
            name="about"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.about)}
            placeholder = "front-end"
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudentForm;