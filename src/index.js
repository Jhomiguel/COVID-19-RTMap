import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'
import 'firebase/firestore'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


firebase.initializeApp({
  apiKey: "AIzaSyBrPvssd3_sCIRnb2wt_JGJ8-DjHS4-5jk",
  authDomain: "covid-19rtmap.firebaseapp.com",
  databaseURL: "https://covid-19rtmap.firebaseio.com",
  projectId: "covid-19rtmap",
  storageBucket: "covid-19rtmap.appspot.com",
  messagingSenderId: "765942707817",
  appId: "1:765942707817:web:6b40e866f0e760cc6d94f8"
});


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
