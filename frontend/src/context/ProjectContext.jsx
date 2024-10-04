import { baseURL, postReq } from "../../utils/service";
import { createContext, useCallback, useState } from "react";

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
    const [projectInfoError, setProjectInfoError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    // needed to reset the form after submission
    const initialProjectInfo = {
        type: "",
        location: "",
        status: "",
        impact: ""
    };

    const [projectInfo, setProjectInfo] = useState(initialProjectInfo);
    const [project, setProject] = useState(null);

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
        resetProjectInfo(); 

    }, [projectInfo, resetProjectInfo]);

    const updateRegisterInfo = useCallback((info) => {
        setProjectInfo(info);
    }, []);

    const DeleteProject = useCallback(async (e) => {
        // Nothing yet
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
                resetProjectInfo, 
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
