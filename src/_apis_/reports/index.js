import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const ReportsListDetails={
    getReportList : async(Tokens,params)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/orderreport`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            params,
            Tokens
      
        });
        return apiRequest(options);
        
    },
    getReportPickList : async(Tokens,params)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/orders/report/picklist`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            params,
            Tokens
      
        });
        return apiRequest(options);
        
    },
}
// export const ReportsPickListDetails={
    
// }