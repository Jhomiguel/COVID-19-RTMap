import React from 'react';
import {Map,Marker,Popup,TileLayer} from 'react-leaflet'


// eslint-disable-next-line
const consultarApi=()=>{
    const api =fetch('https://covid19.mathdro.id/api/confirmed');
    const resultado= api.then(Response=> Response.json())
    // eslint-disable-next-line
    const res=  resultado.then(function(dato){
        return;
    })  
}

 

const CovidMap = ({handlePosition,user,posicion,ubicaciones,userCurrentPosition}) => {

    const {lat,lng,zoom}= userCurrentPosition
     {/* {ubicaciones.map(location=>(
                    <Marker position={location.ubicacion} draggable={true}>
                      <Popup position={location.ubicacion}>
                          Ubicacion: <pre>{JSON.stringify(location, null, 2)}</pre>
                      </Popup>
                      </Marker>
                  ))  
                  } */}
                    {/* <Marker position={ubicaciones.latlng} draggable={true}>
                      </Marker> */}

  
    return ( 
     
        <Map center={[lat, lng]} zoom={zoom} onClick={handlePosition}>
           <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                      {user?(
                        <Marker position={{lat,lng}} draggable={true}>
                        <Popup position={{lat,lng}}>
                           Mi ubicacion actual es:  <pre>{JSON.stringify({lat,lng}, null, 2)}</pre>
                        </Popup>
                        </Marker>
                      ):(
                        null
                      )}
                  
                  
                    {
                      user
                      ? (posicion.posicionactual && <Marker position={posicion.posicionactual} draggable={true}>
                      <Popup position={posicion.posicionactual}>
                          Ubicacion del marcador <pre>{JSON.stringify(posicion, null, 2)}</pre>
                      </Popup>
                      </Marker>)
                      :(posicion.posicionactual= null)
                    }
        </Map>
     );
}
 
export default CovidMap;