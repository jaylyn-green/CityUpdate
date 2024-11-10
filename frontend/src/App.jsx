import React from "react";
import MapComponent from "./pages/Map";
import HeaderComponent from "./components/Header";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterProject from "./pages/AddProject";
import "./styles/App.css";
import { ProjectContextProvider } from "./context/ProjectContext";

function App() {
  return (
    <Container
      fluid
      className="bg-black bg-gradient m-0 p-0 overflow-hidden vh-100 "
    >
      <HeaderComponent />
      <Row>
        <Col md={3} className="d-flex flex-column align-items-start">
          <ProjectContextProvider>
            <RegisterProject />
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
