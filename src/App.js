import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import subjects from './pages/subjects'
import semester from './pages/semester'
import Dropdown from './pages/Dropdown'
import getorPost from './pages/getorPost'
import post from './pages/post';
import NavigationBar from './components/NavigationBar'
import  {Navbar,Nav,Container,Row,Jumbotron,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render() {




    return (


      <Router basename="/react-auth-ui/">
        <NavigationBar/>

          <Route exact path='/' component={Welcome}>
          </Route>
          <Route exact path='/semester' component={semester}>
          </Route>
           <Route exact path='/subjects' component={subjects}>
          </Route>
          <Route exact path='/Dropdown' component={Dropdown}>
          </Route>
          <Route exact path='/getorPost' component={getorPost}>
          </Route>
          <Route exact path='/post' component={post}>
          </Route>
          </Router>
    )
  }
}

export default App
