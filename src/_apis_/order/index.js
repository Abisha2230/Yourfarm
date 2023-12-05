import {apiOptions,apiRequest} from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const OrderDetails={
    getOrdersList : async(Tokens,params)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/orders`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            params
      
        });
        return apiRequest(options);
    },
    statusListing : async(Tokens,params)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/listing_status`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            params
      
        });
        return apiRequest(options);
    },
    listManag : async(Tokens,params)=>{
        
        const itemURL=`${ BASE_URL}${ API_V1 }/user/cattle_types`; 
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            params
      
        });
        return apiRequest(options);
    },

    packageslip : async(Tokens,params)=>{
        
        const itemURL=`${ BASE_URL}${ API_V1 }/payment/packingslip/${params}`; 
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            params
      
        });
        return apiRequest(options);
    },


    getDiseases: async(Tokens)=>{
        const itemURL = `${BASE_URL}${API_V1}/user/cattle_diseases`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            // data      
        });
        return apiRequest(options);
    },
    getCattleListing : async(Tokens,params)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/cattle_listings/all`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            params
        });
        return apiRequest(options);
    },
    getSearchListing:async(Tokens,params)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/search_cattle_listings`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            params
            
        });
        return apiRequest(options);
    },
    getStatusListing : async(Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/status`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens
        });
        return apiRequest(options);
    },
    updateCattleListing : async(id,Tokens,data) =>{
        const itemURL = `${ BASE_URL}${ API_V1 }/admin/cattle_listings/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data
        });
        return apiRequest(options);
    },

    getCattleListingId : async(id,Tokens,data)=>{
        console.log(id)
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/cattle_listings/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            // data
        });
        return apiRequest(options);
    },
    postListingReview : async(Tokens,data1) =>{
        console.log(typeof(data1))
        const itemURL = `${ BASE_URL}${ API_V1 }/admin/listing_status`;
        const options = await apiOptions({
            url:itemURL,
            method:"post", 
            Tokens,
            data1
        });
        return apiRequest(options);
    },
    createBannerList : async(Tokens,data)=>{
        const categoryURL=`${ BASE_URL}${ API_V1 }/admin/listing_status`;
        const options = await apiOptions({
            url:categoryURL,
            method:"post", 
            data,
            Tokens
        });
        return apiRequest(options);
    },
    updateCattleListing : async(id,Tokens,data) =>{
        const itemURL = `${ BASE_URL}${ API_V1 }/admin/cattle_listings/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data
        });
        return apiRequest(options);
    },

    getOrdersListId : async(id,Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/order/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens
      
        });
        return apiRequest(options);
    },
    getShippingProvidersList : async(Tokens)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/shippingproviders`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens
        });
        return apiRequest(options);
    },
    orderUpdateId:async(id,Tokens,data)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/updateorder/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data
        });
        return apiRequest(options);

    },

    listingUpdateId:async(id,Tokens,data)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/cattle_listings/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data
        });
        return apiRequest(options);
        
    },
    getSalesperson:async(Tokens)=>{
        const params = {
            page: 1,
            perPage:20,
            web_admin_role:'Cro'
          }
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/orders/salespersons`;
        const options = await apiOptions({
            url:itemURL,
            method:"get", 
            Tokens,
            params
        });
        return apiRequest(options);
    },

    orderAddressUpdate:async(id,Tokens,data)=>{
        const itemURL=`${ BASE_URL}${ API_V1 }/admin/useraddress/${id}`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data
        });
        return apiRequest(options);
    },
    orderInvoice:async(Tokens,data)=>{
        console.log(JSON.stringify(data)+'datadatadata')
        const itemURL=`${ BASE_URL}${ API_V1 }/payment/invoice`;
        const options = await apiOptions({
            url:itemURL,
            method:"put", 
            Tokens,
            data
        });
        return apiRequest(options);
    }
}