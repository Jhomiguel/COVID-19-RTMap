import React from "react";
import { Map, Marker, Popup, TileLayer, L } from "react-leaflet";

const CovidMap = ({
  handlePosition,
  user,
  posicion,
  ubicaciones,
  userCurrentPosition,
  apiData,
  saveApiData
}) => {
  const { lat, lng, zoom } = userCurrentPosition;

  return (
    <Map center={[lat, lng]} zoom={zoom} onClick={handlePosition}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {apiData.slice(0 - 80).map(datos => {
        return (
          <Marker position={[datos.lat, datos.long]} draggable={true}>
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

      {user ? (
        <Marker position={{ lat, lng }} draggable={true}>
          <Popup position={{ lat, lng }}>
            Mi ubicacion actual es:{" "}
            <pre>{JSON.stringify({ lat, lng }, null, 2)}</pre>
          </Popup>
        </Marker>
      ) : null}
      {user
        ? posicion.posicionactual && (
            <Marker position={posicion.posicionactual} draggable={true}>
              <Popup position={posicion.posicionactual}>
                Ubicacion del marcador{" "}
                <pre>{JSON.stringify(posicion, null, 2)}</pre>
              </Popup>
            </Marker>
          )
        : (posicion.posicionactual = null)}
    </Map>
  );
};

export default CovidMap;
