// sizes for media queries
const sizes = {
  desktop: 922,
  tablet: 768,
  phone: 576
};

export const fontSize = {
  smallFontSize: "9px",
  normalFontSize: "12px",
  largeFontSize: "15px"
};

export const lineColors = {
  도보: "#ccc",
  "1호선": "#052f93",
  "2호선": "#10a643",
  "3호선": "#ea8406",
  "4호선": "#00a8e6",
  "5호선": "#a95094",
  "6호선": "#d08d1a",
  "7호선": "#657931",
  "8호선": "#e74e6d",
  "9호선": "#be941c",
  경강선: "#004ea7",
  경의중앙선: "#79c0a0",
  경춘선: "#33C7A7",
  공항철도: "#038fa0",
  분당선: "#fcd204",
  서해: "#8be800",
  수인선: "#fbb901",
  신분당선: "#cd2234",
  용인경전철: "#56ab32",
  우이신설경전철: "#b7b7b7",
  의정부경전철: "#f6ba02",
  인천1호선: "#6496df",
  인천2호선: "#fd9800"
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
