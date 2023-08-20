<template>
  <div id="terminal">
    <terminal
      name="my-terminal"
      @execCmd="onExecCmd"
      class="my-terminal"
      :command-store="commandList"
      :init-log="intLog"
    >
      <template #helpBox="{ item }">
        <el-card shadow="always" class="helpBox" v-if="item">
          <template #header>
            <div class="card-header">
              <span>Tips</span>
            </div>
          </template>
          <div>
            <div class="help-item">
              <el-tag effect="dark">Format</el-tag
              ><span class="help-content">{{
                item ? item.description : ""
              }}</span>
            </div>
            <div class="help-item help-exps">
              <div class="help-exp-tag">
                <el-tag effect="dark">Examples</el-tag>
              </div>
              <div class="help-exp-content">
                <div
                  class="help-exp-content-item"
                  v-for="(exp, index) in item.example"
                  :key="index"
                >
                  <el-divider style="margin: 8px 0" v-if="index != 0" />
                  <div class="help-exp-content-item-box">
                    <div><el-tag effect="light">dcs{{ index+1 }}</el-tag></div>
                    <div>
                      <p class="help-exp-content-item-content">{{ exp.des }}</p>
                    </div>
                  </div>
                  <div class="help-exp-content-item-box">
                    <div>
                      <el-tag effect="light" type="success">cmd{{ index+1 }}</el-tag>
                    </div>
                    <div>
                      <p class="help-exp-content-item-content">{{ exp.cmd }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </template>
    </terminal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { commands, keyList } from "./commands";
import { useRouter } from "vue-router";
import { commandList } from "./commandList";
import moment from "moment";
import { type msgType } from "./type";
import { getIpInfo } from "@/utils/getIp";
import { insertAccess, getDefaultConfig } from "@/api";
import "@/utils/console";
import { useMainStore } from "@/store";

const mainStore = useMainStore();
const app = document.getElementById("app");
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
const defaultSearch = ref(null);
const getConfig = async () => {
  if (!mainStore.$state.username) {
    return;
  }
  try {
    const result: any = await getDefaultConfig({
      username: mainStore.$state.username,
    });
    if (result.data.defaultSearch) {
      defaultSearch.value = result.data.defaultSearch;
    }
    if (result.data.bgImgUrl) {
      app?.setAttribute(
        "style",
        `background-image:url(${result.data.bgImgUrl})`
      );
    }
  } catch {
    return;
  }
};
getConfig();

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
  }
  goLoginBtn = document.getElementById("goLoginBtn");
  goLoginBtn?.addEventListener("click", () => {
    router.push("/login");
  });

  const ipInfo = getIpInfo();
  insertAccessRecord(ipInfo);
});

const insertAccessRecord = async (params: any) => {
  try {
    await insertAccess(params);
  } catch (err) {
    console.error(err);
  }
};

mainStore.$subscribe(async (mutation, state) => {
  if (state.username) {
    let username = localStorage.getItem("username");
    try {
      const result: any = await getDefaultConfig({ username });
      if (result.status === 1) {
        if (result.data.defaultSearch) {
          defaultSearch.value = result.data.defaultSearch;
        }
        if (result.data.bgImgUrl) {
          app?.setAttribute(
            "style",
            `background-image:url(${result.data.bgImgUrl})`
          );
        }
      }
    } catch {}
  } else {
    defaultSearch.value = null;
  }
});
// watch(loginStatus, async (val) => {
//   if (val === true) {
//     let username = localStorage.getItem("username");
//     try {
//       const result: any = await getDefaultConfig({ username });
//       if (result.status === 1) {
//         app?.setAttribute(
//           "style",
//           `background-image:url(${result.data.bgImgUrl})`
//         );
//         defaultSearch.value = result.data.defaultSearch;
//       }
//     } catch {}
//   }
// });

const onExecCmd = (
  key:any,
  command: string,
  success: Function,
  failed: Function
) => {
  let originCommand = command;
  // 处理空格，将命令与参数分开
  if (command.split(" ").length > 1) {
    let commandArr = command.split(" ");
    commandArr.shift();
    command = commandArr.length > 1 ? commandArr.join(" ") : commandArr[0];
  }
  // 根据命令列表判断命令是否合法
  if (!keyList.includes(key.toLowerCase()) && defaultSearch.value)
    return failed(
      `Command <span style="font-weight:1000;color:rgb(255,255,0)">${key}</span> is not defined!`
    );

  if (!keyList.includes(key.toLowerCase())) {
    command = originCommand;
    key = defaultSearch.value;
  }
  // 执行对应的回调
  commands.find((item) => {
    if (key === item.key || key.toLowerCase() === item.key) {
      item.callback(command.toLowerCase(), success, failed);
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
        .t-log-box {
          color: #fff;
        }
        .t-cmd-line-content {
          font-size: 14px;
        }
        .t-table,
        .t-table tbody,
        .t-table td,
        .t-table thead,
        .t-table tr {
          padding: 5px 10px;
        }
      }
    }
  }
  .helpBox ::v-deep {
    position: absolute;
    right: 15px;
    top: 40px;
    max-height: calc(100% - 60px);
    z-index: 99;
    padding: 5px;
    overflow: auto;
    max-width: 50%;
    font-family: Monaco, Menlo, Consolas, monospace;
    background-color: rgba(152, 156, 225, 0.6);
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(44,62,138,.5);
    }
    .el-card__header {
      padding: 5px;
      font-size: 14px;
      .card-header {
        text-align: center;
        height: 20px;
      }
    }

    .el-card__body {
      padding: 5px;
      font-size: 14px;
      .help-item {
        margin-top: 10px;
        .el-tag {
          color: #000;
        }
        .help-content {
          margin-left: 5px;
        }
      }
      .help-exps {
        display: flex;
        .help-exp-content {
          margin-left: 10px;
          .help-exp-content-item .help-exp-content-item-box {
            display: flex;
            padding: 5px;
            .help-exp-content-item-content {
              margin-left: 5px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
