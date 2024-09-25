import React, { useEffect, useState } from 'react';
import MapComponent from '../pages/Map';
import HeaderComponent from './components/Header';
import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import AddCity from '../pages/AddCity';
import DeleteCity from '../pages/DeleteCity';
import { getReq, baseURL } from '../utils/service';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from api
    const fetchProjects = async () => {
      try {
        const response = await getReq(`${baseURL}/get-cities`);
        setProjects(response);
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
