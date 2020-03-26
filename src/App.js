import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import CovidMap from './components/CovidMap'
import CovidStats from './components/CovidStats'
import firebase from 'firebase'

function App() {
  
  const[datos,guardarDatos]=useState({
    user:'',
   });  
      useEffect(()=>(
        firebase.auth().onAuthStateChanged(user=>{
          if(user){
            guardarDatos({user: user})
          }else{
            guardarDatos({user:null})
          }
        })),[datos])
      const handleAuth=()=>{
          const provider= new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider)
          .then(result=>console.log(result.user.email))
         }
       const handleLogOut=()=>{
          firebase.auth().signOut()
          .then(()=>console.log('desconectado'))
        }

     return (
      <div className="contenido">
      <div className="contenido-principal">
      <Header
        handleAuth={handleAuth}
        handleLogOut={handleLogOut}/>
      <CovidMap/>
      <CovidStats/>
      </div>
      
      </div>
  );
}

export default App;
