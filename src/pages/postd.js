import React from 'react'
import axios, { post } from 'axios';
import NavigationBar from '../components/NavigationBar'

class postd extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
   handleClick() { this.props.history.push('/verify');  } 
  fileUpload(file){
    const url = 'http://localhost:8000/postData/';
    const formData = new FormData();
    formData.set('subject',JSON.parse(localStorage.getItem('id')))
    formData.set('year',JSON.parse(localStorage.getItem('year')))
    formData.set('resourceType',JSON.parse(localStorage.getItem('resourcetype')))
    console.log(JSON.parse(localStorage.getItem('sem')))
    formData.set('semester',JSON.parse(localStorage.getItem('sem')))
    
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <div>
        <NavigationBar/>
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input class="btn"type="file" onChange={this.onChange} />
        <div class="upload-btn-wrapper">
 
</div>
        <button class="btn" type="submit" onClick={() => this.handleClick()}>Upload</button>
      </form>
      </div>
   )
  }
}



export default postd;