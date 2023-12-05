import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const cmsDetails={
    cmsContent : async(Tokens)=>{
        const cmsURL=`${ BASE_URL}${ API_V1 }/admin/cms`;
        const options = await apiOptions({
            url:cmsURL,
            method:"get", 
            Tokens
        });
        return apiRequest(options);
    },
    cmsContentCreate :async(Tokens,data,id)=>{
        const cmsURL=`${ BASE_URL}${ API_V1 }/admin/cms/${id}`;
        const options = await apiOptions({
        url:cmsURL,
        method:"put", 
        Tokens,
        data
    });
    return apiRequest(options);
    }
}