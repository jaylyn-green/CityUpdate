import { baseURL, postReq } from "../../utils/service";
import { createContext, useCallback, useState } from "react";

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
    const [projectInfoError, setProjectInfoError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    // Initial state for the form
    const initialProjectInfo = {
        type: "",
        location: "",
        status: "",
        impact: ""
    };

    const [projectInfo, setProjectInfo] = useState(initialProjectInfo);
    const [project, setProject] = useState(null);

    // Function to reset the form fields
    const resetProjectInfo = useCallback(() => {
        setProjectInfo(initialProjectInfo);
    }, []);

    const addProject = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);

        const response = await postReq(`${baseURL}/add-city`, JSON.stringify(projectInfo));
        setIsRegisterLoading(false);

        if (response.error) {
            return setProjectInfoError(response);
        }

        setProject(response);
        resetProjectInfo();  // Reset form after successful submission

    }, [projectInfo, resetProjectInfo]);

    const updateRegisterInfo = useCallback((info) => {
        setProjectInfo(info);
    }, []);

    const DeleteProject = useCallback(async (e) => {
        // Implement delete functionality if needed
    }, []);

    return (
        <ProjectContext.Provider
            value={{
                addProject,
                project,
                projectInfo,
                setProject,
                setProjectInfo,
                updateRegisterInfo,
                isRegisterLoading,
                projectInfoError,
                resetProjectInfo,  // Expose reset function to the context
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
