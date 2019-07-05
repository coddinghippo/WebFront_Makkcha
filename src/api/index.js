import axios from "axios";
import keys from "../config/keys";
import uuidv1 from "uuid/v1";
import { dataHandler } from "./data_handler";

let apiURL = "https://api.makkcha.com/";
const userToken = localStorage.getItem("userToken") || null;

const Uid = uuidv1();
localStorage.setItem("Uid", Uid);

const api = axios.create({
  baseURL: apiURL,
  headers: { Uid }
});

const kakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/",
  headers: userToken
    ? { Authorization: `KakaoAK ${keys.KakaoAK}`, userToken }
    : { Authorization: `KakaoAK ${keys.KakaoAK}` }
});

export const makchaApi = {
  getData: ({ startX, startY, endX, endY }) =>
    api.get(
      `searchMakcha?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}`
    ),
  allowPush: (formData, userToken) => {
    api.defaults.headers.common["userToken"] = userToken;
    return api.post("push", formData);
  },
  disallowPush: userToken => {
    api.defaults.headers.common["userToken"] = userToken;
    return api.delete("push");
  },
  getPosFromGPS: (x, y) =>
    kakaoApi.get(`geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`),
  getPosFromAddr: addr => kakaoApi.get(`search/address.json?query=${addr}`),
  getPosFromKeyword: keyword =>
    kakaoApi.get(`search/keyword.json?query=${keyword}`),
  postFeedback: formData => api.post("/feedback", formData)
};

export { dataHandler };
