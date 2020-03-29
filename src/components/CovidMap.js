import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { Button } from "react-bootstrap";

const myIcon = new Icon({
  iconUrl: "/covid-19.svg",
  iconSize: [25, 25]
});
const CovidMap = ({
  handlePosition,
  user,
  posicion,
  userCurrentPosition,
  apiData,
  saveApiData,
  sendData
}) => {
  const { lat, lng, zoom } = userCurrentPosition;

  let localizaciones = JSON.parse(localStorage.getItem("locations"));
  if (!localizaciones) {
    localizaciones = [];
  }

  const [localizacion, saveLocalizacion] = useState([]);

  useEffect(() => {
    if (!localizaciones) {
      localStorage.setItem("locations", JSON.stringify(localizacion));
    } else {
      localStorage.setItem("locations", JSON.stringify(localizacion));
    }
  });

  let thereInfo = false;

  if (user && posicion.posicionactual) {
    thereInfo = true;
  }

  const saveLocation = () => {
    let data = {
      lat: posicion.posicionactual.lat,
      lng: posicion.posicionactual.lng
    };
    sendData();
    saveLocalizacion([...localizacion, data]);
  };

  return (
    <div>
      <Map center={[lat, lng]} zoom={zoom} onClick={handlePosition}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {apiData.map((datos, i) => {
          return (
            <Marker position={[datos.lat, datos.long]} icon={myIcon} key={i}>
              <Popup position={saveApiData}>
                <div>
                  Place: {datos.combinedKey} <br />
                  Infected:{datos.confirmed} <br />
                  Recovered:{datos.recovered} <br />
                  Deaths:{datos.deaths} <br />
                </div>
              </Popup>
            </Marker>
          );
        })}

        {localizacion.map((ubicacion, i) => {
          return (
            <Marker
              position={[ubicacion.lat, ubicacion.lng]}
              icon={myIcon}
              key={i}
            >
              <Popup position={saveLocalizacion}>
                Ubicacion del caso{" "}
                <pre>{JSON.stringify(posicion.posicionactual, null, 2)}</pre>
              </Popup>
            </Marker>
          );
        })}

        {user ? (
          <Marker position={{ lat, lng }}>
            <Popup position={{ lat, lng }}>
              Mi ubicacion actual es: <br />
              {user.displayName}
              <pre>{JSON.stringify({ lat, lng }, null, 2)}</pre>
            </Popup>
          </Marker>
        ) : null}
        {user
          ? posicion.posicionactual && (
              <Marker
                position={posicion.posicionactual}
                draggable={true}
                icon={myIcon}
              >
                <Popup position={posicion.posicionactual}>
                  Ubicacion del marcador{" "}
                  <pre>{JSON.stringify(posicion.posicionactual, null, 2)}</pre>
                </Popup>
              </Marker>
            )
          : (posicion.posicionactual = null)}
      </Map>
      {thereInfo ? (
        <Button variant="danger" size="lg" block onClick={saveLocation}>
          Add A New Case
        </Button>
      ) : null}
    </div>
  );
};

export default CovidMap;
