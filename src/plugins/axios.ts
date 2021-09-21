import Vue, { PluginObject } from "vue";
import axios, { AxiosResponse } from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL:
    process.env.baseURL || process.env.apiUrl || "https://fakestoreapi.com/",
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (cfg) => {
    // Do something before request is sent
    return cfg;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  (res) => {
    // Do something with response data
    return res.data;
  },
  (err) => {
    // Do something with response error
    return Promise.reject(err);
  }
);

const Plugin: PluginObject<any> = {
  install: (Vue) => {
    Vue.$axios = _axios;
  },
};
Plugin.install = (Vue) => {
  Vue.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export const get = (url: string): Promise<AxiosResponse<any>> => {
  return _axios.get(url);
};
export const post = (url: string, body?: any): Promise<AxiosResponse<any>> => {
  return _axios.post(url, body);
};
export const put = (url: string, body?: any): Promise<AxiosResponse<any>> => {
  return _axios.put(url, body);
};
export const remove = (
  url: string,
  body?: any
): Promise<AxiosResponse<any>> => {
  return _axios.delete(url, body);
};

export default Plugin;
