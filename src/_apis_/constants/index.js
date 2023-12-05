const adminid = JSON.parse(window.localStorage.getItem("User"))?.userData?.id;
//export const BASE_URL = "http://localhost:3001";
// export const BASE_URL = 'https://yourfarm-mobile-server-test.onrender.com';
// export const BASE_URL = 'https://yourfarm-mobile-server.onrender.com';
// export const BASE_URL='http://65.1.244.200:3001';
export const BASE_URL = "https://api2.yourfarm.co.in";
//export const BASE_URL = "https://test.yourfarm.Co.in";

export const API_V1 = "/v1";
export const ADMIN_ID = adminid;
export const POST = "POST";
export const PATCH = "PATCH";
export const PUT = "PUT";
export const GET = "GET";
export const GOOGLEMAPURL = "https://maps.googleapis.com/maps/api/geocode/";
export const GOOGLEMAPVIEWURL = "https://www.google.com/maps/embed/v1/place";
export const DELETE = "DELETE";
export const GOOGLEMAPKEY = "AIzaSyD92-7X5fL2Fc_wDKBpQik3CFvuOuOn82o";
