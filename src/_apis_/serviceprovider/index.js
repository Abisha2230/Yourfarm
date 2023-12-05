import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const ServiceProvider_Details_Api={
    getServiceproviderDetails : async(Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/serviceprovider`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens
      
        });
        return apiRequest(options);
    },
    postServiceProvider : async(data,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/serviceprovider`;
        const options = await apiOptions({
            url:itemURL,
            method:"post", 
            Tokens,
            data,
        });
        return apiRequest(options);
    },
    GetServiceProviderId : async(id,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/serviceprovider/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
        });
        return apiRequest(options);
    },
    EditServiceProvider : async(id,data,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/serviceprovider/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data
        });
        return apiRequest(options);
    },
}