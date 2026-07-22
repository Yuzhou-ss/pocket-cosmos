import { get, post } from "./http";

export const loginRequest = (params: any) => post("user/login", params);
// export const loginRequest = (params: any) =>  post("users/login", params);

// 原nodejs
export const signupRequest = (params: any) => post("user/signup", params);
// springboot
// export const signupRequest = (params: any) => post("users/reg", params);

export const setBgImage = (params: any) => post("config/setBgImage", params);
// export const setBgImage = (params: any) => post("users/set_bg", params);

export const insertAccess = (params: any) =>
  post("access/insertAccessRecord", params);

export const insertConsoleAccess = (params: any) =>
  post("access/insertConsoleAccessRecord", params);

export const setDefaultSearch = (params: any) =>
  post("config/setDefaultSearch", params);
// export const setDefaultSearch = (params: any) => post(`users/set_defaultSearch`, params);

export const getUserConfig = (username: string | null) => {
  return get(`/config/getDefaultConfig?username=${username}`, username);
};

export const setdefaultWeather = (params: any) =>
  post("config/setDefaultWeather", params);
