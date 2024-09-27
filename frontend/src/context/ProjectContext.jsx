import { baseURL, postReq } from "../../utils/service";
import { createContext, useCallback, useState } from "react";


export const ProjectContext = createContext();

 export const ProjectContextProvider = ({ children }) => {

    const [projectInfoError, setProjectInfoError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [projectInfo, setProjectInfo] = useState({
        type: "",
        location: "",
        status: "",
        impact: ""
    });
    const [project, setProject] = useState(null)

    const addProject = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);

        const response = await postReq(`${baseURL}/add-city`, JSON.stringify(projectInfo));
        setIsRegisterLoading(false);

        if (response.error) {
            return setProjectInfoError(response);
        }
        setProject(response);

    }, [projectInfo]);

    const updateRegisterInfo = useCallback((info) => {
        setProjectInfo(info);
    }, []);

    const DeleteProject = useCallback(async (e) => {

    });

    return (
        <ProjectContext.Provider
            value={{
                addProject,
                project,
                projectInfo,
                setProject,
                setProjectInfo,
                updateRegisterInfo,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};