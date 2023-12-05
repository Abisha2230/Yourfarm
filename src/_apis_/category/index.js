import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const category_Details={

    categoryList : async(Tokens,params)=>{
        const categoryURL=`${ BASE_URL}${ API_V1 }/admin/category`;
        const options = await apiOptions({
            url:categoryURL,
            method:"get", 
            Tokens,
            params
        });
        return apiRequest(options);
    },
    couponList : async(Tokens,params)=>{
        const categoryURL=`${ BASE_URL}${ API_V1 }/admin/coupons`;
        const options = await apiOptions({
            url:categoryURL,
            method:"get", 
            Tokens,
            params
        });
        return apiRequest(options);
    },
    couponbyId: async(Tokens,Id)=>{
        const categoryEdit=`${ BASE_URL}${ API_V1 }/admin/coupons/${Id}`;
        const options = await apiOptions({
            url:categoryEdit,
            method:"get", 
            // data,
            Tokens
        });
        return apiRequest(options);
    },
    addCoupontoUser: async(Tokens,data)=>{
        const categoryEdit=`${ BASE_URL}${ API_V1 }/user/coupon_redemptions`;
        const options = await apiOptions({
            url:categoryEdit,
            method:"post", 
            data,
            Tokens
        });
        return apiRequest(options);
    },
    couponEdit: async(Tokens,Id,data)=>{
        const categoryEdit=`${ BASE_URL}${ API_V1 }/admin/coupons/${Id}`;
        const options = await apiOptions({
            url:categoryEdit,
            method:"put", 
            data,
            Tokens
        });
        return apiRequest(options);
    },
    categoryEdit : async(Tokens,Id,data)=>{
        const categoryEdit=`${ BASE_URL}${ API_V1 }/admin/category/${Id}`;
        const options = await apiOptions({
            url:categoryEdit,
            method:"put", 
            data,
            Tokens
        });
        return apiRequest(options);
    },
    categoryCreate : async(Tokens,data)=>{
        const categoryCreate=`${ BASE_URL}${ API_V1 }/admin/category`;
        const options = await apiOptions({
            url:categoryCreate,
            method:"post", 
            data,
            Tokens
        });
        return apiRequest(options);
    },
    categoryGetSingleId : async(Tokens,Id)=>{
        const categoryEdit=`${ BASE_URL}${ API_V1 }/admin/category/${Id}`;
        const options = await apiOptions({
            url:categoryEdit,
            method:"get", 
            Tokens
        });
        return apiRequest(options);
    },
    category_Delete : async(Tokens,Id)=>{
        const categoryDelete=`${ BASE_URL}${ API_V1 }/admin/category/${Id}`;
        const options = await apiOptions({
            url:categoryDelete,
            method:"delete", 
            Tokens
        });
        return apiRequest(options);
    },
}