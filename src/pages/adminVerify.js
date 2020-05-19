import React, { Component } from 'react';
import axios, { post } from 'axios';
import  {Col,Table, Jumbotron} from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'
import {Card, Form, Button,ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faTrash,faList} from '@fortawesome/free-solid-svg-icons';

class adminVerify extends Component {
	constructor(props) {
            super(props);
            this.state={
                data:[]
        };
    }
    
    async componentDidMount(){
        var id=this.props.match.params.id;
        var url="";
        (id==1)?(url="/getData"):(id==2)?(url="/interviewData"):(url="/videos/getData");
        console.log(url);

        await axios.get(url)
        .then(Response =>{
            var verified =  Response.data.filter(function(tuple) {
                return tuple.verified ==false;
              });
              this.setState({data:verified});
              console.log(verified);
        })
        .catch(error => {
        console.log("error getting");
        })
    }

    delete = (dataid) => {
        var id=this.props.match.params.id;
        var url="";
        (id==1)?(url="/deleteData/"+id):(id==2)?(url="/interviewData/"+id+"/"):(url="/videos/getData");

		axios.delete(url)
		.then(response => {
			if (response.data != null) {
				this.setState({
					data: this.state.data.filter(data => data.id !== dataid)
				});
            }
            else{
                alert("not deleted");
            }
		});
    }
    
    patch = (id,ver) => {
        var parid=this.props.match.params.id;
        var url="";
        (parid==1)?(url="/getData/"+parid+"/"):(parid==2)?(url="/interviewData/"+parid+"/"):(url="/videos/getData");

        const data={
            verified: ver,
          }
        axios.patch(url,data,{headers:{'Content-Type':'application/json'}})
        .then(Response => {
            console.log(Response)
            this.setState({
                data: this.state.data.filter(data => data.id !== id)
            });
        })
        .catch(e => console.log("error"))
    }

    fileDownload = () => {
        var id=this.props.match.params.id;
        var url="";
        (id==1)?(url="/readOnePYQ/"):(id==2)?(url="/readOneExp/"):(url="/videos/getData");

        var module="";
        (id==1)?(module="Previous Year Questions"):(id==2)?(module="Interview Experiences"):(module="Video Resources");
        if(this.state.data)
        {
          const list = this.state.data.map((e) =>
            (
            <tr key={e.id}>
                <td>{e.id}</td>
                <td><a href={url+e.id} className={"text-white"}><b> Link </b></a></td>
                <td>
					<ButtonGroup>
                        <Button size='sm' variant="outline-success" onClick={this.patch.bind(this, e.id,true)}><FontAwesomeIcon icon={faSave}/></Button>
					    <Button size='sm' variant="outline-danger" onClick={this.delete.bind(this, e.id)}><FontAwesomeIcon icon={faTrash}/></Button>
					</ButtonGroup>
				</td>
            </tr>));
  
         return(
             
            <div>

                <Card className={"border border-dark bg-dark text-white"}>
				<Card.Header><FontAwesomeIcon icon={faList}/>  {module}  </Card.Header>
				<Card.Body>
				
				<Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>LINK</th>
                            <th>VERIFY</th>
                        </tr>
                        {list}
                        </thead>
                    </Table>
                    </Card.Body>
			</Card>
            </div>
          );
        }
        return ;
      }

	render() {

		return(
		<div>
            <NavigationBar/>
			    {this.fileDownload()}
		</div>
		);
	}
}

export default adminVerify;