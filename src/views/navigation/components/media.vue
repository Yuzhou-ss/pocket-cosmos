<template>
  <z-modal
    v-model="modalVisible"
    :show-close="false"
    :is-hover="isHover"
    :width="700"
  >
    <template #header>
      <header class="modal-header">
        <div>媒体娱乐</div>
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
      <mediaCard v-for="item in mediaList" :key="item.key" :media-info="item" />
    </article>
  </z-modal>
</template>

<script setup>
import { ref } from "vue";
import mediaCard from "@/components/mediaCard.vue";
import txsp from "@/assets/images/txsp.png";
import bilibili from "@/assets/images/bilibili.png";
import youku from "@/assets/images/youku.png";
import mangguo from "@/assets/images/mangguo.png";
import movie from "@/assets/images/movie.svg";
import jilupian from "@/assets/images/jilupian.svg";
import history from "@/assets/images/history.svg";
import sports from "@/assets/images/sport.svg";
import dongman from "@/assets/images/dongman.svg";
import tv from "@/assets/images/tv.svg";
import zongyi from "@/assets/images/tv.svg";
import fanju from "@/assets/images/fanju.svg";
import guichu from "@/assets/images/guichu.svg";
import zhibo from "@/assets/images/zhibo.svg";
import vip from "@/assets/images/vip.svg";

const modalVisible = ref(false);
const isHover = ref(false);
const mediaList = ref([
  {
    key: 1,
    name: "腾讯视频",
    logo: txsp,
    link: "https://v.qq.com/channel/choice",
    upper: [
      {
        key: "1-1",
        name: "电视剧",
        logo: tv,
        link: "https://v.qq.com/channel/tv",
      },
      {
        key: "1-2",
        name: "电影",
        logo: movie,
        link: "https://v.qq.com/channel/movie",
      },
      {
        key: "1-3",
        name: "综艺",
        logo: zongyi,
        link: "https://v.qq.com/channel/variety",
      },
    ],
    lower: [
      {
        key: "1-4",
        name: "动漫",
        logo: dongman,
        link: "https://v.qq.com/channel/cartoon",
      },
      {
        key: "1-5",
        name: "体育",
        logo: sports,
        link: "https://v.qq.com/channel/sports_new",
      },
      {
        key: "1-6",
        name: "历史",
        logo: history,
        link: "https://v.qq.com/biu/u/history/?selectTab=history&subTabId=all",
      },
    ],
  },
  {
    key: 2,
    name: "哔哩哔哩",
    logo: bilibili, // 需要导入哔哩哔哩logo
    link: "https://www.bilibili.com/",
    upper: [
      {
        key: "2-1",
        name: "电视剧",
        logo: tv, // 需要导入番剧图标
        link: "https://www.bilibili.com/tv",
      },
      {
        key: "2-2",
        name: "电影",
        logo: movie, // 需要导入国创图标
        link: "https://www.bilibili.com/movie",
      },
      {
        key: "2-3",
        name: "综艺",
        logo: zongyi,
        link: "https://www.bilibili.com/variety/",
      },
    ],
    lower: [
      {
        key: "2-4",
        name: "番剧",
        logo: fanju, // 需要导入舞蹈图标
        link: "https://www.bilibili.com/anime",
      },
      {
        key: "2-5",
        name: "直播",
        logo: zhibo, // 需要导入音乐图标
        link: "https://live.bilibili.com/",
      },
      {
        key: "2-6",
        name: "鬼畜",
        logo: guichu, // 需要导入科技图标
        link: "https://www.bilibili.com/c/kichiku/",
      },
    ],
  },
  {
    key: 3,
    name: "优酷视频",
    logo: youku, // 需要导入优酷logo
    link: "https://www.youku.com/",
    upper: [
      {
        key: "3-1",
        name: "电视剧",
        logo: tv,
        link: "https://www.youku.com/ku/webtv",
      },
      {
        key: "3-2",
        name: "电影",
        logo: movie,
        link: "https://www.youku.com/ku/webmovie",
      },
      {
        key: "3-3",
        name: "综艺",
        logo: zongyi,
        link: "https://www.youku.com/ku/webvariety",
      },
    ],
    lower: [
      {
        key: "3-4",
        name: "动漫",
        logo: dongman,
        link: "https://www.youku.com/ku/webcomic",
      },
      {
        key: "3-5",
        name: "纪录片",
        logo: jilupian,
        link: "https://www.youku.com/ku/webdocumentary",
      },
      {
        key: "3-6",
        name: "体育",
        logo: sports,
        link: "https://www.youku.com/ku/tiyu",
      },
    ],
  },
  {
    key: 4,
    name: "芒果TV",
    logo: mangguo, // 需要导入芒果TV logo
    link: "https://www.mgtv.com/",
    upper: [
      {
        key: "4-1",
        name: "电视剧",
        logo: tv,
        link: "https://www.mgtv.com/tv/",
      },
      {
        key: "4-2",
        name: "电影",
        logo: movie,
        link: "https://www.mgtv.com/movie/",
      },
      {
        key: "4-3",
        name: "综艺",
        logo: zongyi,
        link: "https://www.mgtv.com/show/",
      },
    ],
    lower: [
      {
        key: "4-4",
        name: "动漫",
        logo: dongman,
        link: "https://www.mgtv.com/cartoon/",
      },
      {
        key: "4-5",
        name: "纪录片",
        logo: jilupian,
        link: "https://www.mgtv.com/doc/",
      },
      {
        key: "4-6",
        name: "会员",
        logo: vip, // 需要导入少儿图标
        link: "https://www.mgtv.com/vip/",
      },
    ],
  },
]);

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
  max-height: 500px;
  overflow-y: auto;
  padding: 65px 10px;
  align-items: center;
  justify-content: center;
  .media-item {
    height: 100px;
    width: 100px;
  }
  .media-content {
    height: 50px;
    width: 50px;
    border-radius: 16px;
  }
}
</style>
