const index = 0;
const isDev = index !== 0;
const url = ["https://api.zhangsifan.com", "http://localhost:3030"];
const config = {
  isDev,
  baseUrl: url[index],
  Release: "0.0.1.",
  Vue: "3.2.30",
  Pinia: "2.0.11",
};

export default config;
