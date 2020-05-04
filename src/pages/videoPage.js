import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import axios from 'axios';
import { Navbar, Nav, Container, Row, Jumbotron, Col, Table, Image, Figure, Card, Button } from 'react-bootstrap'

export default class videoPage extends Component {
	initialState = {
		videos: []
	}

	constructor(props) {
		super(props);
		this.state = { videos: [] };
	}
	async componentDidMount() {
		await axios.get('/videos/getData', {
			params: {
				'subject': JSON.parse(localStorage.getItem('id')), //subject is named as id???
				'semester': JSON.parse(localStorage.getItem('sem')),
				'year': JSON.parse(localStorage.getItem('year'))
			}
		}).then(response => {
			console.log(response.data)
			this.setState({ videos: response.data });
		}).catch(error => {
			console.log(error);
		})
	}
	handleButtonClick = event => {
		event.preventDefault();
		localStorage.setItem("VideoURL", event.target.getAttribute("data_file"))
		localStorage.setItem("VideoId", event.target.getAttribute("data_id"))

		this.props.history.push("/playVideo");
	}
	addNewVideo = event => {
		event.preventDefault();
		this.props.history.push("/addVideo");
	}
	fileData = () => {

		const textBlack = {
			color: "black"
		}
		if (this.state.videos) {
			const video1 = this.state.videos.map(({ id, file, subject, year, semester, uploadedBy, speaker}) =>
				(<div>
					<div className="row">
						<div className="col-md-7">
							<span style={textBlack}>Uploaded By: {uploadedBy}</span><br />
							<span style={textBlack}>Speaker: {speaker}</span>
						</div>
						<Button
							data_file={file}
							data_id={id}
							onClick={this.handleButtonClick}>Video</Button>
					</div>
					<br /><br />
				</div>));

			return (
				<div>
					<Jumbotron>
						<center>
							<Button onClick={this.addNewVideo}>Add new Video</Button>
							<hr/>
							{video1}
						</center>
					</Jumbotron>
				</div>
			);
		}
		return;
	}
	render() {
		const textWhite = {
			color: "#FFFFFF"
		};
		const marginTop = {
			marginTop: "20px",
			alignItems: "center"
		}
		return (
			<Container>
				<Row>
					<Col lg={12} style={marginTop}>
						<div>
							{this.fileData()}
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}