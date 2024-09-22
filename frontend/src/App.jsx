import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './components/Map';
import HeaderComponent from './components/Header';
import styled from 'styled-components';

function App() {
  const [projects, setProjects] = useState([]);

  

  useEffect(() => {
    // Fetch projects from api
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
      <AppStyled>
        <HeaderComponent />
        <MapComponent projects={projects} />  {/* Pass projects to MapComponent */}
      </AppStyled>
  );
}
const AppStyled = styled.div`
  margin: 0;
  padding: 0;
  background-color: #2c2c2c;
`;

export default App;
