import React from 'react';
import ReactPlayer from 'react-player';
import {Jumbotron, Row, Container, Col, Button} from 'react-bootstrap';
import axios from 'axios';

export default class playVideo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {video:'', comments: []};
		this.addComment = this.addComment.bind(this);
	}
	async componentDidMount() {
		const videoId = this.props.match.params.id;
		await axios.get('/getVideoData/' + videoId)
			.then(response => {
				this.setState({ video: response.data });
			}).catch(error => {
				console.log("Error in getting video : " + error);
			});
		await axios.get("/commentsOnVideo/" + videoId)
			.then(response => {
				this.setState({ comments: response.data });
			}).catch(error => {
				console.log(error)
			});
	}

	addComment = () => {
		if (this.commentTextInput.value.length > 0) {
			const vidId = this.props.match.params.id;
			const com = {
				author: localStorage.getItem("user"),
				commentBody: this.commentTextInput.value,
				videocontent: vidId
			};
			
			axios.post("/commentsOnVideo/"+vidId, com)
			.then( response => {
				axios.get("/commentsOnVideo/"+vidId)
				.then(res => {
					this.setState({comments: res.data});
				}).catch(err => {
					console.log("Error in getting comments after update");
				})
			}).		
			catch(error => {
				console.log("Error in posting comment");
			});
		}
	};

	componentDidUpdate() {
		this.commentTextInput.value = '';
	}
	renderComments = () => {
		const textNormal = {
			color: "black",
			fontWeight: "normal",
			textAlign: "left",
		};
		const displayLeftBold = {
			color: "black",
			fontWeight: "bold",
			textAlign: "left",
			marginLeft: "40px"
		};
		const alignLeft = {
			textAlign: "left",
			marginLeft: "40px"
		};
		
		if (this.state.comments) {
			const comments1 = this.state.comments.map(({ id, author, commentBody, videoContent}) =>
				(<div style={displayLeftBold}>
					<span>{author}</span><br/>
					<span style={textNormal}>{commentBody}</span>{' '}
					<br/><br/>
				</div>));

				return (
					<div>
						<Jumbotron>
							<h3 style={displayLeftBold}>Comments</h3>
							<hr/>
							<div className="row" style={alignLeft}>
								<br />
								<div className="col-md-7">
								<input type="text" placeholder="Enter your comment" ref={(ref) => this.commentTextInput = ref} className="form-control" />
								</div>
								<div className="col-md-4">
								<Button onClick={this.addComment}>Add Comment</Button>
								</div>
							</div>
							<hr/>
							{comments1}
						</Jumbotron>
					</div>
				)
		}
		return;
	}

	fileData = () => {

		const textBlack = {
			color: "black"
		}
		const vid = this.state.video;
		return (
			<div>
				<Jumbotron>
					<h3 style={textBlack}>Video</h3>
					<h5 style={textBlack}>Semester: {vid.semester}, Subject: {vid.subject}, Year: {vid.year}, Speaker: {vid.speaker}</h5>
					<hr/>
					<center>
					<ReactPlayer 
						url={vid.file}
						controls/>
					</center>
					{this.renderComments()}
				</Jumbotron>
			</div>
		);
	}
	render(){
		const textWhite = {
			color: "white"
		};
		const marginTop = {
			marginTop: "20px",
			alignItems: "center"
		}
		return(
			<Container>
				<Row>
					<Col lg={12} style={marginTop}>
						<div>
						{this.fileData()}
						</div>
					</Col>
				</Row>
			</Container>
		)
	}
}