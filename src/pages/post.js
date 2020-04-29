import axios from 'axios'; 
import React,{Component} from 'react'; 
import { Link } from 'react-router-dom';
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
  
class post extends Component { 
   
    state = { 
  
      // Initially, no file is selected 
      selectedFile: null
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
     
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
     
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
     
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
     
      // Details of the uploaded file 
      console.log(this.state.selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
      axios.post("api/uploadfile", formData); 
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
     
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        ); 
      } 
    }; 
     
    render() { 
       const marginTop={
        marginTop:"20px",
        alignItems:"center"
      }     
      return ( 
          <center>
      <Container>
       <Row>
       <Col lg={12} style={marginTop}>
        <div className="FormCenter" >
      <form onSubmit={this.handleSubmit}>
         <div className="FormField"> 
        <label>
         <Jumbotron className="bg-dark text-white">
                <h1> SELECT THE FILE TO UPLOAD :</h1>
                </Jumbotron>

        <div>  
            <div> 
                <input  className="FormField__Buttonp mr-20" type="file" onChange={this.onFileChange} /> 
                <input  className="FormField__Button mr-20" type="submit" value="Submit" onClick={() => this.onFileUpload()} />
            </div> 
          {this.fileData()} 
        </div> 
        </label>
       
        </div>
      </form>
      </div>
      </Col>
      </Row>
      </Container>
      </center>
      ); 
    } 
  } 
  
  export default post; 