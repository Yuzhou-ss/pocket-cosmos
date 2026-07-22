<template>
  <div id="terminal">
    <terminal
      name="my-terminal"
      @execCmd="onExecCmd"
      class="my-terminal"
      :command-store="commandList"
      :init-log="intLog"
      :title="`${getTimeState()} ${nickname || '先生'}`"
      show-header
      :style="dragConf"
      context="/zx-terminal"
    >
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
                    <div>
                      <el-tag effect="light">dcs{{ index + 1 }}</el-tag>
                    </div>
                    <div>
                      <p class="help-exp-content-item-content">{{ exp.des }}</p>
                    </div>
                  </div>
                  <div class="help-exp-content-item-box">
                    <div>
                      <el-tag effect="light" type="success"
                        >cmd{{ index + 1 }}</el-tag
                      >
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
    <!-- <SuspendedMenu /> -->
     <windowsTerminal v-if="showWindowsTerminal" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from "vue";
import { commands, keyList } from "./commands";
import { useRouter } from "vue-router";
import { commandList } from "./commandList";
import moment from "moment";
import { type msgType } from "./type";
import { getUserConfig } from "@/api";
import { useUserStore } from "@/store";
const userStore = useUserStore();
const router = useRouter();
let goLoginBtn;
import { dateDiff, getTimeState } from "@/utils/time";
import fengche from "@/assets/images/fengche.png";
import aixin from "@/assets/images/aixin.png";
import windowsTerminal from "@/components/windows-terminal.vue";
import bus from "@/utils/bus";

const intLog: msgType[] = [
  {
    type: "html",
    content: `<div style='border: 1px solid rgb(255,255,0); display: inline-block; padding: 40px 50px; border-left-style: dashed; border-right-style: dashed; border-radius: 5px'>
        <p style='text-align: center; padding: 10px 0; font-family: dianying; display: flex; align-items: center; justify-content: center'>你好哇！<img src=${aixin} alt='' style='height: 20px; margin-right: 10px' class='jittery'></img> 这里是剩饭小站✋</p>
        <p style='text-align: center; padding: 10px 0; font-family: dianying'>小站开始运行于：<span style='color:rgb(255,255,0)'>2025年11月03日</span>，距今已过去<span style='color: rgb(255,255,0)'>${dateDiff(
          "2025-11-03"
        )}</span></p>
        <p style='text-align: center; padding: 10px 0; font-family: dianying; display: flex; align-items: center; justify-content: center'><img src=${fengche} alt='' style='height: 20px' class='rotateImg'></img>欢迎访问本站</p>
      </div>`,
  },
  {
    type: "normal",
    class: "success",
    tag: "System",
    content: "终端正在初始化...",
  },
  {
    type: "normal",
    class: "success",
    tag: "System",
    content: `访问时间 ${moment().format("YYYY-MM-DD HH:mm:ss")}.`,
  },
  {
    type: "normal",
    class: "success",
    tag: "System",
    content: `欢迎访问<span style="color:rgb(255,255,0);font-weight:1000"> 余粥 </span>开发的自定义web终端，如果你是第一次使用，执行 <span style="color:rgb(255,255,0);font-weight:1000">help</span> 命令获取帮助`,
  },
];

const dragConf = ref({
  width: "70%",
  height: "85%",
  position: "absolute",
  left: "15%",
  top: "7.5%",
});

const defaultSearch = ref(null);
const showWindowsTerminal = ref(false)
const getConfig = async (app: any) => {
  if (!userStore.$state.username) {
    return;
  }
  try {
    const result: any = await getUserConfig(userStore.$state.username);
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

onMounted(async () => {
  bus.on('show-windows-terminal', (val) => {
    showWindowsTerminal.value = val as boolean
  })
  const app = document.getElementsByClassName("terminal-container")[0];
  getConfig(app);
  if (localStorage.getItem("nickname")) {
    ElNotification({
      title: "欢迎访问",
      message: `您好，${localStorage.getItem("nickname")}！`,
      type: "success",
    });
  } else {
    ElNotification({
      title: "欢迎访问",
      message: `哈喽先生！点击<el-button type="text" size="mini" style="color:rgb(121,187,255);cursor:pointer" id="goLoginBtn"> 此处 </el-button>登录/注册！本应用提供了命令行形式的登录方式，输入<span style="display:inline-block;padding:0 5px;color:#0065ff;background-color:#c6e2ff">login</span>体验！`,
      type: "success",
      dangerouslyUseHTMLString: true,
    });
  }
  goLoginBtn = document.getElementById("goLoginBtn");
  goLoginBtn?.addEventListener("click", () => {
    router.push("/yuzhou/login");
  });
});

const nickname = computed(() => {
  return userStore.$state.nickname;
});

userStore.$subscribe(async (mutation, state) => {
  if (state.username) {
    let username: string | null = localStorage.getItem("username");
    try {
      const result: any = await getUserConfig(username);
      if (result.status === 1) {
        if (result.data.defaultSearch) {
          defaultSearch.value = result.data.defaultSearch;
        }
        if (result.data.bgImgUrl) {
          const app = document.getElementsByClassName("terminal-container")[0];
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

const onExecCmd = (
  key: any,
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

  if (!keyList.includes(key.toLowerCase())) {
    if (defaultSearch.value && defaultSearch.value !== "null") {
      command = originCommand;
      key = defaultSearch.value;
    } else {
      return failed(
        `命令 <span style="font-weight:1000;color:rgb(255,255,0)">${key}</span> 不存在`
      );
    }
  }
  // 执行对应的回调
  commands.find((item) => {
    if (key === item.key || key.toLowerCase() === item.key) {
      item.callback(command.toLowerCase(), success, failed);
    }
  });
};

onUnmounted(() => {
  bus.off('show-windows-terminal')
});
</script>

<style scoped lang="scss">
@import url(./index.scss);
</style>
