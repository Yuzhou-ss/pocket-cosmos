import { insertConsoleAccess } from "@/api";
import { getIpInfo } from "./getIp";

requestAnimationFrame(async () => {
  try {
    const ipInfo = await getIpInfo();
    const res = await insertConsoleAccess(ipInfo);
  } catch (err) {}
  console.dir("log");
});
