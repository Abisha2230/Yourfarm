import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const Files={
    FileUpload : async(data)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/uploadimage`;
        const options = await apiOptions({
            url:itemURL,
            method:"post", 
            data,
      
        });
        return apiRequest(options);
    },
}