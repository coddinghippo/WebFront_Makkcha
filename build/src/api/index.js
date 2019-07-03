import axios from "axios";
import keys from "../config/keys";
import uuidv1 from "uuid/v1";
import { dataHandler } from "./data_handler";

let apiURL = "https://api.makkcha.com/";

const Uid = uuidv1();
localStorage.setItem("Uid", Uid);

const api = axios.create({
  baseURL: apiURL,
  headers: { Uid }
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
    kakaoApi.get(`search/keyword.json?query=${keyword}`),
  postFeedback: formData => api.post("/feedback", formData)
};

export { dataHandler };
