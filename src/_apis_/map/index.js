import { GOOGLEMAPKEY } from "../constants";
import { GOOGLEMAPURL } from "../constants";
import {apiOptions,apiRequest} from "../utils";
export const googleMapDetails={
    getLATLONG: async (params) => {
        const itemURL = `${GOOGLEMAPURL}json?address=${params}&key=${GOOGLEMAPKEY}`;
        const options = await apiOptions({
          url: itemURL,
          method: "get",
        });
        return apiRequest(options);
      },
};