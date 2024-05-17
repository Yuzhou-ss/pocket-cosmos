export const getCityWeather = () => {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(async function (
        status: string | undefined,
        result: any
      ) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          const res = await getWeather(result.city);
          return resolve(res);
        }
        return reject(result);
      });
    });
  });
};

// 获取天气
export const getWeather = (city: string) => {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.Weather", async function () {
      //创建天气查询实例
      let weather = new AMap.Weather();
      //执行实时天气信息查询
      return await weather.getLive(city, function (err: unknown, data: any) {
        if (data.info == "OK") {
          return resolve(data);
        }
        return reject(err);
      });
    });
  });
};
