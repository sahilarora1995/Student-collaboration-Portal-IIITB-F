import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import subjects from './pages/subjects'
import semester from './pages/semester'
import pyq from './pages/pyq'
import readOnePYQ from './pages/readOnePYQ'
import Dropdown from './pages/Dropdown'
import login from './pages/login'
import verify from './pages/verify'
import writeExp from './pages/writeExp'
import readExperiences from './pages/readExperiences'
import aboutus from './pages/aboutus'
import readOneExp from './pages/readOneExp'
import readIntervieworwrite from './pages/readIntervieworwrite'
import verified from './pages/verified'
import register from './pages/register'
import videoPage from './pages/videoPage'
import playVideo from './pages/playVideo'
import addVideo from './pages/addVideo'
import adminVerify from './pages/adminVerify'

import  {Col,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./components/Home";
class App extends Component {
  render() {

    const marginTop={
      marginTop:"60px",
      alignItems:"center"
    }

    return (
      <Router basename="/react-auth-ui/">
        
        <Col lg={12} style={marginTop}>
          <Container>
            <Route exact path='/' component={login}/>
            <Route exact path='/register' component={register}/>
            <Route exact path='/semester' component={semester}/>
            <Route exact path='/pyq' component={pyq}/>
            <Route exact path='/readOnePYQ/:id' component={readOnePYQ}/>
            <Route exact path='/adminVerify/:id' component={adminVerify}/>
          </Container>
          
          <Route exact path='/welcome' component={Welcome}/>
          <Route exact path='/subjects' component={subjects}/>
          <Route exact path='/Dropdown' component={Dropdown}/>
          <Route exact path='/verify' component={verify}/>
          <Route exact path='/verified' component={verified}/>
          <Route exact path='/mockSchedule' component={Home}/>
            <Route exact path='/writeExp' component={writeExp} />
            <Route exact path='/readIntervieworwrite' component={readIntervieworwrite} />
            <Route exact path='/readExperiences' component={readExperiences} />
            <Route exact path='/readOneExp/:id' component={readOneExp}/>
            
            <Route exact path='/videoPage' component={videoPage}/>
            <Route exact path='/playVideo' component={playVideo}/>
            <Route exact path='/addVideo' component={addVideo}/>
            <Route exact path='/aboutus' component={aboutus}/>
        </Col>
        
      </Router>
    )
  }
}

export default App
