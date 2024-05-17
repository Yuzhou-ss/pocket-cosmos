import Terminal from "vue-web-terminal";
import { loginRequest, setBgImage, setDefaultSearch } from "@/api";
import { bgTypeListObj, bgTypeListArr } from "./bg";
import {
  getRandomBg,
  getRandomBgByType,
  searchBgByKeyword,
} from "@/api/orther/index";
import { type commandType } from "./type";
import moment from "moment";
import { useMainStore } from "@/store";
import router from "@/router";

const mainStore = useMainStore();
const searchCommand = ["百度", "baidu", "csdn", "bilibili", "哔哩哔哩"];

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
      if (localStorage.getItem("username"))
        return failed("您已经登录");
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
                if (result.state === 200) {
                  localStorage.setItem("username", result.data.username);
                  localStorage.setItem("id", result.data.id);
                  localStorage.setItem("nickname", result.data.nickname);
                  mainStore.changeUserInfo(
                    result.data.username,
                    result.data.nickname,
                    result.data.defaultSearch,
                    result.data.id,
                  );
                  success({
                    type: "normal",
                    class: "success",
                    tag: "success",
                    content: `登录成功！欢迎访问， ${result.data.nickname}.`,
                  });
                } else {
                  failed("登录失败");
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
            mainStore.changeUserInfo(null, null, null, null);
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `已退出登录`,
            });
          } else if (input.toLowerCase() === "n") {
            success({
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
        if (result.state === 200) {
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
        if (result.state === 200) {
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
            class: "info",
            tag: "System",
            content: `欢迎来到温粥客开发的自定义Web终端， 当前访问时间为 <span style="color:rgb(0,255,255);font-weight:1000"> ${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}</span>.`,
          },
          {
            type: "normal",
            class: "warning",
            tag: "Attention",
            content: `如果你觉得这个这个应用的实用性不强, 请 <span style="color:rgb(0,255,255);font-weight:1000">嘴下留情</span>.`,
          },
          {
            type: "normal",
            class: "warning",
            tag: "Becsuse",
            content:
              "我只是觉得这很有趣",
          },
          {
            type: "normal",
            class: "info",
            tag: "Author",
            content: "温粥客",
          },
          {
            type: "normal",
            class: "info",
            tag: "Birthday",
            content: "1999-09",
          },
          {
            type: "normal",
            class: "info",
            tag: "Contact me",
            content: "微信: IltcatZ",
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
          if (result.state === 200) {
            localStorage.setItem("defaultSearch", newInput[1]);
            mainStore.changeUserInfo(
              localStorage.getItem("username"),
              localStorage.getItem("nickname"),
              newInput[1],
              localStorage.getItem("userId"),
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
          if (result.state === 200) {
            localStorage.setItem("defaultSearch", "");
            mainStore.changeUserInfo(
              localStorage.getItem("username"),
              localStorage.getItem("nickname"),
              null,
              localStorage.getItem("userId")
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
    },
  },
  // about
  {
    key: "about",
    callback: (input: string, success: Function, failed: Function) => {
      if (input !== "" && input !== "about") {
        return failed("系统错误，执行 help 获取帮助");
      } else {
        router.push("/about");
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
    key:'个人情况',
    callback:(input:string, success: Function, failed:Function) => {
      success({
        type: "html",
        content: "",
      });
    }
  }
];

let getKeylist = (): Array<string> => {
  let list: string[] = [];
  commands.map((el) => {
    list.push(el.key);
  });
  return list;
};

export const keyList = getKeylist();
