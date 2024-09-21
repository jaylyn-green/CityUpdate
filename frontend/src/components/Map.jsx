import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapComponent = ({ projects }) => {
  const mapContainerStyle = {
    height: '100vh',
    width: '100%'
  };

  const center = {
    lat: 39.8097343,  
    lng: -98.5556199
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={5}
    >
      {projects.map((project) => (
        <Marker
          key={project._id}
          position={{
            lat: Number(project.latitude),  // Ensure latitude is a number
            lng: Number(project.longitude)  // Ensure longitude is a number
          }}
          title={project.name}
        >
        </Marker>
      ))}
    </GoogleMap>

  );
};

export default MapComponent;
