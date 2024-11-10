import { baseURL, deleteReq, getReq, postReq } from "../../utils/service";
import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projectInfoError, setProjectInfoError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  // needed to reset the form after submission
  const initialProjectInfo = {
    type: "",
    location: "",
    status: "",
    impact: "",
  };

  const [projectInfo, setProjectInfo] = useState(initialProjectInfo);
  const [project, setProject] = useState(null);

  const getProjects = useCallback(async () => {
    const response = await axios.get(`${baseURL}/get-cities`);
    setProjects(response.data);
  }, []);
  
  const resetProjectInfo = useCallback(() => {
    setProjectInfo(initialProjectInfo);
  }, []);

  const addProject = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);

      const response = await postReq(
        `${baseURL}/add-city`,
        JSON.stringify(projectInfo)
      );
      setIsRegisterLoading(false);

      if (response.error) {
        return setProjectInfoError(response);
      }

      setProject(response);
      resetProjectInfo();
      await getProjects();
    },
    [projectInfo, resetProjectInfo]
  );

  const updateRegisterInfo = useCallback((info) => {
    setProjectInfo(info);
  }, []);

  const deleteProject = async (id) => {
    const response = await axios.delete(`${baseURL}/delete-project/${id}`);
    getProjects();
  };

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
        deleteProject,
        getProjects,
        projects,
        setProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(ProjectContext);
};
