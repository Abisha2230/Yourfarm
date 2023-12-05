import axios from "axios";
const axiosInstance = axios.create({
  timeout: 30000,
});
 
export const apiRequest = async (request) => {
    
    try {
        const result = await axiosInstance(request);
        return result;

    } 
    catch (error) {
        return error;
    }
}