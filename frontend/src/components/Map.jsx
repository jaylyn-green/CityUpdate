import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const MapComponent = ({ projects }) => {

  const mapContainerStyle = {
    height: '100vh',  //100% doesnt work here? Has to be vh or nothing else
    width: '100%',    //Any value or measurement works here?
  };
  const MapContainer = styled.div`
  margin-left: 16%;
  margin-right: 16%;
  padding-top: 40px;
  padding-bottom: 40px;
`

  const center = {
    lat: 39.8097343,
    lng: -98.5556199
  };
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading map...</div>;



  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={7}
      >
        {projects.map((project) => (
          < Marker
              key = { project._id }
              position = {{
          lat: Number(project.latitude),  // Ensure latitude is a number
          lng: Number(project.longitude)  // Ensure longitude is a number
        }}
        title={project.name}
            >
              {console.log(project)}
      </Marker>
          ))}
    </GoogleMap>
  );
};

export default MapComponent;
