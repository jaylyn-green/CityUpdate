import React, { useEffect, useState } from 'react';
import MapComponent from './pages/Map';
import HeaderComponent from './components/Header';
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterProject from './pages/AddProject';
import DeleteCity from './pages/DeleteProject';
import { getReq, baseURL } from '../utils/service';
import { Route, Routes } from 'react-router-dom';
import "./styles/App.css";
import { ProjectContextProvider } from './context/ProjectContext';

function App() {



  return (
    <Container fluid>
      <HeaderComponent />
      <Row>
        <Col md={3} className="d-flex flex-column align-items-start">
          <ProjectContextProvider>
            <RegisterProject />
            <DeleteCity />
          </ProjectContextProvider>
        </Col>
        <Col md={9}>
          <MapComponent />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
