import { getReq } from "./service";
import { baseURL } from "./service";

export const fetchProjects = async () => {
    try {
        const response = await getReq(`${baseURL}/get-cities`);
        return response;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
};