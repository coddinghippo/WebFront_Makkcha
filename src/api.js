import axios from "axios";
import keys from "./config/keys";

// Use json-server db when in dev env
let apiURL = "https://api.makkcha.com/";
if (process.env.NODE_ENV === "development") apiURL = "http://localhost:3004";

const api = axios.create({
  baseURL: apiURL
});

const kakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/",
  headers: { Authorization: `KakaoAK ${keys.KakaoAK}` }
});

export const makchaApi = {
  getData: ({ startX, startY, endX, endY }) =>
    api.get(
      process.env.NODE_ENV === "development"
        ? `/db`
        : `searchMakcha?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`
    ),
  getPosFromGPS: (x, y) =>
    kakaoApi.get(`geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`),
  getPosFromAddr: addr => kakaoApi.get(`search/address.json?query=${addr}`),
  getPosFromKeyword: keyword =>
    kakaoApi.get(`search/keyword.json?query=${keyword}`)
};
