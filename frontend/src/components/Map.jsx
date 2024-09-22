import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

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
    height: '100vh',
    width: '100%'
  };

  const center = {
    lat: 39.8097343,
    lng: -98.5556199
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={6}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
        />
      ))}
    </GoogleMap>
  );
};

export default MapComponent;
