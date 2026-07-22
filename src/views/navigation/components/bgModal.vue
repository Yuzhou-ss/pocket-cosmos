<template>
  <z-modal
    v-model="modalVisible"
    width="668px"
    :show-close="false"
    :is-hover="isHover"
  >
    <template #header>
      <header class="modal-header">
        <div>壁纸</div>
        <div
          class="close"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
          @click="((isHover = false), (modalVisible = false))"
        >
          <el-icon><close /></el-icon>
        </div>
      </header>
    </template>
    <article class="content-wrapper">
      <section class="block">
        <div class="title">自定义</div>
        <div class="upload-container">
          <img :src="currentBg || bg" alt="" height="80" width="97" />
          <div class="intro">
            <div>
              <h3>将你喜欢的图片设为壁纸</h3>
              <div class="desc">支持png、jpg、jpeg格式，最大5MB</div>
            </div>
            <div class="tags">
              <el-upload
                ref="upload"
                class="upload"
                action="#"
                :on-exceed="handleExceed"
                :auto-upload="false"
                :on-change="handleFileChange"
                :show-file-list="false"
                accept="image/png, image/jpeg, image/jpg"
              >
                <template #trigger>
                  <el-tag class="custom-tag">
                    <el-icon><folder-opened /></el-icon>本地图片
                  </el-tag>
                </template>
              </el-upload>
              <el-tag class="custom-tag" @click="urlBgModalRef.open()">
                <el-icon><paperclip /></el-icon>在线链接
              </el-tag>
              <el-tag class="custom-tag btn-tag" @click="onOpenAidraw">
                <el-icon><brush /></el-icon>AI作图<el-icon
                  ><arrow-right
                /></el-icon>
              </el-tag>
            </div>
          </div>
        </div>
      </section>
      <section class="block">
        <div class="title">默认</div>
        <div class="wallpaper-container">
          <div v-for="item in defaultBgList" :key="item">
            <img
              :src="item"
              alt=""
              height="80"
              width="142.22"
              @click="onChangeBg($event)"
              style="border-radius: 5px"
            />
          </div>
        </div>
      </section>
      <section class="block">
        <div class="title">推荐</div>
        <div class="wallpaper-container">
          <div v-for="item in recommendedBgList" :key="item.id">
            <img
              :src="item.url"
              alt=""
              height="80"
              width="142.22"
              @click="onChangeBg($event)"
              style="border-radius: 5px"
            />
          </div>
        </div>
      </section>
    </article>
    <urlBgModal ref="urlBgModalRef" />
  </z-modal>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getRecommendedBg } from "@/api/orther/index";
import { useNavBgStore } from "@/store";
import { storeToRefs } from "pinia";
import bg from "@/assets/images/bg.jpg";
import bg1 from "@/assets/images/bg.png";
import bg2 from "@/assets/images/bg2.png";
import bg3 from "@/assets/images/bg3.png";
import bg4 from "@/assets/images/bg4.png";
import bg5 from "@/assets/images/bg5.png";
import bg6 from "@/assets/images/bg6.png";
import bg7 from "@/assets/images/bg7.jpg";
import urlBgModal from "./urlBgModal.vue";

const defaultBgList = ref([bg, bg1, bg2, bg3, bg4, bg5, bg6, bg7]);
const urlBgModalRef = ref(null);
const navBgStore = useNavBgStore();
const modalVisible = ref(false);
const isHover = ref(false);
const recommendedBgList = ref([]);
const { currentBgSrc } = storeToRefs(navBgStore);
const currentBg = ref(currentBgSrc.value);
const open = () => {
  modalVisible.value = true;
};

// 处理文件选择
const handleFileChange = (file) => {
  const rawFile = file.raw;
  if (!rawFile) return;

  // 验证文件类型
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!validTypes.includes(rawFile.type)) {
    console.error("只支持 PNG、JPG、JPEG 格式的图片");
    return;
  }

  // 验证文件大小 (5MB)
  if (rawFile.size > 5 * 1024 * 1024) {
    console.error("图片大小不能超过 5MB");
    return;
  }

  // 读取文件并预览
  const reader = new FileReader();
  reader.onload = (e) => {
    currentBg.value = e.target.result;
    // 保存到 localStorage及vuex中
    navBgStore.setCurrentBg(currentBg.value);
  };
  reader.readAsDataURL(rawFile);
};

const handleExceed = () => {
  console.warn("只能上传一张图片");
};

// 获取每日推荐背景
const onGetRecommendedBg = () => {
  getRecommendedBg().then((res) => {
    if (Array.isArray(res?.data?.list)) {
      recommendedBgList.value = res?.data?.list;
    }
  });
};

// 更换背景
const onChangeBg = (e) => {
  currentBg.value = e.target.src;
  navBgStore.setCurrentBg(currentBg.value);
};

// 前往AI绘画
const onOpenAidraw = () => {
  window.open(
    "https://www.gaoding.com/create-design?hmsr=limestart-bizhi-limestart--bizhi-bizhi-bdqd&utm_medium=limestart&utm_source=limestart",
    "_blank",
  );
};

onMounted(() => {
  // 初始化时从 localStorage 获取背景
  const savedBg = localStorage.getItem("navigation-bg");
  if (savedBg) {
    currentBg.value = savedBg;
  }
  onGetRecommendedBg();
});

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
.content-wrapper {
  padding: 10px;
  height: 500px;
  overflow-y: auto;
  .block {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    .title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 6px;
    }
    .upload-container {
      display: flex;
      gap: 10px;
      .intro {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }
    }
    .wallpaper-container {
      display: flex;
      gap: 10px;
      overflow: hidden;
      flex-wrap: wrap;
      > div {
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        img {
          transition: all 0.2s linear;
        }
        &:hover {
          img {
            scale: 1.1;
          }
        }
      }
    }
  }
}
.tags {
  margin-top: 6px;
  font-size: 14px;
  .custom-tag {
    color: rgba(0, 0, 0, 0.6);
    background-color: rgba(0, 0, 0, 0.05);
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
  .btn-tag {
    background-color: transparent;
    &:hover {
      color: #70c000;
    }
  }
}
.upload {
  display: inline-block;
  :deep(.el-upload) {
    display: inline-block;
  }
  :deep(.el-upload-list) {
    display: none;
  }
}
</style>
