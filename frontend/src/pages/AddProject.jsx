//page to add a city to the projects
import styled from "styled-components";
import { Button, Col, Form, Stack, Row } from 'react-bootstrap';
import { useContext } from "react";
import { ProjectContext } from '../context/ProjectContext';


const RegisterProject = () => {

    const {
        addProject,
        updateRegisterInfo,
        projectInfo,
        isRegisterLoading,
        projectError,

    } = useContext(ProjectContext);

    return (
        <AddProjectStyled>
            <Form onSubmit={addProject}>
                <Row style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "10%"
                }}>
                    <Col xa={6}>
                        <Stack gap={3}>
                            <h2>Register Project</h2>
                            <Form.Control type="text" placeholder="Type of project?"
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, type: e.target.value }
                                )} />
                            <Form.Control type="text" placeholder="Location?"
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, location: e.target.value }
                                )} />
                            <Form.Control type="text" placeholder="What's the status?"
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, status: e.target.value }
                                )} />
                            <Form.Control type="text" placeholder="What's the impact?"
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, impact: e.target.value }
                                )} />

                            <Button variant="primary" type="submit">
                                {isRegisterLoading ? "Adding the projecy" : "Register project"}
                            </Button>
                            {
                                projectError?.error && (<Alert variant="danger">
                                    <p>{projectError?.message}</p>
                                </Alert>)
                            }

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </AddProjectStyled>
    );
}
const AddProjectStyled = styled.div`
    
 `;
export default RegisterProject;