import { get } from "./ortherHttp";
import { bgTypeIndexList } from "@/components/terminal-window/bg";

// 获取壁纸分类
export const getCategory = () => get("/intf/getCategory", {});

// 获取随机壁纸
export const getRandomBg = () => {
  const randomType: string =
    bgTypeIndexList[Math.floor(Math.random() * bgTypeIndexList.length + 1)];
  const random = Math.floor(Math.random() * 500 + 1);
  return get(
    `/intf/GetListByCategory?cids=${randomType}&pageno=${random}&count=1`,
    {}
  );
};

// 获取指定分类壁纸
export const getRandomBgByType = (typeId: string) => {
  let random = Math.floor(Math.random() * 500 + 1);
  return get(
    `/intf/GetListByCategory?cids=${typeId}&pageno=${random}&count=1`,
    {}
  );
};

// 关键字搜索壁纸
export const searchBgByKeyword = (keyword: string) => {
  let random = Math.floor(Math.random() * 500 + 1);
  return get(`/intf/search?content=${keyword}&pageno=${random}&count=1`, {});
};

// 获取ip地址
export const getIp = () => get("/apiSohu/cityjson?ie=utf-8", {});

// 每日推荐壁纸
export const getRecommendedBg = () =>
  get("http://wp.birdpaper.com.cn/intf/newestList?pageno=1&count=20", {});
