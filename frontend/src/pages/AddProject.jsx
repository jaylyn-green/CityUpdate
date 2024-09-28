import styled from "styled-components";
import { Button, Col, Form, Stack, Row, Alert } from 'react-bootstrap';
import { useContext } from "react";
import { ProjectContext } from '../context/ProjectContext';

const RegisterProject = () => {
    const {
        addProject,
        updateRegisterInfo,
        projectInfo,
        isRegisterLoading,
        projectInfoError
    } = useContext(ProjectContext);

    return (
        <AddProjectStyled>
            <Form onSubmit={addProject}>
                <Row style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "10%"
                }}>
                    <Col xs={12}>
                        <Stack gap={3}>
                            <h2>Register Project</h2>
                            <Form.Control
                                type="text"
                                placeholder="Type of project?"
                                value={projectInfo.type}
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, type: e.target.value }
                                )}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Location?"
                                value={projectInfo.location}
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, location: e.target.value }
                                )}
                            />
                            <Form.Control
                                type="text"
                                placeholder="What's the status?"
                                value={projectInfo.status}
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, status: e.target.value }
                                )}
                            />
                            <Form.Control
                                type="text"
                                placeholder="What's the impact?"
                                value={projectInfo.impact}
                                onChange={(e) => updateRegisterInfo(
                                    { ...projectInfo, impact: e.target.value }
                                )}
                            />

                            <Button variant="primary" type="submit">
                                {isRegisterLoading ? "Adding the project..." : "Register project"}
                            </Button>

                            {projectInfoError?.error && (
                                <Alert variant="danger">
                                    <p>{projectInfoError?.message}</p>
                                </Alert>
                            )}

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </AddProjectStyled>
    );
};

const AddProjectStyled = styled.div`
  margin-left: 40px;
`;

export default RegisterProject;
