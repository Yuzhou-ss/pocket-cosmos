<template>
  <z-modal
    v-model="modalVisible"
    width="1000"
    fullscreen
    :show-close="false"
    :is-hover="isHover"
  >
    <template #header>
      <header class="modal-header">
        <div class="panel-title">AI 工具</div>
        <div
          class="close"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
          @click="((isHover = false), (modalVisible = false))"
        >
          <el-icon><Close /></el-icon>
        </div>
      </header>
    </template>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <div
        class="tab-item"
        v-for="(category, index) in aiTools"
        :key="category.name"
        :class="{ active: activeCategory === index }"
        @click="activeCategory = index"
      >
        {{ category.name }}
      </div>
    </div>

    <!-- 工具网格 -->
    <div class="ai-tool-body">
      <Transition name="fade" mode="out-in">
        <div class="tools-grid" :key="activeCategory">
          <div
            class="tool-card"
            v-for="tool in currentTools"
            :key="tool.name"
            @click="navigateTo(tool.url)"
          >
            <div class="tool-icon">
              <img :src="tool.icon" :alt="tool.name" v-if="tool.icon" />
              <span class="icon-placeholder" v-else>{{
                tool.name.slice(0, 1)
              }}</span>
            </div>
            <div class="tool-info">
              <h4 class="tool-name">{{ tool.name }}</h4>
              <p class="tool-description">{{ tool.description }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </z-modal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import qianwen from "@/assets/images/qianwen.png";
import deepseek from "@/assets/images/deepseek.png";
import wenxin from "@/assets/images/wenxin.png";
import xinghuo from "@/assets/images/xinghuo.png";
import hunyuan from "@/assets/images/hunyuan.png";
import doubao from "@/assets/images/doubao.png";
import yuanbao from "@/assets/images/yuanbao.png";
import claude from "@/assets/images/claude.png";
import Gemini from "@/assets/images/Gemini.png";
import chatgpt from "@/assets/images/chatgpt.png";
import Midjourney from "@/assets/images/Midjourney.png";
import Leonardo from "@/assets/images/Leonardo.png";
import stableDiffusion from "@/assets/images/Stable Diffusion.svg";
import raphaelAI from "@/assets/images/Raphael AI.png";
import runway from "@/assets/images/runway.png";
import github from "@/assets/images/github.png";
import zhipu from '@/assets/images/zhipu.png'
import kimi from '@/assets/images/kimi.png'
import trae from "@/assets/images/trae.png"
import cursor from "@/assets/images/cursor.png"
import hailuo from '@/assets/images/hailuo.png'
import coze from '@/assets/images/coze.png'
import nami from '@/assets/images/nami.png'
import jimeng from '@/assets/images/jimeng.png'
import keling from '@/assets/images/keling.png'
import vidu from '@/assets/images/vidu.png'
import mita from '@/assets/images/mita.ico'
import haimian from '@/assets/images/haimian.png'
import tiangong from '@/assets/images/tiangong.svg'

const modalVisible = ref(false);
const isHover = ref(false);
const activeCategory = ref(0);

interface AiTool {
  name: string;
  url: string;
  description: string;
  icon?: string;
}

interface AiToolCategory {
  name: string;
  tools: AiTool[];
}

const aiTools: AiToolCategory[] = [
  {
    name: "对话大模型",
    tools: [
      {
        name: "通义千问",
        url: "https://tongyi.aliyun.com/qianwen/",
        description: "阿里云超大规模语言模型",
        icon: qianwen,
      },
      {
        name: "DeepSeek",
        url: "https://www.deepseek.com/",
        description: "深度求索开源大语言模型",
        icon: deepseek,
      },
      {
        name: "Kimi",
        url: "https://kimi.moonshot.cn/",
        description: "月之暗面推出的长上下文AI助手",
        icon: kimi,
      },
      {
        name: "文心一言",
        url: "https://yiyan.baidu.com/",
        description: "百度大语言模型",
        icon: wenxin,
      },
      {
        name: "智谱清言",
        url: "https://chatglm.cn/",
        description: "智谱AI基于GLM模型的AI助手",
        icon: zhipu
      },
      {
        name: "讯飞星火",
        url: "https://xinghuo.xfyun.cn/",
        description: "科大讯飞认知大模型",
        icon: xinghuo,
      },
      {
        name: "豆包",
        url: "https://www.doubao.com/",
        description: "字节跳动多功能AI助手",
        icon: doubao,
      },
      {
        name: "腾讯元宝",
        url: "https://yuanbao.tencent.com/",
        description: "腾讯一站式AI助手",
        icon: yuanbao,
      },
      {
        name: "腾讯混元",
        url: "https://hunyuan.tencent.com/",
        description: "腾讯大型人工智能模型",
        icon: hunyuan,
      },
      {
        name: "ChatGPT",
        url: "https://chatgpt.com/",
        description: "OpenAI 对话式AI助手",
        icon: chatgpt,
      },
      {
        name: "Claude",
        url: "https://claude.ai/",
        description: "Anthropic AI 助手",
        icon: claude,
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com/",
        description: "Google 对话式AI助手",
        icon: Gemini,
      },
    ],
  },
  {
    name: "AI编程",
    tools: [
      {
        name: "GitHub Copilot",
        url: "https://github.com/features/copilot",
        description: "AI结对编程工具",
        icon: github,
      },
      {
        name: "Cursor",
        url: "https://www.cursor.com/",
        description: "AI驱动的代码编辑器",
        icon: cursor,
      },
      {
        name: "通义灵码",
        url: "https://lingma.aliyun.com/",
        description: "阿里云代码理解与生成工具",
        icon: qianwen
      },
      {
        name: "Trae",
        url: "https://www.trae.ai/",
        description: "字节跳动AI编程IDE",
        icon: trae
      },
      {
        name: "CodeGeeX",
        url: "https://codegeex.cn/",
        description: "智谱AI代码生成模型",
        icon: zhipu
      },
      {
        name: "文心快码",
        url: "https://comate.baidu.com/",
        description: "百度AI编程助手",
        icon: wenxin
      },
    ],
  },
  {
    name: "AI绘图",
    tools: [
      {
        name: "通义万相",
        url: "https://wanxiang.aliyun.com/",
        description: "阿里云AI艺术创作大模型",
        icon: qianwen
      },
      {
        name: "即梦",
        url: "https://jimeng.jianying.com/",
        description: "字节跳动AI图像创作平台",
        icon: jimeng
      },
      {
        name: "文心一格",
        url: "https://yige.baidu.com/",
        description: "百度AI艺术创作平台",
        icon: wenxin
      },
      {
        name: "Midjourney",
        url: "https://www.midjourney.com/",
        description: "AI图像生成工具",
        icon: Midjourney,
      },
      {
        name: "Stable Diffusion",
        url: "https://stability.ai/",
        description: "开源AI图像生成模型",
        icon: stableDiffusion,
      },
      {
        name: "Leonardo.AI",
        url: "https://leonardo.ai/",
        description: "AI图像生成平台",
        icon: Leonardo,
      },
      {
        name: "Raphael AI",
        url: "https://raphael.ai/",
        description: "免费AI图像生成工具",
        icon: raphaelAI,
      },
    ],
  },
  {
    name: "AI视频",
    tools: [
      {
        name: "可灵",
        url: "https://kling.kuaishou.com/",
        description: "快手AI视频生成大模型",
        icon: keling,
      },
      {
        name: "即梦AI",
        url: "https://jimeng.jianying.com/ai-video",
        description: "字节跳动AI视频生成",
        icon: jimeng,
      },
      {
        name: "Vidu",
        url: "https://www.vidu.studio/",
        description: "生数科技AI视频生成模型",
        icon: vidu,
      },
      {
        name: "海螺AI",
        url: "https://hailuoai.video/",
        description: "MiniMax AI视频生成",
        icon: hailuo,
      },
      {
        name: "智谱清影",
        url: "https://chatglm.cn/video",
        description: "智谱AI视频生成工具",
        icon: zhipu,
      },
      {
        name: "Runway",
        url: "https://runwayml.com/",
        description: "AI视频编辑和创意平台",
        icon: runway,
      },
    ],
  },
  {
    name: "AI音频",
    tools: [
      {
        name: "天工SkyMusic",
        url: "https://www.tiangong.cn/music",
        description: "昆仑万维AI音乐生成",
        icon: tiangong
      },
      {
        name: "海绵音乐",
        url: "https://www.haimian.com/music",
        description: "字节跳动AI音乐创作",
        icon: haimian
      },
      {
        name: "通义听悟",
        url: "https://tingwu.aliyun.com/",
        description: "语音转文字、会议记录专家",
        icon: qianwen
      }
    ],
  },
  {
    name: "AI搜索",
    tools: [
      {
        name: "秘塔AI搜索",
        url: "https://metaso.cn/",
        description: "无广告AI搜索引擎",
        icon: mita
      },
      {
        name: "360AI搜索",
        url: "https://so.360.com/",
        description: "360旗下AI搜索引擎",
        icon: nami
      },
      {
        name: "天工AI搜索",
        url: "https://www.tiangong.cn/",
        description: "昆仑万维AI搜索",
        icon: tiangong
      },
    ],
  },
  {
    name: "AI智能体",
    tools: [
      {
        name: "扣子Coze",
        url: "https://www.coze.cn/",
        description: "字节跳动AI智能体开发平台",
        icon: coze,
      },
      {
        name: "文心智能体",
        url: "https://agents.baidu.com/",
        description: "百度AI智能体平台",
        icon: wenxin,
      },
    ],
  },
];

const currentTools = computed(() => aiTools[activeCategory.value]?.tools || []);

const navigateTo = (url: string) => {
  window.open(url, "_blank");
};

const open = () => {
  activeCategory.value = 0;
  modalVisible.value = true;
};

defineExpose({ open });
</script>

<script lang="ts">
export default {
  name: "AiTool",
};
</script>

<style scoped lang="scss">
.modal-header {
  text-align: center;
  position: relative;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;

  .panel-title {
    font-size: 20px;
    font-weight: 700;
    color: #303133;
  }

  .close {
    position: absolute;
    right: 0;
    cursor: pointer;
    transition:
      background-color 0.25s,
      opacity 0.25s;
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

/* 分类标签 */
.category-tabs {
  display: flex;
  gap: 8px;
  padding: 4px 0 16px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0;
  }

  .tab-item {
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    color: #606266;
    border: 1px solid #e4e7ed;
    transition: all 0.25s;

    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background: #ecf5ff;
    }

    &.active {
      background: linear-gradient(135deg, #409eff, #337ecc);
      color: #fff;
      border-color: transparent;
      box-shadow: 0 2px 8px rgba(64, 158, 255, 0.35);
    }
  }
}

/* 内容区 */
.ai-tool-body {
  max-height: 65vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c0c4cc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

/* 工具网格 */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

/* 工具卡片 */
.tool-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  .tool-icon {
    width: 48px;
    height: 48px;
    margin-right: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .icon-placeholder {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .tool-info {
    flex: 1;
    min-width: 0;

    .tool-name {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #303133;
    }

    .tool-description {
      font-size: 13px;
      color: #909399;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/* 分类切换过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
