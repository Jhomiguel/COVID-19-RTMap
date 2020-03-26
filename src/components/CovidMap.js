import React,{useState,useEffect} from 'react';
import {Map,Marker,Popup,TileLayer} from 'react-leaflet'
import CovidStats from './CovidStats';

const consultarApi=()=>{
    const api =fetch('https://covid19.mathdro.id/api/confirmed');
    const resultado= api.then(Response=> Response.json())
    const res=  resultado.then(function(dato){
        return;
    })  
}
const CovidMap = () => {
    
    const[datos,guardarDatos]=useState([]);
    return ( 
        <Map center={[45.4, -75.7]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
        </Map>
     );
}
 
export default CovidMap;