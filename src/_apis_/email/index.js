import { apiOptions, apiRequest } from "../utils";
import { API_V1 } from "../constants";
import { BASE_URL } from "../constants";
export const Email_details = {
  EmailList: async (Tokens) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/mailservice`;
    const options = await apiOptions({
      url: itemURL,
      method: "get",
      Tokens,
    });
    return apiRequest(options);
  },
  EmailSettingCreate: async (Tokens,data) => {
    const itemURL = `${BASE_URL}${API_V1}/admin/mailservice`;
    const options = await apiOptions({
      url: itemURL,
      method: "post",
      data,
      Tokens,
    });
    return apiRequest(options);
  }
};