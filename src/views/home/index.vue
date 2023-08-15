<template>
  <div id="terminal">
    <terminal
      name="my-terminal"
      @execCmd="onExecCmd"
      class="my-terminal"
      :command-store="commandList"
      :init-log="intLog"
    ></terminal>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { commands, keyList } from "./commands";
import { useRouter } from "vue-router";
import { commandList } from "./commandList";
import moment from "moment";
import { type msgType } from "./type";

const router = useRouter();
let goLoginBtn;

const intLog: msgType[] = [
  {
    type: "normal",
    class: "success",
    tag: "System",
    content: "Terminal Initializing ...",
  },
  {
    type: "normal",
    class: "success",
    tag: "system",
    content: `Current access time ${moment().format("YYYY-MM-DD HH:mm:ss")}.`,
  },
  {
    type: "normal",
    class: "success",
    tag: "System",
    content: `Welcome to vue web terminal! If you are using for the first time, use the <span style="color:rgb(255,255,0);font-weight:1000">help</span> command to learn.`,
  },
];

onMounted(() => {
  if (localStorage.getItem("nickname")) {
    ElNotification({
      title: "欢迎访问",
      message: `您好，${localStorage.getItem("nickname")}！`,
      type: "success",
    });
  } else {
    ElNotification({
      title: "欢迎访问",
      message: `游客您好！点击<el-button type="text" size="mini" style="color:rgb(121,187,255);cursor:pointer" id="goLoginBtn"> 此处 </el-button>登录/注册！本应用提供了命令行形式的登录方式，输入login体验！`,
      type: "success",
      dangerouslyUseHTMLString: true,
    });
    // axios
    //   .get("/apiSohu/cityjson?ie=utf-8", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json;charset=UTF-8",
    //     },
    //   })
    //   .then((res:any) => {
    //     const info = res.data.substring(19, res.data.length - 1);
    //     const address = JSON.parse(info).cname;
    //     ElNotification({
    //       title: "欢迎访问",
    //       message: `您好，来自${address}的游客，点击<el-button type="text" size="mini" style="color:rgb(121,187,255);cursor:pointer" id="goLoginBtn"> 此处 </el-button>登录/注册！本应用提供了命令行形式的登录方式，输入login体验！`,
    //       type: "success",
    //       dangerouslyUseHTMLString: true,
    //     });
    //   });
  }
  goLoginBtn = document.getElementById("goLoginBtn");
  goLoginBtn?.addEventListener("click", () => {
    router.push("/");
  });
});

const onExecCmd = (
  key: string,
  command: string,
  success: Function,
  failed: Function
) => {
  // 处理空格，将命令与参数分开
  if (command.split(" ").length > 1) {
    let commandArr = command.split(" ");
    commandArr.shift();
    command = commandArr.length > 1 ? commandArr.join(" ") : commandArr[0];
  }
  // 根据命令列表判断命令是否合法
  if (!keyList.includes(key))
    return failed(
      `Command <span style="font-weight:1000;color:rgb(255,255,0)">${key}</span> is not defined!`
    );
  // 执行对应的回调
  commands.find((item) => {
    if (key === item.key || key.toLowerCase() === item.key) {
      item.callback(command, success, failed);
    }
  });
};
</script>

<style scoped lang="scss">
#terminal {
  height: 80%;
  width: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .my-terminal ::v-deep {
    background-color: transparent !important;
    .terminal {
      .t-header-container {
        .t-header {
          background-color: rgba(149, 149, 152, 0.5) !important;
        }
      }
      .t-window {
        background-color: rgba(100, 100, 100, 0.5) !important;
        .t-cmd-line-content {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
