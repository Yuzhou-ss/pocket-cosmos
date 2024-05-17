import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
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

export function get(url: string, params?: any) {
  return new Promise((resolve, reject) => {
    api
      .get(url, params)
      .then((res) => {
        resolve(res?.data || res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(url: string, params: any) {
  return new Promise((resolve, reject) => {
    api
      .post(url, params)
      .then((res) => {
        if (res) {
          resolve(res?.data || res);
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
