import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const Service_Details_Api={
    getServiceDetails : async(Tokens,params)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/service`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            params
      
        });
        return apiRequest(options);
    },
    postService : async(data,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/service`;
        const options = await apiOptions({
            url:itemURL,
            method:"post", 
            Tokens,
            data
      
        });
        return apiRequest(options);
    },
    getServiceId : async(id,Tokens)=>{
        const serviceURL=`${ BASE_URL}${ API_V1 }/admin/service/${id}`;
        const options = await apiOptions({
            url:serviceURL,
            method:"get", 
            Tokens,
      
        });
        return apiRequest(options);
    },
    EditServieId : async(data,id,Tokens)=>{
        const serviceURL=`${ BASE_URL}${ API_V1 }/admin/service/${id}`;
        const options = await apiOptions({
            url:serviceURL,
            method:"put", 
            Tokens,
            data
      
        });
        return apiRequest(options);
    },
    DeleteServiceId : async(id,Tokens)=>{
        const serviceURL=`${ BASE_URL}${ API_V1 }/admin/service/${id}`;
        const options = await apiOptions({
            url:serviceURL,
            method:"delete", 
            Tokens,
        });
        return apiRequest(options);
    },
}