import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';
import { fetchProjects } from '../../utils/fetchProjects';

const MapComponent = () => {
  const [projects, setProjects] = useState([]);
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Fetch the projects
    const loadProjects = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    if (isLoaded && projects.length > 0) {
      setMarkers(
        projects.map(project => ({
          id: project._id,
          position: {
            lat: Number(project.latitude),
            lng: Number(project.longitude)
          },
          title: project.name,
        }))
      );
    }
  }, [isLoaded, projects]);

  const mapContainerStyle = {
    height: '78vh',
    width: '100%'
  };

  const center = {
    lat: 39.8097343, // Default center
    lng: -98.5556199
  };

  if (!isLoaded) return <div className='d-flex justify-content-center'>Loading map...</div>;

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
