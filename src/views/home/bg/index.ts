import { getCategory } from "@/api/orther";

async function getCategoryList() {
  let bgTypeListArr: any[] = [];
  let bgTypeIndexList: string[] = [];
  let result: any = await getCategory();

  let bgTypeListObj = new Map()

  result.data.map((item: any) => {
    bgTypeListObj.set(item.show_name,item.old_id )
    bgTypeListArr.push([item.old_id, item.show_name]);
    bgTypeIndexList.push(item.old_id);
  });

  return { bgTypeListObj, bgTypeListArr, bgTypeIndexList };
}

export const { bgTypeListObj, bgTypeListArr, bgTypeIndexList } = await getCategoryList();
