import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const Banner_Details={

    bannerList : async(Tokens)=>{
        const categoryURL=`${ BASE_URL}${ API_V1 }/common/productimage`;
        const options = await apiOptions({
            url:categoryURL,
            method:"get", 
            Tokens
        });
        return apiRequest(options);
    },
    createBannerList : async(Tokens,data)=>{
        const categoryURL=`${ BASE_URL}${ API_V1 }/admin/productimage`;
        const options = await apiOptions({
            url:categoryURL,
            method:"post", 
            data,
            Tokens
        });
        return apiRequest(options);
    },
    updateBanner : async(Tokens,data)=>{
        const categoryURL=`${ BASE_URL}${ API_V1 }/admin/productimage`;
        const options = await apiOptions({
            url:categoryURL,
            method:"put", 
            data,
            Tokens
        });
        return apiRequest(options);
    },
};