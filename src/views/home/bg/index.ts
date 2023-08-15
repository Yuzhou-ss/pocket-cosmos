import { getCategory } from "@/api/orther";

async function getCategoryList() {
  let bgTypeList: any[] = [];
  // let bgTypeListObj: any[] = [];
  let bgTypeListArr: any[] = [];
  let bgTypeIndexList: string[] = [];
  let result: any = await getCategory();

  let bgTypeListObj = new Map()

  result.data.map((item: any) => {
    // bgTypeListObj.push({
    //   old_id: item.old_id,
    //   show_name: item.show_name,
    // });
    bgTypeListObj.set(item.show_name,item.old_id )
    bgTypeList.push(item.show_name);
    bgTypeListArr.push([item.old_id, item.show_name]);
    bgTypeIndexList.push(item.old_id);
  });

  return { bgTypeList, bgTypeListObj, bgTypeListArr, bgTypeIndexList };
}

export const { bgTypeList, bgTypeListObj, bgTypeListArr, bgTypeIndexList } = await getCategoryList();
