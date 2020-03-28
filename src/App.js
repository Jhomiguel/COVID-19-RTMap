import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CovidMap from "./components/CovidMap";
import firebase from "firebase";
import AddCase from "./components/AddCase";
import CovidStats from "./components/CovidStats";

function App() {
  const [globalstats, saveGlobalStats] = useState([]);
  const [datos, guardarDatos] = useState({ user: "" });
  const [posicion, guardarPosicionActual] = useState({ posicionactual: null });
  const [posiciones, guardarPosiciones] = useState({ ubicaciones: [] });
  const [userposition, saveUserCurrentPosition] = useState({
    lat: 16.501429,
    lng: -71.493585,
    zoom: 5
  });
  const [apidata, saveApiData] = useState([]);

  const Axios = require("axios");
  useEffect(() => {
    Axios.get("https://covid19.mathdro.id/api/confirmed")
      .then(res => {
        saveApiData(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    Axios.get("https://thevirustracker.com/free-api?global=stats")
      .then(res => {
        saveGlobalStats(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const { user } = datos;

  const handleCurrentPosition = () => {
    if (user) {
      navigator.geolocation.getCurrentPosition(location =>
        saveUserCurrentPosition({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          zoom: 3
        })
      );
    }
  };

  const handlePosition = e => {
    guardarPosicionActual({ posicionactual: e.latlng });
  };

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          guardarDatos({ user: user });
          handleCurrentPosition();
        } else {
          guardarDatos({ user: null });
        }
      }),
    [datos]
  );

  useEffect(
    () =>
      firebase
        .database()
        .ref("VirusMapLocations")
        .on("child_added", snapshot => {
          guardarPosiciones({
            ubicaciones: posiciones.ubicaciones.concat(snapshot.val())
          });
        }),
    // eslint-disable-next-line
    []
  );

  const handleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log(result.user.email));
  };
  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Te has desconectado"))
      .catch(error => console.error(`Eror: ${error.code}: ${error.message}`));
  };

  const handleCase = () => {
    const dbRef = firebase.database().ref("VirusMapLocations");
    const newLocation = dbRef.push();
    const data = {
      latlng: {
        lng: posicion.posicionactual.lng,
        lat: posicion.posicionactual.lat
      },
      CasoRegistradoPor: datos.user.displayName
    };
    newLocation.set(data);
    alert("Se ha registrado un nuevo caso");
  };

  return (
    <div className="contenido">
      <h1 className="header">Covid-19 Map Tracker</h1>
      <div className="contenido-principal">
        <Header
          user={datos.user}
          handleAuth={handleAuth}
          handleLogOut={handleLogOut}
        />
        <CovidMap
          handlePosition={handlePosition}
          user={datos.user}
          posicion={posicion}
          posiciones={posiciones.ubicaciones}
          userCurrentPosition={userposition}
          apiData={apidata}
          saveApiData={saveApiData}
        />
        {user ? <AddCase posicion={posicion} handleCase={handleCase} /> : null}
      </div>
    </div>
  );
}

export default App;
