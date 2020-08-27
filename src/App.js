import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import pyq from './pages/pyq'
import readOnePYQ from './pages/readOnePYQ'
import login from './pages/login'
import writeExp from './pages/writeExp'
import readExperiences from './pages/readExperiences'
import aboutus from './pages/aboutus'
import readOneExp from './pages/readOneExp'
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
            <Route exact path='/pyq' component={pyq}/>
            <Route exact path='/readOnePYQ/:id' component={readOnePYQ}/>
            <Route exact path='/adminVerify/:id' component={adminVerify}/>
            <Route exact path='/videoPage' component={videoPage}/>
          </Container>
          
          <Route exact path='/welcome' component={Welcome}/>
          <Route exact path='/mockSchedule' component={Home}/>
            <Route exact path='/writeExp' component={writeExp} />
            <Route exact path='/readExperiences' component={readExperiences} />
            <Route exact path='/readOneExp/:id' component={readOneExp}/>
                        
            <Route exact path='/playVideo/:id' component={playVideo}/>
            <Route exact path='/addVideo' component={addVideo}/>
            <Route exact path='/aboutus' component={aboutus}/>
        </Col>
        
      </Router>
    )
  }
}

export default App
