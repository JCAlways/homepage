const index = 0;
const isDev = index > 0;
const url = ["https://api.zhangsifan.com", "http://localhost:3030"];
const config = {
  isDev,
  baseUrl: url[index],
  Release: "0.0.3.",
  Vue: "3.2.31",
  Pinia: "2.0.12",
};

export default config;
