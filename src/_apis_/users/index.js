
import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const User_lists={
    userListDetails: async(Tokens,params)=>{
        const userListURL=`${BASE_URL}${API_V1}/admin/users`;
        const options = await apiOptions({
            url:userListURL,
            method:"get", 
            Tokens,
            params
        });
        return apiRequest(options);
    },
    userListPreview: async(Tokens,id)=>{
        const userListURL=`${BASE_URL}${API_V1}/admin/user/${id}`;
        const options = await apiOptions({
            url:userListURL,
            method:"get", 
            Tokens,
        });
        return apiRequest(options);
    }
}