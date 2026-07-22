<template>
  <z-modal
    v-model="modalVisible"
    width="700px"
    :show-close="false"
    :is-hover="isHover"
  >
    <template #header>
      <header class="modal-header">
        <div>测试工具</div>
        <div
          class="close"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
          @click="(isHover = false), (modalVisible = false)"
        >
          <el-icon><close /></el-icon>
        </div>
      </header>
    </template>
    <article class="tool-wrapper">
      <div
        v-for="el in toolList"
        :key="el.url"
        class="tool-item"
        @click="onOpenWindow(el.url)"
      >
        <div class="content">
          <img :src="el.icon" alt="" height="48" width="48" />
          <div class="info">
            <h3>{{ el.name }}</h3>
            <div class="desc">{{ el.desc }}</div>
          </div>
        </div>
        <div class="tags">
          <el-tag v-for="tag in el.tags" :key="tag" class="custom-tag">
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </article>
  </z-modal>
</template>

<script setup>
import { ref } from "vue";
import jiraIcon from "@/assets/images/jira-logo.png";
import confIcon from "@/assets/images/conf-logo.png";
import platformIcon from "@/assets/images/test-platform.png";
import pixioIcon from "@/assets/images/pixio-logo.png";
import timeIcon from "@/assets/images/timetool.png";
import jsonIcon from "@/assets/images/json.png";
import pwdIcon from "@/assets/images/pwd.png";
import postmanIcon from "@/assets/images/postman.png";
import apifoxIcon from "@/assets/images/apifox.png";

const modalVisible = ref(false);
const isHover = ref(false);
const toolList = ref([
  {
    name: "时间戳转换器",
    url: "https://www.jyshare.com/front-end/852/",
    desc: "在线时间戳-时间转换工具",
    icon: timeIcon,
    tags: ["时间戳", "转换工具"],
  },
  {
    name: "JSON格式化工具",
    url: "https://www.jyshare.com/front-end/53/",
    desc: "JSON格式化、压缩",
    icon: jsonIcon,
    tags: ["JSON", "格式化", "压缩"],
  },
  {
    name: "随机密码生成器",
    url: "https://www.jyshare.com/front-end/686/",
    desc: "根据选定规则随机生成密码",
    icon: pwdIcon,
    tags: ["密码", "生成工具"],
  },
  {
    name: "Postman",
    url: "https://www.postman.com/",
    desc: "API开发测试与调试工具",
    icon: postmanIcon,
    tags: ["接口调试"],
  },
  {
    name: "Api Fox",
    url: "https://apifox.com/",
    desc: "API设计、开发、测试一体化协作平台",
    icon: apifoxIcon,
    tags: ["接口调试"],
  },
  {
    name: "移动云测试平台",
    url: "http://utp.cmss.com/dashboard",
    desc: "测试用例编写、执行、管理平台",
    icon: platformIcon,
    tags: ["测试平台", "云能定制"],
  },
  {
    name: "JIRA-云能",
    url: "http://jira.cmss.com/secure/Dashboard.jspa",
    desc: "项目与事务跟踪管理平台",
    icon: jiraIcon,
    tags: ["缺陷管理", "云能定制"],
  },
  {
    name: "Confluence",
    url: "http://conf.cmss.com/#all-updates",
    desc: "团队文档协作与知识管理平台",
    icon: confIcon,
    tags: ["文档协作", "周报", "云能定制"],
  },
  {
    name: "Pixso",
    url: "http://pixso.cmss.com/",
    desc: "设计协作与原型制作工具",
    icon: pixioIcon,
    tags: ["原型设计", "云能定制"],
  },
]);

const onOpenWindow = (url) => {
  window.open(url, "_blank");
};
const open = () => {
  modalVisible.value = true;
};

defineExpose({
  open,
});
</script>
<script>
export default {};
</script>

<style lang="scss" scoped>
.modal-header {
  text-align: center;
  position: relative;
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  .close {
    position: absolute;
    right: 0;
    cursor: pointer;
    transition: background-color 0.25s, opacity 0.25s;
    border-radius: 5px;
    height: 44px;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
.tool-wrapper {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  height: 500px;
  overflow-y: auto;
  padding: 5px;
  .tool-item {
    box-sizing: border-box;
    width: calc((100% - 10px) / 2);
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    text-decoration: none;
    padding: 10px;
    transition: background-color 0.25s, opacity 0.25s;
    cursor: pointer;
    &:hover {
      background: rgb(250, 250, 250);
    }
    .content {
      display: flex;
      gap: 8px;
      .info {
        h3: {
          color: black;
          font-size: 14px;
          font-size: 700;
        }
        .desc {
          color: rgba(0, 0, 0, 0.6);
          font-size: 12px;
        }
      }
    }
    .tags {
      margin-top: 6px;
      .custom-tag {
        color: rgba(0, 0, 0, 0.6);
        background-color: rgba(0, 0, 0, 0.05);
        border: none;
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
