import React,{useState,useEffect} from 'react';
import {Map,Marker,Popup,TileLayer} from 'react-leaflet'
import CovidStats from './CovidStats';
import LocateControl from 'react-leaflet-locate-control'

const consultarApi=()=>{
    const api =fetch('https://covid19.mathdro.id/api/confirmed');
    const resultado= api.then(Response=> Response.json())
    const res=  resultado.then(function(dato){
        return;
    })  
}

const locateOptions = {
  position: 'topright',
  strings: {
      title: 'Show me where I am, yo!'
  },
  
  onActivate: () => {} // callback before engine starts retrieving locations
}


const CovidMap = ({handlePosition,user,posiciones}) => {


    return ( 
        <Map center={[45.4, -75.7]} zoom={12} onclick={handlePosition}>
           <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                 { posiciones.posicionactual && <Marker position={posiciones.posicionactual} draggable={true}>
                <Popup position={posiciones.posicionactual}>
              Current location: <pre>{JSON.stringify(posiciones, null, 2)}</pre>
            </Popup>
          </Marker>}
        </Map>
     );
}
 
export default CovidMap;