import { React, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const MapContainer = (props) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: -3.6232403416062064, lng: 39.84505438891543 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={currentLocation}
      onClick={(t, map, coord) => console.log(coord)}
      mapTypeId={'satellite'}
    >
      <Marker name={'Current location'} position={currentLocation} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA7PciyEQGs2cjZslsvpOeCJlNm0S8AVWg'
})(MapContainer);
