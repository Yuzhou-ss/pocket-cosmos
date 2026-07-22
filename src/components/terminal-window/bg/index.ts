import { getCategory } from "@/api/orther";

async function getCategoryList() {
  let bgTypeListArr: any[] = [];
  let bgTypeIndexList: string[] = [];
  let result: any = await getCategory();

  let bgTypeListObj = new Map();

  result?.data?.map((item: any) => {
    bgTypeListObj.set(item.show_name, item.old_id);
    bgTypeListArr.push([item.old_id, item.show_name]);
    bgTypeIndexList.push(item.old_id);
  });

  return { bgTypeListObj, bgTypeListArr, bgTypeIndexList };
}

// 不直接导出 await 的结果，而是导出一个 getter 函数
export async function getBgCategoryData() {
  return await getCategoryList();
}

// 或者使用懒加载模式
let cachedData: any = null;

export async function getBgCategoryList() {
  if (!cachedData) {
    cachedData = await getCategoryList();
  }
  return cachedData;
}

// 如果需要直接访问这些变量，可以这样做：
export let bgTypeListObj: Map<any, any>;
export let bgTypeListArr: any[] = [];
export let bgTypeIndexList: string[] = [];

// 初始化函数
export async function initBgCategory() {
  const data = await getCategoryList();
  bgTypeListObj = data.bgTypeListObj;
  bgTypeListArr = data.bgTypeListArr;
  bgTypeIndexList = data.bgTypeIndexList;
  return data;
}