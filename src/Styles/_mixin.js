// sizes for media queries
const sizes = {
  desktop: 922,
  tablet: 768,
  phone: 576
};

export const fontSize = {
  smallFontSize: "0.7rem",
  normalFontSize: "1rem",
  largeFontSize: "1.2rem",
  extraLargeFontSize: "2rem",
  superLargeFontSize: "3rem"
};

export const lineColors = {
  도보: "#ccc",
  "1": "#052f93",
  "2": "#10a643",
  "3": "#ea8406",
  "4": "#00a8e6",
  "5": "#a95094",
  "6": "#d08d1a",
  "7": "#657931",
  "8": "#e74e6d",
  "9": "#be941c",
  kyeongkang: "#004ea7",
  kyung: "#79c0a0",
  chun: "#33C7A7",
  kong: "#038fa0",
  bun: "#fcd204",
  서해선: "#8be800",
  suin: "#fbb901",
  sinbun: "#cd2234",
  yongin: "#56ab32",
  우이신설경전철: "#b7b7b7",
  경전철의정부: "#f6ba02",
  in: "#6496df",
  in2: "#fd9800"
};

export const lineChar = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  kyeongkang: "경강",
  kyung: "중앙",
  chun: "경춘",
  kong: "공항",
  bun: "분",
  서해선: "서해",
  suin: "수인",
  sinbun: "신분",
  yongin: "용인",
  우이신설경전철: "우이",
  경전철의정부: "의정",
  in: "인1",
  in2: "인2",
  도보: "도보"
};

export const headerHeight = "3rem";

export const color = { bgColor: "#141414", fontColor: "#000" };

const customMediaQuery = maxWidth => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(sizes.desktop),
  tablet: customMediaQuery(sizes.tablet),
  phone: customMediaQuery(sizes.phone)
};
