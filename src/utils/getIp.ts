export const getIpInfo = async () => {
  try {
    let ip = window.location.host.split(":")[0]
    let location = ""
    return {ip , location}
  } catch (error) {
    return {ip:'127.0.0.1',location:"未知"}
  }
};
