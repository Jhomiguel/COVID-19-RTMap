import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

const myIcon = new Icon({
  iconUrl: "/covid-19.svg",
  iconSize: [25, 25]
});

const CovidMap = ({
  handlePosition,
  user,
  posicion,
  ubicaciones,
  userCurrentPosition,
  apiData,
  saveApiData,
  guardarPosiciones
}) => {
  const { lat, lng, zoom } = userCurrentPosition;

  return (
    <Map center={[lat, lng]} zoom={zoom} onClick={handlePosition}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {apiData.slice(0 - 10).map((datos, i) => {
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

      {/* {ubicaciones.map((datos, i) => {
        return (
          <Marker position={[datos.latlng]} icon={myIcon} key={i}>
            <Popup position={guardarPosiciones}></Popup>
          </Marker>
        );
      })} */}

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
                <pre>{JSON.stringify(posicion, null, 2)}</pre>
              </Popup>
            </Marker>
          )
        : (posicion.posicionactual = null)}
    </Map>
  );
};

export default CovidMap;
