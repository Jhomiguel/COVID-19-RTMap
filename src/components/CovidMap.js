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


const CovidMap = ({handlePosition,user,posicion,ubicaciones}) => {

    
    return ( 
        <Map center={[45.4, -75.7]} zoom={12} onclick={handlePosition}>
           <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
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
                  
                  
                  
                    {
                      user
                      ?  (posicion.posicionactual && <Marker position={posicion.posicionactual} draggable={true}>
                      <Popup position={posicion.posicionactual}>
                          Ubicacion del marcador <pre>{JSON.stringify(posicion, null, 2)}</pre>
                      </Popup>
                      </Marker>)
                      :(null)
                    }
        </Map>
     );
}
 
export default CovidMap;