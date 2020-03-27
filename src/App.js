import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import CovidMap from './components/CovidMap'
import CovidStats from './components/CovidStats'
import firebase from 'firebase'
import AddCase from './components/AddCase'


function App() {
  
  const[datos,guardarDatos]=useState({user:''}); 
  const[posicion,guardarPosicionActual]=useState({posicionactual: null});
  const[posiciones,guardarPosiciones]=useState({ubicaciones: []})


    const {user}=datos;
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
        posicion={posicion}
        posiciones={posiciones.ubicaciones}
      />
       {user?(
        <AddCase
        handleCase={handleCase}
        />
        
       ):(
        null
       )}
      <CovidStats/>
      </div>
      
      </div>
  );
}

export default App;
