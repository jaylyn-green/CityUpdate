import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './components/Map';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the backend API
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5885/api/v2/get-cities');
        setProjects(response.data); 
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="App">
      <h1>CityScape Tracker</h1>
      <MapComponent projects={projects} />  {/* Pass projects to MapComponent */}
    </div>
  );
}

export default App;
