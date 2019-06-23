import axios from "axios";
import keys from "./config/keys";

const api = axios.create({
  baseURL: "https://api.makkcha.com/"
});

const kakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/",
  headers: { Authorization: `KakaoAK ${keys.KakaoAK}` }
});

export const makchaApi = {
  getData: ({ startX, startY, endX, endY }) =>
    api.get(
      `searchMakcha?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`
    ),
  getPosFromGPS: (x, y) =>
    kakaoApi.get(`geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`),
  getPosFromAddr: addr => kakaoApi.get(`search/address.json?query=${addr}`),
  getPosFromKeyword: keyword =>
    kakaoApi.get(`search/keyword.json?query=${keyword}`)
};
