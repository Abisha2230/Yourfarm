import { apiOptions, apiRequest } from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const Item_Details = {
  ItemsList: async (Tokens,params) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/products`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
      params
    });
    return apiRequest(options);
  },

  ListDetail: async (Tokens,params) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/products`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
      params
    });
    return apiRequest(options);
  },
  
  DairyList: async (Tokens,params) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/dairyindustries`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
      params
    });
    return apiRequest(options);
  },
  chillingList: async (Tokens,data) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/chillingcenters`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
      data
    });
    return apiRequest(options);
  },
  DairybyId: async (Tokens,Id) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/dairyindustries/${Id}`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
    });
    return apiRequest(options);
  },
  ChillingbyId: async (Tokens,Id) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/chillingcenters/${Id}`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
    });
    return apiRequest(options);
  },
  Getbannerblog: async (Tokens,params) => {
    const itemURL = `${BASE_URL}${API_V1}/resources`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
      params
    });
    return apiRequest(options);
  },
  Getbannerblogbyid: async (id,Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/resources/${id}`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
    });
    return apiRequest(options);
  },
  BannerblogEdit: async (data, Tokens,id) => {
    const itemURL = `${BASE_URL}${API_V1}/resources/${id}`;
    const options = await apiOptions({
      url: itemURL,
      method: "put",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  BannerblogCreate: async (data, Tokens) => {
    // console.log(data+"============================data")
    const itemURL = `${BASE_URL}${API_V1}/admin/productimage`;
    const options = await apiOptions({
      url: itemURL,
      method: "post",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  ItemsGetId: async (id, Tokens,data) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/products/${Number(id)}?di_id=${data.di_id}`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
      data,
    });
    return apiRequest(options);
  },
  // searchList: async (Tokens,params) => {
    // const itemURL = `http://localhost:3001/v1/user/searchproduct/${cattle_type}?product_name=${product_name}`;
    // const itemURL = `${BASE_URL}${API_V1}/admin/products/search`;
    // const itemURL = `${BASE_URL}${API_V1}/admin/products/search`;

  //   const options = await apiOptions({
  //     url: itemURL,
  //     method: "get",
  //     Tokens,
  //     // data,
  //     params,
  //   });
  //   return apiRequest(options);
  // },

  searchList: async (Tokens,params) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/products/search`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
      params
    });
    return apiRequest(options);
  },
  
  ItemsEdit: async (data, id,di_di, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/products/${id}?di_di=${di_di}`;
    const options = await apiOptions({
      url: itemURL,
      method: "put",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  ItemsCreate: async (data, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/products`;
    const options = await apiOptions({
      url: itemURL,
      method: "post",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  DairyCreate: async (data, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/dairyindustries`;
    const options = await apiOptions({
      url: itemURL,
      method: "post",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  ChillingCreate: async (data, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/chillingcenters`;
    const options = await apiOptions({
      url: itemURL,
      method: "post",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  DairyEdit: async (data, id, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/dairyindustries/${id}`;
    const options = await apiOptions({
      url: itemURL,
      method: "put",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  ChillingEdit: async (data, id, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/chillingcenters/${id}`;
    const options = await apiOptions({
      url: itemURL,
      method: "put",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  CouponCreate: async (data, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/coupons`;
    const options = await apiOptions({
      url: itemURL,
      method: "post",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  ResourceCreate: async (data, Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/resources`;
    const options = await apiOptions({
      url: itemURL,
      method: "post",
      data,
      Tokens,
    });
    return apiRequest(options);
  },
  ItemsDeletes: async (id, Tokens,di) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/products/${id}?di_id=${di}`;
    const options = await apiOptions({
      url: itemURL,
      method: "delete",
      Tokens,
    });
    return apiRequest(options);
  },
};
