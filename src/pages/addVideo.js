import React from 'react'
import axios, { post } from 'axios';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
export default class addVideo extends React.Component {
	initialState = {
		subject: '',
		semester: '',
		year: '',
		uploadedBy: '',
		speaker: '',
		file: ''
	};
	constructor(props) {
		super(props);
		this.state = this.initialState;

		this.onFormSubmit = this.onFormSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.fileUpload = this.fileUpload.bind(this)
	}
	onFormSubmit(e) {
		e.preventDefault();
		this.fileUpload(this.state.file).then(response => {
			setTimeout(3000);
			this.props.history.push('/videoPage');
		})
	}
	onFormReset = () => {
		this.setState(() => this.initialState);
	}
	handleChange(e) {
		e.preventDefault();
		if (e.target.name == 'file') {
			this.setState({ file: e.target.files[0] })
		}
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleFileChange = (e) => {
		e.preventDefault();
		this.setState({ file: e.target.files[0] })
	}
	fileUpload(file) {
		const url = 'http://localhost:8000/videos/postData/';
		const formData = new FormData();
		formData.set('subject', this.state.subject);
		formData.set('semester', this.state.semester);
		formData.set('year', this.state.year);
		formData.set('uploadedBy', this.state.uploadedBy);
		formData.set('speaker', this.state.speaker);
		formData.append('file' ,file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config)
			.then(response => {
				console.log("Success");
				alert("Success");
			}).catch(error => {
				console.log("Error"+error);
				alert("Error");
			});
	}

	render() {
		const textWhite = {
			color: "white",
			textAlgin: "center"
		};

		const subject = this.state.subject;
		const semester = this.state.semester;
		const year = this.state.year;
		const uploadedBy = this.state.uploadedBy;
		const speaker = this.state.speaker;
		const file = this.state.file;
		return (
			<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><h1>Add new Video Resource</h1></Card.Header>
				<Form id="createRuleFormId" onSubmit={this.onFormSubmit} onReset={this.onFormReset}>
					<Card.Body>
						<Form.Row>
							<Form.Group as={Col} controlId="subject">
								<Form.Label>Subject</Form.Label>
								<Form.Control autoComplete="off"
									type="text" name="subject"
									value={subject} required
									onChange={this.handleChange}
									placeholder="Enter subject"
									className={"bg-dark text-white"} />
							</Form.Group>
							<Form.Group as={Col} controlId="semester">
								<Form.Label>Semester</Form.Label>
								<Form.Control autoComplete="off"
									type="text" name="semester"
									value={semester} required
									onChange={this.handleChange}
									placeholder="Enter semester"
									className={"bg-dark text-white"} />
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="year">
								<Form.Label>Year</Form.Label>
								<Form.Control autoComplete="off"
									type="text" name="year"
									value={year} required
									onChange={this.handleChange}
									placeholder="Enter year"
									className={"bg-dark text-white"} />
							</Form.Group>
							<Form.Group as={Col} controlId="uploadedBy">
								<Form.Label>Uploaded By</Form.Label>
								<Form.Control autoComplete="off"
									type="text" name="uploadedBy"
									value={uploadedBy} required
									onChange={this.handleChange}
									placeholder="Enter Uploaded By"
									className={"bg-dark text-white"} />
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="speaker">
								<Form.Label>Speaker</Form.Label>
								<Form.Control autoComplete="off"
									type="text" name="speaker"
									value={speaker} required
									onChange={this.handleChange}
									placeholder="Enter speaker"
									className={"bg-dark text-white"} />
							</Form.Group>
							<Form.Group as={Col} controlId="file">
								<input class="btn" type="file" required onChange={this.handleFileChange} />
							</Form.Group>
						</Form.Row>

					</Card.Body>
					<Card.Footer style={{ "textAlign": "right" }}>
						<Button size="sm" variant="success" type="submit">
							<FontAwesomeIcon icon={faSave} /> Save
						</Button>
						{' '}
						<Button size="sm" variant="info" type="reset">
							<FontAwesomeIcon icon={faUndo} /> Reset
						</Button>
					</Card.Footer>
				</Form>
			</Card>
		)
	}
}
