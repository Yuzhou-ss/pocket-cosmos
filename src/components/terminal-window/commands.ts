import Terminal from "vue-web-terminal";
import {
  loginRequest,
  setBgImage,
  setDefaultSearch,
  setdefaultWeather,
} from "@/api";
import { initBgCategory } from "./bg";
import {
  getRandomBg,
  getRandomBgByType,
  searchBgByKeyword,
} from "@/api/orther/index";
import { type commandType } from "./type";
import moment from "moment";
import { useUserStore } from "@/store";
import router from "@/router";
const userStore = useUserStore();
const searchCommand = ["百度", "baidu", "csdn", "bilibili", "哔哩哔哩"];
const weatherTypes = ["snow", "sakura", "rain"];

const { bgTypeListObj, bgTypeListArr } = await initBgCategory();
import bus from "@/utils/bus";
const weatherTypesList = [
  [1, "snow"],
  [2, "sakura"],
  [3, "rain"],
];

export const commands: commandType[] = [
  // 百度搜索
  {
    key: "百度",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "百度") {
        window.open(`https://www.baidu.com/s?wd=${input}`, "_blank");
      } else {
        window.open(`https://www.baidu.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "搜索成功",
      });
    },
  },
  {
    key: "baidu",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "baidu") {
        window.open(`https://www.baidu.com/s?wd=${input}`, "_blank");
      } else {
        window.open(`https://www.baidu.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "搜索成功",
      });
    },
  },
  // 哔哩哔哩搜索
  {
    key: "bilibili",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "bilibili") {
        window.open(
          `https://search.bilibili.com/all?keyword=${input}`,
          "_blank"
        );
      } else {
        window.open(`https://www.bilibili.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "搜索成功",
      });
    },
  },
  {
    key: "哔哩哔哩",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "哔哩哔哩") {
        window.open(
          `https://search.bilibili.com/all?keyword=${input}`,
          "_blank"
        );
      } else {
        window.open(`https://www.bilibili.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "搜索成功",
      });
    },
  },
  // CSDN搜索
  {
    key: "csdn",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "csdn") {
        window.open(`https://so.csdn.net/so/search?q=${input}`, "_blank");
      } else {
        window.open(`https://www.csdn.net/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "搜索成功",
      });
    },
  },
  // 翻译
  {
    key: "翻译",
    callback: (input: string, success: Function, failed: Function) => {
      const patternZH = new RegExp("[\u4E00-\u9FA5]+");
      const patternEN = new RegExp("[A-Za-z]+");
      if (input !== "" && input !== "翻译") {
        if (patternZH.test(input)) {
          window.open(`https://fanyi.baidu.com/#zh/en/${input}`, "_blank");
        } else if (patternEN.test(input)) {
          window.open(`https://fanyi.baidu.com/#en/zh/${input}`, "_blank");
        }
      } else {
        window.open(`https://fanyi.baidu.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "翻译成功",
      });
    },
  },
  // 翻译
  {
    key: "translate",
    callback: (input: string, success: Function, failed: Function) => {
      const patternZH = new RegExp("[\u4E00-\u9FA5]+");
      const patternEN = new RegExp("[A-Za-z]+");
      if (input !== "" && input !== "translate") {
        if (patternZH.test(input)) {
          window.open(`https://fanyi.baidu.com/#zh/en/${input}`, "_blank");
        } else if (patternEN.test(input)) {
          window.open(`https://fanyi.baidu.com/#en/zh/${input}`, "_blank");
        }
      } else {
        window.open(`https://fanyi.baidu.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "翻译成功",
      });
    },
  },
  // 登录
  {
    key: "login",
    callback: (input: string, success: Function, failed: Function) => {
      if (localStorage.getItem("username")) return failed("您已经登录");
      let asker = new Terminal.$Ask();
      success(asker);
      asker.ask({
        question: `请输入用户名：`,
        autoReview: true,
        callback: (username: string) => {
          asker.ask({
            question: "请输入密码： ",
            autoReview: true,
            isPassword: true,
            callback: async (password: string) => {
              Terminal.$api.pushMessage("my-terminal", {
                type: "normal",
                class: "system",
                tag: "waiting",
                content: "正在登录...",
              });
              try {
                const result: any = await loginRequest({ username, password });
                if (result.status === 1) {
                  localStorage.setItem("username", result.data.username);
                  localStorage.setItem("id", result.data.id);
                  localStorage.setItem("nickname", result.data.nickname);
                  userStore.changeUserInfo(
                    result.data.username,
                    result.data.nickname,
                    result.data.defaultSearch,
                    result.data.id,
                    result.data.defaultWeather
                  );
                  return success({
                    type: "normal",
                    class: "success",
                    tag: "success",
                    content: `登录成功！欢迎访问， ${result.data.nickname}.`,
                  });
                } else {
                  return failed("登录失败");
                }
              } catch {
                failed("系统错误，执行 help 获取帮助");
              } finally {
                asker.finish();
              }
            },
          });
        },
      });
    },
  },
  // 退出登录
  {
    key: "logout",
    callback: (input: string, success: Function, failed: Function) => {
      if (!localStorage.getItem("username")) {
        return failed("您还没有登录");
      }
      let asker = new Terminal.$Ask();
      success(asker);
      asker.ask({
        question: "确认退出登录？(y/n)",
        autoReview: true,
        callback: (input: string) => {
          if (input.toLowerCase() === "y") {
            localStorage.removeItem("username");
            localStorage.removeItem("nickname");
            userStore.changeUserInfo(null, null, null, null, null);
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `已退出登录`,
            });
          } else if (input.toLowerCase() === "n") {
            return success({
              type: "normal",
              class: "info",
              tag: "system",
              content: `已取消`,
            });
          } else {
            failed("输入错误");
          }
          asker.finish();
        },
      });
    },
  },
  // 更换壁纸相关
  {
    key: "bg",
    callback: async (input: string, success: Function, failed: Function) => {
      if (input === "-t") {
        return success({
          type: "table",
          content: {
            head: ["id", "type"],
            rows: bgTypeListArr,
          },
        });
      }
      if (input === "bg") {
        success({
          type: "normal",
          class: "info",
          tag: "waiting",
          content: `加载中...`,
        });
        const result: any = await getRandomBg();
        if (result.errno == 0 && result.data.list.length === 1) {
          const app = document.getElementsByClassName("terminal-container")[0];
          app?.setAttribute(
            "style",
            `background-image:url(${result.data.list[0].url}) !important`
          );
          return success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `壁纸已更换`,
          });
        }
        return failed("系统错误，执行 help 获取帮助");
      }
      if (input !== "-t" && input.includes("-t")) {
        success({
          type: "normal",
          class: "info",
          tag: "waiting",
          content: `加载中 ...`,
        });
        let type: Array<string> = input.split("-t");
        const bgType =
          type[0] == ""
            ? type[1].replace(/\s*/g, "")
            : type[0].replace(/\s*/g, "");
        const typeId = bgTypeListObj.get(bgType.toLocaleUpperCase());
        const result: any = await getRandomBgByType(typeId);
        if (result.errno == 0 && result.data.list.length === 1) {
          const app = document.getElementsByClassName("terminal-container")[0];
          app?.setAttribute(
            "style",
            `background-image:url(${result.data.list[0].url}) !important`
          );
          return success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `壁纸更换成功`,
          });
        }
        return failed("Something wrong!");
      }
      if (input === "--set") {
        if (!localStorage.getItem("username")) {
          return failed("该功能需要登录");
        }
        let message = {
          class: "info",
          content: "加载中 ...",
        };
        Terminal.$api.pushMessage("my-terminal", message);
        const app = document.getElementsByClassName("terminal-container")[0];
        const bgImgUrl = app?.style.backgroundImage.split(`"`)[1];
        const result: any = await setBgImage({
          id: localStorage.getItem("id"),
          bgImgUrl,
          username: localStorage.getItem("username"),
        });
        if (result.status === 1) {
          return success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `壁纸设置成功`,
          });
        } else {
          return success({
            type: "normal",
            class: "error",
            tag: "error",
            content: `系统错误，执行 help 获取帮助`,
          });
        }
      }

      if (input === "--reset") {
        if (!localStorage.getItem("username")) {
          return failed("该功能需要登录");
        }
        let message = {
          class: "info",
          content: "加载中 ...",
        };
        Terminal.$api.pushMessage("my-terminal", message);
        const bgImgUrl = "";
        const result: any = await setBgImage({
          id: localStorage.getItem("id"),
          bgImgUrl,
          username: localStorage.getItem("username"),
        });
        if (result.status === 1) {
          const app = document.getElementsByClassName("terminal-container")[0];
          app?.setAttribute(
            "style",
            `background-image:url('./bg7.jpg') !important`
          );
          return success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `壁纸已初始化，刷新页面生效`,
          });
        } else {
          return success({
            type: "normal",
            class: "error",
            tag: "error",
            content: `系统错误，执行 help 获取帮助`,
          });
        }
      }

      // 搜索
      if (input.includes("-s")) {
        let message = {
          class: "info",
          content: "搜索中...",
        };
        Terminal.$api.pushMessage("my-terminal", message);
        let splitInput: Array<string> = input.split("-t");
        const keyword: string =
          splitInput[0] == ""
            ? splitInput[1].replace(/\s*/g, "")
            : splitInput[0].replace(/\s*/g, "");
        const result: any = await searchBgByKeyword(keyword);
        if (result.errno == 0 && result.data.list.length === 1) {
          const app = document.getElementsByClassName("terminal-container")[0];
          app?.setAttribute(
            "style",
            `background-image:url(${result.data.list[0].url}) !important`
          );
          return success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `壁纸更换成功`,
          });
        }
      }
      return success({
        type: "normal",
        class: "error",
        tag: "error",
        content: `系统错误，执行 help 获取帮助`,
      });
    },
  },
  // 介绍
  {
    key: "intro",
    callback: (input: string, success: Function, failed: Function) => {
      if (input === "intro") {
        let messages = [
          {
            type: "normal",
            class: "success",
            tag: "Hello World!",
            content: `你好哇！`,
          },
          {
            type: "normal",
            class: "success",
            tag: "Bgein",
            content: `欢迎来到温粥客开发的自定义Web终端， 当前访问时间 <span style="color:#70c000;font-weight:1000"> ${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}</span>.`,
          },
          {
            type: "normal",
            class: "info",
            tag: "Contact me",
            content: "18091468805",
          },
        ];
        Terminal.$api.pushMessage("my-terminal", messages);
      }
      success();
    },
  },
  {
    key: "search",
    callback: async (input: string, success: Function, failed: Function) => {
      if (!localStorage.getItem("username")) {
        return failed("该功能需要登录");
      }
      let inputs: string[] = input.split(" ");
      let newInput: string[] = [];
      inputs.map((item): any => {
        if (item !== "") {
          newInput.push(item);
        }
      });
      if (newInput[0] === "--set") {
        if (
          newInput.length !== 2 ||
          searchCommand.indexOf(newInput[1].toLowerCase()) < 0
        ) {
          return failed("参数错误，执行 help 获取帮助");
        }
        try {
          const result: any = await setDefaultSearch({
            id: localStorage.getItem("id"),
            defaultSearch: newInput[1],
            username: localStorage.getItem("username"),
          });
          if (result.status === 1) {
            localStorage.setItem("defaultSearch", newInput[1]);
            userStore.changeUserInfo(
              localStorage.getItem("username"),
              localStorage.getItem("nickname"),
              newInput[1],
              localStorage.getItem("userId"),
              localStorage.getItem("defaultWeather")
            );
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `默认搜索引擎已设置为 ${newInput[1]}!`,
            });
          }
        } catch {
          failed("系统错误，执行 help 获取帮助");
        }
      }
      if (newInput[0] === "--reset") {
        if (newInput.length !== 1) {
          return failed("参数错误，执行 help 获取帮助");
        }
        try {
          const result: any = await setDefaultSearch({
            id: localStorage.getItem("id"),
            defaultSearch: null,
            username: localStorage.getItem("username"),
          });
          if (result.status === 1) {
            localStorage.setItem("defaultSearch", "");
            userStore.changeUserInfo(
              localStorage.getItem("username"),
              localStorage.getItem("nickname"),
              null,
              localStorage.getItem("userId"),
              localStorage.getItem("defaultWeather")
            );
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `默认搜索引擎已重置`,
            });
          }
        } catch {
          failed("系统错误，执行 help 获取帮助");
        }
      }
      return success({
        type: "normal",
        class: "error",
        tag: "error",
        content: `系统错误，执行 help 获取帮助`,
      });
    },
  },
  // about
  {
    key: "about",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "about") {
        return failed("系统错误，执行 help 获取帮助");
      } else {
        router.push("/yuzhou/about");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "跳转成功",
      });
    },
  },
  {
    key: "weather",
    callback: async (input: string, success: Function, failed: Function) => {
      let inputs: string[] = input.split(" ");
      let newInput: string[] = [];
      inputs.map((item): any => {
        if (item !== "") {
          newInput.push(item);
        }
      });
      if (newInput[0] === "--set") {
        let message = {
          class: "info",
          content: "天气效果切换中...",
        };
        Terminal.$api.pushMessage("my-terminal", message);
        if (
          newInput.length !== 2 ||
          !weatherTypes.includes(newInput[1].toLowerCase())
        ) {
          return failed("参数错误，执行 help 获取帮助");
        }
        try {
          const result: any = await setdefaultWeather({
            id: localStorage.getItem("id"),
            defaultWeather: newInput[1],
            username: localStorage.getItem("username"),
          });
          if (result.status === 1) {
            localStorage.setItem("defaultWeather", newInput[1]);
            userStore.changeUserInfo(
              localStorage.getItem("username"),
              localStorage.getItem("nickname"),
              localStorage.getItem("defaultSearch"),
              localStorage.getItem("userId"),
              newInput[1]
            );
            return success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `默认天气效果已设置为 ${newInput[1]}！刷新生效`,
            });
          }
        } catch {
          return failed("系统错误，执行 help 获取帮助");
        }
      }
      if (newInput[0] === "-l") {
        return success({
          type: "table",
          content: {
            head: ["id", "weather"],
            rows: weatherTypesList,
          },
        });
      }
      if (newInput[0] === "--stop") {
        let message = {
          class: "info",
          content: "天气效果qingc中...",
        };
        const weatherCanvas =
          document.getElementsByClassName("weather_canvas")[0];
        const terminal = document.getElementById("terminal-container");
        if (weatherCanvas) {
          (terminal as any).removeChild(weatherCanvas);
        }
        Terminal.$api.pushMessage("my-terminal", message);
        if (newInput.length !== 1) {
          return failed("参数错误，执行 help 获取帮助");
        }
        try {
          const result: any = await setdefaultWeather({
            id: localStorage.getItem("id"),
            defaultWeather: "no-weather",
            username: localStorage.getItem("username"),
          });
          if (result.status === 1) {
            localStorage.setItem("defaultSearch", "no-weather");
            userStore.changeUserInfo(
              localStorage.getItem("username"),
              localStorage.getItem("nickname"),
              localStorage.getItem("defaultSearch"),
              localStorage.getItem("userId"),
              "no-weather"
            );
            return success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `默认天气效果已清除，请刷新生效`,
            });
          }
        } catch {
          return failed("系统错误，执行 help 获取帮助");
        }
      }
      if (newInput[0] === "--reset") {
        let message = {
          class: "info",
          content: "天气效果重置中...",
        };
        Terminal.$api.pushMessage("my-terminal", message);
        if (newInput.length !== 1) {
          return failed("参数错误，执行 help 获取帮助");
        }
        try {
          const result: any = await setdefaultWeather({
            id: localStorage.getItem("id"),
            defaultWeather: null,
            username: localStorage.getItem("username"),
          });
          if (result.status === 1) {
            localStorage.setItem("defaultSearch", "");
            userStore.changeUserInfo(
              localStorage.getItem("username"),
              localStorage.getItem("nickname"),
              localStorage.getItem("defaultSearch"),
              localStorage.getItem("userId"),
              null
            );
            return success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `默认天气效果已重置，请刷新生效`,
            });
          }
        } catch {
          return failed("系统错误，执行 help 获取帮助");
        }
      }
      return success({
        type: "normal",
        class: "error",
        tag: "error",
        content: `系统错误，执行 help 获取帮助`,
      });
    },
  },
  {
    key: "cmd",
    callback: async (input: string, success: Function, failed: Function) => {
      const idContainer = document.getElementById("windows-terminal");
      if (idContainer) {
        bus.emit("hidden-windows-terminal");
      } else {
        bus.emit("show-windows-terminal", true);
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "终端已打开",
      });
    },
  },
];

let getKeylist = (): Array<string> => {
  let list: string[] = [];
  commands.map((el) => {
    list.push(el.key);
  });
  return list;
};

export const keyList = getKeylist();
