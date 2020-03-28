import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import CovidMap from './components/CovidMap'
import firebase from 'firebase'
import AddCase from './components/AddCase'



function App() {
  
  const[datos,guardarDatos]=useState({user:''}); 
  const[posicion,guardarPosicionActual]=useState({posicionactual: null});
  const[posiciones,guardarPosiciones]=useState({ubicaciones: []})
  const[userposition,saveUserCurrentPosition]=useState({lat:null,lng:null,zoom:null})
  
  const {user}=datos;

  // latlng={
  //   lng:location.coords.latitude,
  //   lat:location.coords.longitude
    
      const handleCurrentPosition = ()=>{
        if(user){
          navigator.geolocation.getCurrentPosition(location=>(
            saveUserCurrentPosition({
            lat:location.coords.latitude.toPrecision(14),
            lng: location.coords.longitude.toPrecision(14),
          zoom:10})
                  
          ));
        }
        else{
          saveUserCurrentPosition({
            lat:null,
            lng:null
          })
        }
      }



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

        useEffect(()=>(
          firebase.database().ref('VirusMapLocations').on('child_added',snapshot=>{
            guardarPosiciones({
                
                ubicaciones: posiciones.ubicaciones.concat(snapshot.val())
            })
          })
          // eslint-disable-next-line
        ),[])
        
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

        const handleCase=()=>{
          
            const dbRef=firebase.database().ref('VirusMapLocations')
            const newLocation = dbRef.push();
            const data={
              latlng:{
              lng:posicion.posicionactual.lng,
              lat:posicion.posicionactual.lat
              },
              CasoRegistradoPor: datos.user.displayName
            }
            newLocation.set(data);
            alert('Se ha registrado un nuevo caso')
            
        }

     return (
      
      <div className="contenido">
        <h1 className="header">Covid-19 Map Tracker</h1>
      <div className="contenido-principal">
        <button onClick={handleCurrentPosition}>GetPosition</button>
      <Header
        user={datos.user}
        handleAuth={handleAuth}
        handleLogOut={handleLogOut}/>
      <CovidMap 
        handlePosition={handlePosition}
        user={datos.user}
        posicion={posicion}
        posiciones={posiciones.ubicaciones}
        userCurrentPosition={userposition}
      />
      
       {user?(
        <AddCase
        posicion={posicion}
        handleCase={handleCase}
        />
        
       ):
       (
        null
       )}
     
      </div>
      
      </div>
  );
}

export default App;
