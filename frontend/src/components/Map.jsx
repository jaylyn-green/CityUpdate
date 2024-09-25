//TODO: Make some style changes. get a new font and go from there. change marker styles maybe?
//move the map further to the side while adding the other components to the left in a stack formation
//could also make the map a little smaller
//page or component to add a city from the frontend then same thing with deleting

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components'

const MapComponent = ({ projects }) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (isLoaded && projects.length > 0) {

      setMarkers(projects.map(project => ({

        id: project._id,
        position: {
          lat: Number(project.latitude),
          lng: Number(project.longitude)
        },
        title: project.name,
      })));
    }
  }, [isLoaded, projects]);

  const mapContainerStyle = {
    height: '78vh',
    width: '100%'
  };

  const center = {
    lat: 39.8097343,
    lng: -98.5556199
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <MapContainer>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={5}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
        />
      ))}
    </GoogleMap>
    </MapContainer>
  );
};

const MapContainer = styled.div`
margin-left: 16%;
margin-right: 16%;
padding-top: 40px;
padding-bottom: 40px;
`;

export default MapComponent;
