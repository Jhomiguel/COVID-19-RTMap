import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import CovidMap from './components/CovidMap'
import CovidStats from './components/CovidStats'
import firebase from 'firebase'


function App() {
  
  const[datos,guardarDatos]=useState({user:''}); 
  const[posiciones,guardarPosicionActual]=useState({posicionactual: null})

      const handlePosition=e=>{
        guardarPosicionActual({posicionactual: e.latlng});
      }
      
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
          .then(()=>console.log('Te has desconectado'))
          .catch(error=>console.error(`Eror: ${error.code}: ${error.message}`))
        }


        
     return (
      <div className="contenido">
      <div className="contenido-principal">
      <Header
        user={datos.user}
        handleAuth={handleAuth}
        handleLogOut={handleLogOut}/>
      <CovidMap 
        handlePosition={handlePosition}
        user={datos.user}
        posiciones={posiciones}
      />
      
      <CovidStats/>
      </div>
      
      </div>
  );
}

export default App;
