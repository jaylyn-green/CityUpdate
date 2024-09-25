import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from './components/Map';
import HeaderComponent from './components/Header';
import styled from 'styled-components';
import { Container, Stack, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import AddCity from './components/AddCity';
import DeleteCity from './components/DeleteCity';

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
    <Container fluid>
      <HeaderComponent />
      <Row>
        <Col md={3} className="d-flex flex-column align-items-start">
          <AddCity />
          <DeleteCity />
        </Col>
        <Col md={9}>
          <MapComponent projects={projects} />
        </Col>
      </Row>
    </Container>
  );
}


export default App;
