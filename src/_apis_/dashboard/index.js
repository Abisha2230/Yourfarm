import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const dashBoardReports={
    orderReportsList: async(Tokens)=>{
        const userListURL=`${BASE_URL}${API_V1}/admin/admindashboard`;
        const options = await apiOptions({
            url:userListURL,
            method:"get", 
            Tokens
        });
        return apiRequest(options);
    }
}