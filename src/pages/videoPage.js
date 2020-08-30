import React, { Component } from 'react';
import axios, { post } from 'axios';
import { Col, Table ,Jumbotron} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import { Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

class videoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {filter:"",
			semesters: [
				{ sem: 1, subjects: ['Algorithms', 'ML', 'MML', 'SS', 'CNW', 'Discrete Mathematics'] },
				{ sem: 2, subjects: ['SPE', 'Data Modelling', 'WAN', 'MAS'] },
				{ sem: 3, subjects: ['DesignPatterns', 'ASR', 'OOAD']},
				{ sem: 4, subjects: ['thesis'] }
			],
			semester: 1,
			subject: '',
			speaker: '',
			year: '',
			videos: [],
			file: null,
			load:true,
		};

		this.onChange = this.onChange.bind(this);
		this.onGet = this.onGet.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.videosList = this.videosList.bind(this);
		this.onPost = this.onPost.bind(this);
	}
	
	async componentDidMount() {
		await axios.get('http://localhost:8000/getVideoData/')
			.then(Response => {
				var verified = Response.data.filter(function (tuple) {
					return tuple.verified == true;
				});
				this.setState({ videos: verified });
				this.setState({load:false});
			})
			.catch(error => {
				console.log("error getting");
			})
	}

	onGet() {

		var params = {};
		var subject = this.state.subject;
		var year = this.state.year;
		var sem = this.state.semester;
		var speaker = this.state.speaker;

		if (subject) params.subject = subject;
		if (year) params.year = year;
		if (sem) params.semester = sem;
		if (speaker) params.speaker = speaker;
		console.log(params);

		this.setState({load:true});
		axios.get('http://localhost:8000/getVideoData/', { params })
			.then(response => {
				var verifiedVideos = response.data.filter(function (tuple) {
					return tuple.verified == true;
				});
				this.setState({ videos: verifiedVideos });
				this.setState({load:false});
			}).catch(error => {
				console.log("error getting");
			});
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleFileChange = (e) => {
		e.preventDefault();
		this.setState({ file: e.target.files[0] })
	}

	onPost(e) {
		e.preventDefault();
		if (this.state.file == null || this.state.year == '' || this.state.subject == '')
			return alert("Please fill all the details");

		this.fileUpload(this.state.file)
		.then((response) => {
			ToastsStore.success("Successful, admin will verify");

		}).catch(error => {
			ToastsStore.warning("Error in posting");
		})

		//this.props.history.push('/verify');
	}

	fileUpload(file) {
		const url = 'http://localhost:8000/postVideoData/';
		const formData = new FormData();
		formData.set('subject', this.state.subject);
		formData.set('year', this.state.year);
		formData.set('semester', this.state.semester);
		formData.set('speaker', this.state.speaker);
		formData.set('uploadedBy', localStorage.getItem("user"))

		formData.append('file', file)
		console.log(formData);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return post(url, formData, config)
	}

	handleChange = event => {
        this.setState({ filter: event.target.value });
      };

	videosList = () => {

		var { filter,videos } = this.state;
        filter = filter.toLowerCase();
        var filteredData = [];
        filteredData=videos.filter(item => {
			if( String(item.semester).indexOf(filter)!== -1 || String(item.subject.toLowerCase()).indexOf(filter)!== -1 || String(item.year).indexOf(filter)!== -1 
		|| String(item.speaker.toLowerCase()).indexOf(filter)!== -1)
                return item;
        });	

			return (

				<div>
                
                  <Jumbotron className={"border border-dark bg-dark text-white"}>
                  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width:'300px'}}>
                	<Form.Control className={"border border-white bg-dark text-white"} type="text" value={filter} onChange={this.handleChange} name="" placeholder="Search"/>
                	</div>
					<br/>
						<Table className={"border border-dark bg-dark text-white"}>
							<thead>
								<tr>
									<th>Semester</th>
									<th>Subject</th>
									<th>Year</th>
									<th>Speaker</th>
									<th>Link</th>
								</tr>
								{this.state.videos.length<=0?
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
												<td>{e.speaker}</td>
												<td><a href={"/playVideo/"+e.id} className={"text-white"}><b> Watch Video </b></a></td>
                                          </tr>))):(this.state.videos.map((e) =>
                                                    (
                                                    <tr key={e.id}>
                                                        <td>{e.semester}</td>
														<td>{e.subject}</td>
														<td>{e.year}</td>
														<td>{e.speaker}</td>
														<td><a href={"/playVideo/"+e.id} className={"text-white"}><b> Watch Video </b></a></td>
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
			if (semester1.sem == this.state.semester)
				semester = semester1.subjects;
		})

		// for spanning years from 1999 to current year
        const options = [];
        const thisYear = (new Date()).getFullYear();
        for (let year = thisYear; year >= 1999; year--) {
        options.push(<option value={year}>{year}</option>);
        }

		return (
			<div>
				<NavigationBar />
				<ToastsContainer position={ToastsContainerPosition.TOP_CENTER} store={ToastsStore}/>
				<Card className={"border border-dark bg-dark text-white"}>
					<Card.Header> Videos </Card.Header>

					<Form id="FormId">
						<Card.Body>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Form.Row>
									<Form.Group as={Col} controlId="formGrid">
										<Form.Label>Semester</Form.Label>
										<Form.Control as="select"
											value={this.state.semester}
											name="semester"
											onChange={this.onChange}
											className={"bg-dark text-white"}>
											{
												this.state.semesters.map((semester, i) => {
													return <option>{semester.sem}</option>
												})
											}
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId="formGrid">
										<Form.Label>Subject</Form.Label>
										<Form.Control as="select"
											value={this.state.subject}
											name="subject"
											onChange={this.onChange}
											className={"bg-dark text-white"}>
											<option></option>
											{
												semester.map((subject, i) => {
													return <option>{subject}</option>
												})
											}
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId="formGrid">
										<Form.Label>Year</Form.Label>
										<Form.Control as="select"
											value={this.state.year}
											name="year" onChange={this.onChange}
											className={"bg-dark text-white"}>
											<option></option>
											{options}
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId="formGrid">
										<Form.Label>Speaker</Form.Label>
										<Form.Control
											value={this.state.speaker}
											name="speaker"
											onChange={this.onChange}
											className={"bg-dark text-white"}>
										</Form.Control>
									</Form.Group>

									<Form.Group as={Col} controlId="formGrid">
										<Form.Label>Submit</Form.Label><br />
										<Button size="sm" variant="success" onClick={this.onGet}>
											<FontAwesomeIcon icon={faSave} /> Get </Button>{'  '}<br />
									</Form.Group>
								</Form.Row>

							</div>
						</Card.Body>

						<Card.Footer>
							<input className="btn1" type="file" required onChange={this.handleFileChange} /><br /><br />

							<Button size="sm" variant="success" type="submit" onClick={this.onPost}>
								<FontAwesomeIcon icon={faSave} /> Post </Button>{'  '}

						</Card.Footer>
					</Form>
				</Card>
				{this.videosList()}
			</div>
		);
	}
}

export default videoPage;
