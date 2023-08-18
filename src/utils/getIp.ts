import { getIp } from "@/api/orther";

export const getIpInfo = async () => {
  try {
    const result: any = await getIp();
    const info = result.substring(19, result.length - 1);
    const ip = JSON.parse(info).cip;
    const location = JSON.parse(info).cname;
    return { ip, location };
  } catch (error) {
    console.error(error);
  }
};
