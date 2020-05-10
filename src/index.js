import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
// keeping track of login status
localStorage.setItem('loggedin',false);
=======
>>>>>>> c599f8def127873a431fd13e1cfbef7ca2dd12bb
ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
