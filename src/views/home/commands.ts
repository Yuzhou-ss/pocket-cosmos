import Terminal from "vue-web-terminal";
import { loginRequest, setBgImage } from "@/api";
import { bgTypeList, bgTypeListObj, bgTypeListArr } from "./bg";
import { getRandomBg, getRandomBgByType } from "@/api/orther/index";
const app = document.getElementById("app");
import { type commandType } from "./type";
export const commands: commandType[] = [
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
        content: "Search success!",
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
        content: "Search success!",
      });
    },
  },
  {
    key: "bilibili",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "bilibili") {
        window.open(`https://www.baidu.com/s?wd=${input}`, "_blank");
      } else {
        window.open(`https://www.bilibili.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "Search success!",
      });
    },
  },
  {
    key: "哔哩哔哩",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "哔哩哔哩") {
        window.open(`https://www.baidu.com/s?wd=${input}`, "_blank");
      } else {
        window.open(`https://www.bilibili.com/`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "Search success!",
      });
    },
  },
  {
    key: "csdn",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "csdn") {
        window.open(`https://www.baidu.com/s?wd=${input}`, "_blank");
      } else {
        window.open(`https://so.csdn.net/so/search?q=${input}`, "_blank");
      }
      success({
        type: "normal",
        class: "success",
        tag: "success",
        content: "Search success!",
      });
    },
  },

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
        content: "Translate success!",
      });
    },
  },

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
        content: "Translate success!",
      });
    },
  },
  {
    key: "login",
    callback: (input: string, success: Function, failed: Function) => {
      if (localStorage.getItem("username"))
        return failed("You have been logined!");
      let asker = new Terminal.$Ask();
      success(asker);
      asker.ask({
        question: "Please input your username: ",
        autoReview: true,
        callback: (username: string) => {
          asker.ask({
            question: "Please input password: ",
            autoReview: true,
            isPassword: true,
            callback: async (password: string) => {
              success({
                type: "normal",
                class: "system",
                tag: "waiting",
                content: "Logging in...",
              });
              const result: any = await loginRequest({ username, password });
              if (result.status === 1) {
                localStorage.setItem("username", result.data.username);
                localStorage.setItem("nickname", result.data.nickname);
                success({
                  type: "normal",
                  class: "success",
                  tag: "success",
                  content: `Login succeeded! Welcome, ${result.data.nickname}.`,
                });
              } else {
                failed("Login failed!");
              }
              asker.finish();
            },
          });
        },
      });
    },
  },
  {
    key: "logout",
    callback: (input: string, success: Function, failed: Function) => {
      if (!localStorage.getItem("username")) {
        return failed("You haven't logged in yet!");
      }
      let asker = new Terminal.$Ask();
      success(asker);
      asker.ask({
        question: "Confirm to logout?(y/n)",
        autoReview: true,
        callback: (input: string) => {
          if (input.toLowerCase() === "y") {
            localStorage.removeItem("username");
            localStorage.removeItem("nickname");
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `Logout succeeded!`,
            });
          }
          asker.finish();
        },
      });
    },
  },
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
          content: `Loading ...`,
        });
        const result: any = await getRandomBg();
        if (result.errno == 0 && result.data.list[0].url) {
          app?.setAttribute(
            "style",
            `background-image:url(${result.data.list[0].url})`
          );
          return success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `Wallpaper changged!`,
          });
        }
        return failed("Something wrong!");
      }
      if (input !== "-t" && input.includes("-t")) {
        success({
          type: "normal",
          class: "info",
          tag: "waiting",
          content: `Loading ...`,
        });
        let type: Array<string> = input.split("-t");
        const bgType =
          type[0] == ""
            ? type[1].replace(/\s*/g, "")
            : type[0].replace(/\s*/g, "");
        const typeId = bgTypeListObj.get(bgType.toLocaleUpperCase());
        const result: any = await getRandomBgByType(typeId);
        if (result.errno == 0 && result.data.list[0].url) {
          app?.setAttribute(
            "style",
            `background-image:url(${result.data.list[0].url})`
          );
          return success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `Wallpaper changged!`,
          });
        }
        return failed("Something wrong!");
      }
      if (input === "--set") {
        let message = {
          class: "info",
          content: "Loading ...",
        };
        Terminal.$api.pushMessage("my-terminal", message);

        const bgImgUrl = app?.style.backgroundImage.split(`"`)[1];
        const result: any = await setBgImage({ bgImgUrl });
        if (result.data.status === 1) {
          success({
            type: "normal",
            class: "success",
            tag: "success",
            content: `Wallpaper set succeed!`,
          });
        } else {
          success({
            type: "normal",
            class: "error",
            tag: "error",
            content: `Something wrong!`,
          });
        }
      }
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
