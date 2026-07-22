<template>
  <z-modal
    v-model="modalVisible"
    width="700px"
    :show-close="false"
    :is-hover="isHover"
  >
    <template #header>
      <header class="modal-header">
        <div>图片工具</div>
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
    <header class="tags">
      <el-tag
        class="custom-tag"
        :class="currentType === 'pictureHandle' ? 'active-tag' : ''"
        @click="currentType = 'pictureHandle'"
      >
        <svg-icon
          :name="
            currentType === 'pictureHandle'
              ? 'pictureHandle'
              : 'pictureHandleActive'
          "
          class="icon"
          style="height: 20px; width: 20px"
          color="red"
        ></svg-icon>
        <span>图片处理</span></el-tag
      >
      <el-tag
        class="custom-tag"
        :class="currentType === 'aiDraw' ? 'active-tag' : ''"
        @click="currentType = 'aiDraw'"
      >
        <svg-icon
          :name="currentType === 'aiDraw' ? 'aiDraw' : 'aiDrawActive'"
          class="icon"
          font-size="18"
          color="red"
        ></svg-icon>
        <span>AI绘图</span></el-tag
      >
    </header>
    <article>
      <div class="tool-wrapper">
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
      </div>
    </article>
  </z-modal>
</template>

<script setup>
import { computed, ref } from "vue";
import docsmall from "@/assets/images/docsmall.png";
import compressjpeg from "@/assets/images/compressjpeg.png";
import tinypng from "@/assets/images/tinypng.png";
import iLoveIMG from "@/assets/images/iLoveIMG.png";
import convertio from "@/assets/images/convertio.png";
import removebg from "@/assets/images/remove.bg.svg";
import stableDiffusion from "@/assets/images/Stable Diffusion.svg";
import toolfk from "@/assets/images/toolfk.png";
import raphaelAI from '@/assets/images/Raphael AI.png'
import kehua from '@/assets/images/kehua.svg'
import doubao from '@/assets/images/doubao.png'

const modalVisible = ref(false);
const isHover = ref(false);
const currentType = ref("pictureHandle");
const pictureHandleTools = ref([
  {
    name: "TinyPNG",
    url: "https://tinypng.com/cn/",
    desc: "智能压缩PNG/JPG/WebP，单次最多20张，每张≤5MB",
    icon: tinypng,
    tags: ["免费", "智能压缩", "批量处理"],
  },
  {
    name: "iLoveIMG",
    url: "https://www.iloveimg.com/zh-cn",
    desc: "可批量编辑图片 的所有工具",
    icon: iLoveIMG,
    tags: ["免费", "批量处理", "图片编辑", "背景去除"],
  },
  {
    name: "CompressJPEG",
    url: "https://compressjpeg.online/",
    desc: "自定义图片压缩、大小调整",
    icon: compressjpeg,
    tags: ["免费", "自定义压缩"],
  },
  {
    name: "Docsmall",
    url: "https://docsmall.com/",
    desc: "免费的在线图片与 PDF 处理工具",
    icon: docsmall,
    tags: ["免费", "智能擦除", "PDF处理", "PDF格式转换"],
  },
  {
    name: "Remove.bg",
    url: "https://www.remove.bg/",
    desc: "专业的图片背景消除和智能擦除工具",
    icon: removebg,
    tags: ["免费", "智能擦除", "自动抠图"],
  },
  {
    name: "Convertio",
    url: "https://convertio.co/zh/",
    desc: "将您的文件转换成任意格式",
    icon: convertio,
    tags: ["免费", "格式转换"],
  },
]);

const aiDrawTools = [
  {
    name: "豆包",
    url: "https://www.doubao.com/chat/",
    desc: "字节旗下Ai助手",
    icon: doubao,
    tags: ["免费", "对话", "AI生成"],
  },
  {
    name: "Stable Diffusion",
    url: "https://stabledifffusion.com/",
    icon: stableDiffusion,
    desc: "免费开源、文字生成图像的AI绘画工具",
    tags: ["免费", "AI绘画工具"],
  },
  {
    name: "Raphael AI",
    url: "https://raphael.app/zh",
    desc: "在几秒钟内创建令人惊叹的 AI 生成图像",
    icon: raphaelAI,
    tags: ["免费", "AI生成"],
  },
  {
    name: "可画",
    url: "https://www.canva.cn/",
    desc: "海量模板的在线设计工具，操作简单",
    icon: kehua,
    tags: ["在线设计", "图片生成"],
  },
  {
    name: "TOOLFK",
    url: "https://www.toolfk.com/",
    desc: "邪修工具合集网站",
    icon: toolfk,
    tags: ["免费", "工具合集"],
  },
];

const toolList = computed(() => {
  return currentType.value === "pictureHandle"
    ? pictureHandleTools.value
    : aiDrawTools;
});

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
.tags {
  padding: 0 5px;
  margin-bottom: 12px;
  .custom-tag {
    color: rgba(0, 0, 0, 0.6);
    background-color: rgba(0, 0, 0, 0.05);
    border: none;
    cursor: pointer;
    transition: background-color 0.2s linear;
    &:not(:last-child) {
      margin-right: 5px;
    }
    :deep(.el-tag__content) {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .active-tag {
    background-color: #70c000;
    color: #fff;
    transition: background-color 0.2s linear;
  }
}
article {
  padding: 5px;
  max-height: 500px;
  overflow-y: auto;
  .title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 6px;
  }
  .tool-wrapper {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
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
}
</style>
