import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import subjects from './pages/subjects'
import semester from './pages/semester'
import Dropdown from './pages/Dropdown'
<<<<<<< HEAD
import getorPost from './pages/getorPost'
import post from './pages/post';
=======
import login from './pages/login'
import register from './pages/register'
>>>>>>> 11b4a5ea8fdbfe90e21f7160032c338464daed65
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
<<<<<<< HEAD
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
=======
        <NavigationBar history={this.props.history}/>
          <Container >
            <Row>
              <Col lg={12} style={marginTop}>
                <Route exact path='/welcome' component={Welcome}/>
                <Route exact path='/register' component={register}/>
                <Route exact path='/' component={login}>
                </Route>
                <Route exact path='/semester' component={semester}>
                </Route>
                <Route exact path='/subjects' component={subjects}>
                </Route>
                <Route exact path='/Dropdown' component={Dropdown}>
                </Route>

              </Col>
            </Row>
          </Container>
      </Router>
>>>>>>> 11b4a5ea8fdbfe90e21f7160032c338464daed65
    )
  }
}

export default App