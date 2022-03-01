import axios, {
  type AxiosPromise,
  type AxiosRequestConfig,
  type Method,
} from "axios";
import config from "./config";
const instance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  timeout: 10000,
});
instance.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (res) => {
    try {
      return res.data;
    } catch (error) {
      return res;
    }
  },
  (error) => {
    console.log(error.response, "error");
    const { status } = error.response ? error.response : { status: null };
    console.log(status);
    return Promise.reject(error);
  }
);

export default (
  url: string,
  method: Method,
  data: AxiosRequestConfig
): AxiosPromise => {
  return instance({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: data,
  });
};
