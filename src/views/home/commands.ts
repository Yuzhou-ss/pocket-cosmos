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
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const app = document.getElementById("app");
const searchCommand = ["百度","baidu","csdn","bilibili","哔哩哔哩"]

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
  // 哔哩哔哩搜索
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
  // CSDN搜索
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
        content: "Translate success!",
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
        content: "Translate success!",
      });
    },
  },
  // 登录
  {
    key: "login",
    callback: (input: string, success: Function, failed: Function) => {
      if (localStorage.getItem("username"))
        return failed("You have been logined!");
      let asker = new Terminal.$Ask();
      success(asker);
      asker.ask({
        question: `Please input your username:`,
        autoReview: true,
        callback: (username: string) => {
          asker.ask({
            question: "Please input password: ",
            autoReview: true,
            isPassword: true,
            callback: async (password: string) => {
              Terminal.$api.pushMessage("my-terminal", {
                type: "normal",
                class: "system",
                tag: "waiting",
                content: "Logging in...",
              });
              try {
                const result: any = await loginRequest({ username, password });
                if (result.status === 1) {
                  localStorage.setItem("username", result.data.username);
                  localStorage.setItem("nickname", result.data.nickname);
                  mainStore.changeUserInfo(result.data.username, result.data.nickname, result.data.defaultSearch)
                  success({
                    type: "normal",
                    class: "success",
                    tag: "success",
                    content: `Login succeeded! Welcome, ${result.data.nickname}.`,
                  });
                } else {
                  failed("Login failed!");
                }
              } catch {
                failed("Something wrong!");
              }finally{
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
            mainStore.changeUserInfo(null, null, null)
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `Logout succeeded!`,
            });
          }else if(input.toLowerCase() === "n"){
            success({
              type: "normal",
              class: "info",
              tag: "system",
              content: `Request canceled!`,
            });
          }else{
            failed("Bad inputs!");
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
          content: `Loading ...`,
        });
        const result: any = await getRandomBg();
        if (result.errno == 0 && result.data.list.length === 1) {
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
        if (result.errno == 0 && result.data.list.length === 1) {
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
        if (!localStorage.getItem("username")) {
          return failed("You haven't logged in yet!");
        }
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
      // 搜索
      if (input.includes("-s")) {
        let message = {
          class: "info",
          content: "Searching ...",
        };
        Terminal.$api.pushMessage("my-terminal", message);
        let splitInput: Array<string> = input.split("-t");
        const keyword: string =
          splitInput[0] == ""
            ? splitInput[1].replace(/\s*/g, "")
            : splitInput[0].replace(/\s*/g, "");
        const result: any = await searchBgByKeyword(keyword);
        if (result.errno == 0 && result.data.list.length === 1) {
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
      }

      return success({
        type: "normal",
        class: "error",
        tag: "error",
        content: `Something wrong!`,
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
            content: `Welcome to vue web terminal! Current access time <span style="color:rgb(0,255,255);font-weight:1000"> ${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )} </span>.`,
          },
          {
            type: "normal",
            class: "warning",
            tag: "Attention",
            content: `If you feel that the practicality of this project is not strong, please <span style="color:rgb(0,255,255);font-weight:1000"> be merciful under the tongue </span>.`,
          },
          {
            type: "normal",
            class: "warning",
            tag: "Becsuse",
            content:
              "I just thought it was very interesting, so I did it to practice.",
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
            content: "WX: 18091468805",
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
        return failed("You haven't logged in yet!");
      }
      let inputs: string[] = input.split(" ");
      let newInput:string[] = []
      inputs.map((item) : any => {
        if (item !== "") {
          newInput.push(item);
        }
      });
      if(newInput[0] === "--set"){
        if(newInput.length !== 2 || searchCommand.indexOf(newInput[1].toLowerCase()) < 0){
          return failed("Please enter the correct parameter!")
        }
        try{
          const result:any = await setDefaultSearch({defaultSerch:newInput[1],username:localStorage.getItem('username')})
          if(result.status === 1) {
            localStorage.setItem("defaultSearch", newInput[1])
            mainStore.changeUserInfo(localStorage.getItem("username"), localStorage.getItem("nickname"), newInput[1])
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `Default Set ${newInput[1]}!`,
            });
          }
        }catch{
          failed("Something wrong!")
        }
      }
      if(newInput[0] === "--reset"){
        if(newInput.length !== 1){
          return failed("Please enter the correct parameter!")
        }
        try{
          const result:any = await setDefaultSearch({defaultSerch:null,username:localStorage.getItem('username')})
          if(result.status === 1) {
            localStorage.setItem("defaultSearch", "")
            mainStore.changeUserInfo(localStorage.getItem("username"), localStorage.getItem("nickname"), null)
            success({
              type: "normal",
              class: "success",
              tag: "success",
              content: `Default Reset!`,
            });
          }
        }catch{
          failed("Something wrong!")
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
