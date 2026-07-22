<template>
  <div class="quick-links">
    <div
      class="link-item"
      v-for="el in toolsList"
      :key="el.key"
      @mouseenter="hoveredItem = el.key"
      @mouseleave="hoveredItem = ''"
      @click="el.clickFunction"
    >
      <div class="img-box">
        <img :src="el.image" alt="" />
      </div>
      <div class="tooltip" v-show="hoveredItem === el.key">
        {{ el.name }}
      </div>
    </div>
  </div>
  <!-- 测试工具弹窗 -->
  <tools-modal ref="toolsModalRef" />
  <bg-modal ref="bgModalRef" />
  <pictureHandleTools ref="pictureToolsRef" />
  <media ref="mediaRef" />
  <quickModalNew ref="quickModalRef" />
  <aiTool ref="aiToolRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ai from "@/assets/images/chatgpt.png";
import musicIcon from "@/assets/images/music.png";
import pictureIcon from "@/assets/images/picture.png";
import toolsIcon from "@/assets/images/tools.png";
import quickIcon from "@/assets/images/quick.png";
import translateIcon from "@/assets/images/translate.png";
import pictureHandleIcon from "@/assets/images/pictureHandle.png";
import tv from "@/assets/images/tv.png";
import toolsModal from "./toolsModal.vue";
import bgModal from "./bgModal.vue";
import pictureHandleTools from "./pictureHandleTools.vue";
import media from "./media.vue";
import quickModalNew from "./quickModalNew.vue";
import aiTool from "./aiTool.vue";

interface ToolsModalExpose {
  open: () => void;
}

// 添加响应式变量来跟踪当前悬停的项目
const hoveredItem = ref("");
const toolsModalRef = ref<
  (InstanceType<typeof toolsModal> & ToolsModalExpose) | null
>(null);
const bgModalRef = ref<
  (InstanceType<typeof bgModal> & ToolsModalExpose) | null
>(null);
const pictureToolsRef = ref<
  (InstanceType<typeof pictureHandleTools> & ToolsModalExpose) | null
>(null);
const quickModalRef = ref<
  (InstanceType<typeof quickModalNew> & ToolsModalExpose) | null
>(null);
const mediaRef = ref<(InstanceType<typeof media> & ToolsModalExpose) | null>(
  null,
);
const aiToolRef = ref<(InstanceType<typeof aiTool> & ToolsModalExpose) | null>(
  null,
);

const toolsList = [
  {
    key: "quick",
    image: quickIcon,
    name: "快捷入口",
    clickFunction: () => {
      quickModalRef.value?.open();
    },
  },
  {
    key: "tools",
    image: toolsIcon,
    name: "测试工具",
    clickFunction: () => {
      toolsModalRef.value?.open();
    },
  },
  {
    key: "media",
    image: tv,
    name: "媒体娱乐",
    clickFunction: () => {
      mediaRef.value?.open();
    },
  },
  {
    key: "translate",
    image: translateIcon,
    name: "翻译",
    clickFunction: () => {
      window.open("https://fanyi.baidu.com/", "_blank");
    },
  },
  {
    key: "picture",
    image: pictureIcon,
    name: "壁纸",
    clickFunction: () => {
      bgModalRef.value?.open();
    },
  },
  // {
  //   key: "music",
  //   image: musicIcon,
  //   name: "yuzhou-在线音乐",
  //   clickFunction: () => {
  //     window.open(
  //       "http://121.36.205.18:8080/music/#/zzx/music/playlist",
  //       "_blank"
  //     );
  //   },
  // },
  {
    key: "ai",
    image: ai,
    name: "AI工具",
    clickFunction: () => {
      aiToolRef.value?.open();
    },
  },
  {
    key: "pictureHandle",
    image: pictureHandleIcon,
    name: "图片工具",
    clickFunction: () => {
      pictureToolsRef.value?.open();
    },
  },
];
</script>

<style lang="scss" scoped>
/* 快速链接 */
.quick-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  position: absolute;
  width: 100%;
  bottom: 100px;
}

.link-item {
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 10px;
  position: relative; // 为 tooltip 定位做准备
  box-shadow: #0003 0 0 10px;
  cursor: pointer;
  .img-box {
    padding: 4px 8px;
    background-color: #fff;
    border-radius: 15px;
    img {
      height: 20px;
      width: auto;
    }
  }

  .tooltip {
    position: absolute;
    top: -40px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 10;
    box-shadow: #0003 0 0 10px;
  }
}

.link-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}
</style>
