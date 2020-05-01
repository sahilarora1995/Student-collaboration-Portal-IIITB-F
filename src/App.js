import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import subjects from './pages/subjects'
import semester from './pages/semester'
import Dropdown from './pages/Dropdown'
import getorPost from './pages/getorPost'
import post from './pages/post';
//import get from './pages/get';
import login from './pages/login'
import register from './pages/register'
import NavigationBar from './components/NavigationBar'
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {

    const marginTop={
      marginTop:"60px",
      alignItems:"center"
    }

    return (
      <Router basename="/react-auth-ui/">
        <NavigationBar/>
        <Col lg={12} style={marginTop}>
          
          <Route exact path='/' component={login}/>
          <Route exact path='/register' component={register}/>
          <Route exact path='/welcome' component={Welcome}/>
          <Route exact path='/semester' component={semester}/>
          <Route exact path='/subjects' component={subjects}/>
          <Route exact path='/Dropdown' component={Dropdown}/>
          <Route exact path='/getorPost' component={getorPost}/>
          <Route exact path='/post' component={post}/>
          
          
        </Col>
      </Router>
    )
  }
}

export default App