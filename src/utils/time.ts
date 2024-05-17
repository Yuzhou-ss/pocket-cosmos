export function dateDiff(startDate: string) {
  const date = new Date(startDate); // 转换时间格式
  const year = date.getFullYear(); // 取当年的年
  const month = date.getMonth() + 1; // 取当年的月(月份加一)
  const dd = date.getDate(); // 取当年的日期
  const nowDate = new Date(); // 取现在的时间
  const nowYear = nowDate.getFullYear(); // 取现在的年
  const nowMonth = nowDate.getMonth() + 1; // 取现在的月(月份加一)
  const nowDd = nowDate.getDate(); // 取现在的日期
  const restDd =
    nowDd - dd < 0 ? lastDay(nowMonth - 1, year) - dd + nowDd : nowDd - dd;
  const restMonth =
    nowMonth - month < 0 ? 12 + nowMonth - month : nowMonth - month;

  const restYear = nowYear - year;
 
  let resultMonth = restMonth;
  let resultYear = restYear;
  if (nowDd < dd) {
    resultMonth = restMonth - 1 < 0 ? restMonth - 1 + 12 : restMonth - 1;
  }
  if (nowMonth < month || (nowDd < dd && nowMonth === month)) {
    resultYear = restYear - 1;
  }
  return `${resultYear}年${resultMonth}个月${restDd}天`;
}

export function lastDay(mo: number, year: number) {
  if (mo === 4 || mo === 6 || mo === 9 || mo === 11) {
    return 30;
  }
  //2月
  else if (mo === 2) {
    if (isLeapYear(year)) {
      return 29;
    } else {
      return 28;
    }
  }
  //大月
  else {
    return 31;
  }
}

export function isLeapYear(Year: number) {
  return (Year % 4 === 0 && Year % 100 !== 0) || Year % 400 === 0;
}


export const getTimeState = () => {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 设置默认文字
  let state = ``;
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    state = `🌞早上好!`;
  } else if (hours > 10 && hours <= 11) {
    state = `🌞上午好!`;
  } else if (hours > 11 && hours <= 13) {
    state = `🌼中午好!`;
  } else if (hours > 13 && hours <= 18) {
    state = `🌼下午好!`;
  } else if (hours > 18 && hours <= 24) {
    state = `😴晚上好!`;
  }
  return state;
}