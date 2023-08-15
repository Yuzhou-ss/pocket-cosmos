import { get, post } from "./http";

export const loginRequest = (params: any) => {
  return post("user/login", params)}
;

export const signupRequest = (params: any) => post("user/signup", params);

export const setBgImage = (params: any) => post("config/setBgImage", params);
