import { GoogleMap, Marker } from '@react-google-maps/api';

function MapComponent({ projects }) {
    return (
        <GoogleMap
            mapContainerStyle={{ height: '100vh', width: '100%' }}
            center={{ lat: 0, lng: 0 }}  // Adjust center based on your data
            zoom={12}
        >
            {projects.map((project) => (
                <Marker
                    key={project.id}
                    position={{ lat: project.latitude, lng: project.longitude }}
                    title={project.name}
                />
            ))}
        </GoogleMap>
    );
}
