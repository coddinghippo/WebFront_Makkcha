import axios from "axios";
import keys from "../config/keys";
import uuidv1 from "uuid/v1";
import { dataHandler } from "./data_handler";

// Use json-server db when in dev env
let apiURL = "https://api.makkcha.com/";
// if (process.env.NODE_ENV === "development") apiURL = "http://localhost:3004";

const Uid = uuidv1();

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
      // `searchMakcha?startX=126.9153689271&startY=37.5678973956&endX=127.051217&endY=37.505447`
    ),
  getPosFromGPS: (x, y) =>
    kakaoApi.get(`geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`),
  getPosFromAddr: addr => kakaoApi.get(`search/address.json?query=${addr}`),
  getPosFromKeyword: keyword =>
    kakaoApi.get(`search/keyword.json?query=${keyword}`)
};

export { dataHandler };
