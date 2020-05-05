import React from 'react';
import ReactPlayer from 'react-player';
import {Jumbotron, Row, Container, Col, Button} from 'react-bootstrap';
import axios from 'axios';

export default class playVideo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {comments: []};
		this.addComment = this.addComment.bind(this);
	}
	async componentDidMount() {
		await axios.get("/videos/comments/"+localStorage.getItem("VideoId"))
		.then(response => {
			this.setState({comments: response.data});
		}).catch(error => {
			console.log(error)
		});
	}

	addComment = () => {
		if (this.nameTextInput.value.length > 0 && this.commentTextInput.value.length > 0) {
			const vidId = localStorage.getItem("VideoId");
			const com = {
				author: this.nameTextInput.value,
				commentBody: this.commentTextInput.value,
				videocontent: vidId
			};
			
			axios.post("/videos/comments/"+vidId, com)
			.then( response => {
				axios.get("/videos/comments/"+vidId)
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
		this.nameTextInput.value = '';
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
								<input type="text" placeholder="Enter your name" ref={(ref) => this.nameTextInput = ref} className="form-control" required/>
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
		return (
			<div>
				<Jumbotron>
					<h1 style={textBlack}>Video</h1>
					<center>
					<ReactPlayer 
						url={localStorage.getItem("VideoURL")}
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