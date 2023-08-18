import { get } from "./ortherHttp";
import { bgTypeIndexList } from "@/views/home/bg";
export const getCategory = () => get("/intf/getCategory", {});

export const getRandomBg = () => {
  const randomType: string =
    bgTypeIndexList[Math.floor(Math.random() * bgTypeIndexList.length + 1)];
  const random = Math.floor(Math.random() * 500 + 1);
  return get(
    `/intf/GetListByCategory?cids=${randomType}&pageno=${random}&count=1`,
    {}
  );
};

export const getRandomBgByType = (typeId: string) => {
  let random = Math.floor(Math.random() * 500 + 1);
  return get(
    `/intf/GetListByCategory?cids=${typeId}&pageno=${random}&count=1`,
    {}
  );
};

export const searchBgByKeyword = (keyword: string) => {
  let random = Math.floor(Math.random() * 500 + 1);
  return get(`/intf/search?content=${keyword}&pageno=${random}&count=1`, {});
};
