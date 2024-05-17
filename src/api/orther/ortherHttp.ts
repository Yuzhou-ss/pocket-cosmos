import axios from "axios";

const api = axios.create({
  timeout: 3000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    if (res.status === 200) return Promise.resolve(res);
    return Promise.resolve(res);
  },
  (err) => {
    Promise.reject(err);
  }
);



export function get(url:string, params:any | undefined) {
  return new Promise((resolve, reject) => {
    api
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res?.data || res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}