import { get, post, del } from "./http";

export const createQuickAccess = (params: any) =>
  post("quick-access/create", params);

export const getQuickAccessList = () => get("quick-access/list");

export const deleteQuickAccess = (id: number) => del(`quick-access/${id}`);

export const upgradeQuickAccess = (params: any) =>
  post("quick-access/update", params);
