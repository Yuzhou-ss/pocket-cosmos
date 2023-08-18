import { get, post } from "./http";

export const loginRequest = (params: any) => {
  return post("user/login", params)}
;

export const signupRequest = (params: any) => post("user/signup", params);

export const setBgImage = (params: any) => post("config/setBgImage", params);

export const insertAccess = (params: any) => post("access/insertAccessRecord", params);

export const insertConsoleAccess = (params: any) => post("access/insertConsoleAccessRecord", params);

