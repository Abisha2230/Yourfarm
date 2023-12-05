import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const LanguageDetails={
    getLanguageList : async(Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/langauge`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens
      
        });
        return apiRequest(options);
    },
    CreateLanguage: async(data,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/langauge`;
        const options = await apiOptions({
            url:itemURL,
            method:"post", 
            Tokens,
            data
      
        });
        return apiRequest(options);
    },
    getLanguageId: async(id,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/langauge/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
      
        });
        return apiRequest(options);
    },
    EditLanguageId: async(data,id,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/langauge/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data,
        });
        return apiRequest(options);
    },
    DeleteLanguageId: async(id,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/langauge/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"delete", 
            Tokens,
        });
        return apiRequest(options);
    },
}