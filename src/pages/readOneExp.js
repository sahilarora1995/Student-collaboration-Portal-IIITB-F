import axios from 'axios'; 
import React,{Component} from 'react'; 
import  {Navbar,Nav,Container,Row,Jumbotron,Col,Table,Image,Button,Form,Card} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/NavigationBar'
  
class readOneExp extends Component { 

    constructor(props){
      super(props);
      this.state = {exp:new Object(),comments:[]};
      this.patch=this.patch.bind(this);
      this.addComment = this.addComment.bind(this);
  }

  async componentDidMount(){

    await axios.get('/interviewData/'+this.props.match.params.id).
    then(Response =>{
      this.setState({exp:Response.data});
      console.log(this.state.exp);
    }).
    catch(error => {
      console.log("error getting");
    })
    await axios.get("/exp/comments/"+this.props.match.params.id)
		.then(response => {
			this.setState({comments: response.data});
		}).catch(error => {
			console.log(error)
		});
  }

  patch = (id,data) => {
    let url="/interviewData/"+id+"/";
    axios.patch(url,data,{headers:{'Content-Type':'application/json'}} ).then(Response => {console.log(Response)}).
    catch(e => console.log("error"))
    window.location.reload();
  }
  upvote = (id,num) => {
    const data={
      numberofUpvotes: num,
    }
    this.patch(id,data);
  };

  addComment = () => {
    if (this.commentTextInput.value.length > 0) {
      const id=parseInt(this.props.match.params.id,10);
			const com = {
				author: localStorage.getItem("user"),
				commentBody: this.commentTextInput.value,
				exp: id,
      };
      console.log(com);
      
			let url="/exp/comments/"+id+"/";
			axios.post(url, com,{headers:{'Content-Type':'application/json'}})
			.then( response => {
				axios.get("/exp/comments/"+this.props.match.params.id)
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
  
  displayPara = (commentBody) => {
      var comment=String(commentBody);
      var array=comment.split("\n");
      console.log(array);
      return(
      array.map((i,key) => {
        return <div key={key}>{i}<br/></div>;
    }));
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
			const comments1 = this.state.comments.map(({ id, author, commentBody, pyq,created}) =>
				(<div style={{textAlign: "left", marginLeft: "40px"}}>
					<span><b>{author}</b> <span style={{color: "black",textAlign: "right",fontSize:"14px"}}>commented at {created} UTC</span></span>
					<span style={textNormal}>{this.displayPara(commentBody)}</span>{' '}
          <hr/>
				</div>));

				return (
					<div>
						<Jumbotron>
							<h3 style={displayLeftBold}>Comments</h3>
							<hr/>
              <Form>
							<div className="row" style={alignLeft}>
								<br />
								<div className="col-md-10">
                  
								<textarea placeholder="Enter your comment" styles="overflow: hidden; word-wrap: break-word; resize: none;white-space:pre-wrap;" 
                              ref={(ref) => this.commentTextInput = ref} className="form-control" />
								</div>
								<div className="col-md-1">
								<Button onClick={this.addComment} type="submit"> > </Button>
								</div>
                
							</div>
              </Form>
							<hr/>
							{comments1}
						</Jumbotron>
					</div>
				)
		}
		return;
  }

  // function to return the display html to render
    fileData = () => { 

      const e=this.state.exp;
      console.log(e);
      
      var experience=String(e.experience);
      var array=experience.split("\n");
      console.log(array);
          
      return (
        <div>
          <Jumbotron className={"text-dark"}>
            <h3><b>Interview Experiences</b></h3>
                <Card className={"border border-dark bg-white text-dark text-left"}>
                  <Card.Header>
                  <Row>
                      <Col>
                      <h4><b>Title: {e.title}</b></h4>
                      <h6>Author: {e.name}</h6>
                      <h6>Graduation Year: {e.yearPassout}</h6>
                      <h6>Company: {e.company}</h6>
                      <h6>Placement Year: {e.yearPlaced}</h6>
                      <span style={{fontSize:"10px"}}>{e.created} UTC</span>
                      
                      </Col>
                      <Col className="text-right">
                          <Button className="btn pull-right" variant="light" size="sm" onClick={() => this.upvote(e.id,e.numberofUpvotes+1)}>
                          <FontAwesomeIcon icon={faThumbsUp}/>{' '}{e.numberofUpvotes}</Button>
                      </Col>
                  </Row>
                  </Card.Header>
                      <Card.Body className="text-black">
                          {array.map((i,key) => {
                                return <div key={key}>{i}<br/></div>;
                            })}
                      </Card.Body>
                  </Card>
                <br/>
                {this.renderComments()}
              </Jumbotron>
            </div>
      );
    }
        
    render() { 

       const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }     

      return ( 
        <center>
          <NavigationBar/>
            <Container>
              <Row>
                <Col lg={12} style={marginTop}>
                  <div>
                    {this.fileData()}
                  </div>
                </Col>
              </Row>
            </Container>
        </center>
      ); 
    } 
  } 
  
  export default readOneExp; 
