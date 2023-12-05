import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
const ADMIN_LOGIN = `${BASE_URL}${API_V1}/login`;

export const Admin_login_Service={
      LoginAdmin : async(params)=>{
        const options = await apiOptions({
            url:ADMIN_LOGIN,
            data:params,
            method:"post", 
        });
        return apiRequest(options);
    },
    ChangePassword : async(params)=>{
     const ADMIN_CHANGEPASSWORD = `${BASE_URL}${API_V1}/admin/changepassword`;
      const options = await apiOptions({
        url:ADMIN_CHANGEPASSWORD,
        data:params,
        method:"put", 
    });
    
    return apiRequest(options);
    },
    ResetPassword : async (params) =>{
      const AdminResetPassWord = `${BASE_URL}${API_V1}/admin/forgotpassword`;
      const options = await apiOptions({
        url:AdminResetPassWord,
        data:params,
        method:"put", 
    });
   
    return apiRequest(options);
    },
    adminDetails : async (Tokens,id) =>{
      const AdminGetDetails = `${BASE_URL}${API_V1}/admin/${id}`;
      const options = await apiOptions({
        url:AdminGetDetails,
        method:"get",
        Tokens,
     
    });
    return apiRequest(options);
    },
    LogoutAdmin : async(Tokens,id)=>{
      const AdminLogoutUrl=`${BASE_URL}${API_V1}/logout/${id}`;
      const options = await apiOptions({
        url:AdminLogoutUrl,
        method:"delete",
        Tokens,
    });
    return apiRequest(options);
    }
};




