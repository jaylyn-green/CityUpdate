import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import styled from "styled-components";
import { ProjectContext } from "../context/ProjectContext";

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [address, setAddress] = useState("");

  const { getProjects, deleteProject, projects } = useContext(ProjectContext);

  const [center] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        await getProjects();
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, [markers]);

  useEffect(() => {
    if (isLoaded && projects?.length > 0) {
      setMarkers(
        projects.map((project) => ({
          id: project._id,
          position: {
            lat: Number(project.latitude),
            lng: Number(project.longitude),
          },
          type: project.type,
          status: project.status,
          impact: project.impact,
        }))
      );
    }
  }, [isLoaded, projects]);

  const mapContainerStyle = {
    height: "77vh",
    width: "90%",
    borderRadius: "19px",
  };

  const handleMarkerClick = (marker) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: marker.position }, (results, status) => {
      if (status === "OK" && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        setAddress("Address not found");
      }
      setSelectedMarker(marker);
    });
  };

  const handleDeleteMarker = (markerId) => {
    deleteProject(markerId);
    setSelectedMarker(null);
  };

  if (!isLoaded)
    return <div className="d-flex justify-content-center">Loading map...</div>;

  return (
    <MapContainer>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={5}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            type={marker.type}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h5>
                {selectedMarker.type.charAt(0).toUpperCase() +
                  selectedMarker.type.slice(1)}
              </h5>
              <h6>
                {selectedMarker.status.charAt(0).toUpperCase() +
                  selectedMarker.status.slice(1)}
              </h6>
              <p>
                Impact:{" "}
                {selectedMarker.impact.charAt(0).toUpperCase() +
                  selectedMarker.impact.slice(1)}
              </p>
              <p>{address}</p>
              <button
                className="border border-danger bg-danger text-white rounded"
                onClick={() => handleDeleteMarker(selectedMarker.id)}
              >
                Delete
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 90%;
  padding: 40px;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MapComponent;
