<template>
  <div class="nav-container" id="nav-container" ref="containerRef">
    <div
      class="background"
      :class="[isFocus ? 'blur-active' : '', bgLoaded ? 'bg-loaded' : '']"
      :style="{ backgroundImage: `url(${displayBgSrc})` }"
      ref="backgroundRef"
    ></div>
    <div class="blur-overlay" v-if="isFocus"></div>

    <div class="container">
      <div class="time">{{ currentTime }}</div>
      <div
        class="search-container"
        :class="isFocus ? '' : 'blur-search-container'"
        @focus="onFocus"
        @blur="onBlur"
        tabindex="0"
      >
        <el-dropdown trigger="click" placement="bottom-start" v-if="isFocus">
          <div class="icon-wrapper">
            <svg-icon :name="currentSearchInfo.icon" class="icon"></svg-icon>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="el in searchEngines"
                :key="el.key"
                @click="onSelcetSearch(el)"
              >
                <svg-icon
                  :name="el.icon"
                  class="icon"
                  style="margin-right: 5px"
                />
                {{ el.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-input
          type="text"
          class="search-input"
          :placeholder="isFocus ? '' : '搜索'"
          v-model="searchText"
          @focus="onFocus"
          @blur="onBlur"
          @keyup.enter="onSearch"
        />

        <div class="icon-wrapper" @click="onSearch" v-if="isFocus">
          <svg-icon name="search" class="icon" color="#70c000"></svg-icon>
        </div>
      </div>
    </div>
    <Tools />
    <div
      class="weather-panel-wrapper"
      :class="{ collapsed: !isWeatherPanelVisible }"
    >
      <transition name="slide-fade">
        <div v-show="isWeatherPanelVisible" class="weather-content">
          <weatherRadio
            style="transform: scale(0.5)"
            v-model="weather"
            class="weather-radio"
          />
        </div>
      </transition>
      <el-tooltip content="更换天气效果">
        <div class="weather-toggle-btn" @click="toggleWeatherPanel">
          <img :src="weatherMap[weather]" alt="" height="20" width="20" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useSearchStore, useNavBgStore } from "@/store";
import { storeToRefs } from "pinia";
import Tools from "./components/tools.vue";
import defaultBgThumb from "@/assets/images/bg7-thumb.webp";
import defaultBg from "@/assets/images/bg7.webp";
import weatherRadio from "@/components/weatherRadio.vue";
import { useWeather } from "@/hooks";
import snow from "@/assets/icons/snow.svg";
import rain from "@/assets/icons/rain.svg";
import nothing from "@/assets/icons/nothing.svg";
import flower from "@/assets/icons/flower.svg";
import bus from "@/utils/bus";

const weatherMap = {
  nothing,
  rain,
  snow,
  flower,
};

const { setWeather, stopWeather } = useWeather("nav-container");
const searchStore = useSearchStore();
const navBgStore = useNavBgStore();
const { searchEngines, currentSearchInfo } = storeToRefs(searchStore);
const { currentBgSrc } = storeToRefs(navBgStore);

const containerRef = ref(null);
const backgroundRef = ref(null);
const searchText = ref("");
const isFocus = ref(false);
const currentTime = ref("");
const timer = ref(null);
const weather = ref(localStorage.getItem("weather") || "flower");
const isWeatherPanelVisible = ref(false);
const bgLoaded = ref(false);
const displayBgSrc = ref(defaultBgThumb); // 初始显示压缩版
const isHighResLoaded = ref(false); // 标记高清图是否已加载

// 渐进式预加载背景图片：先显示压缩版，再加载高清版
const preloadBg = (src) => {
  // 立即显示压缩版背景
  bgLoaded.value = true;
  displayBgSrc.value = defaultBgThumb;
  isHighResLoaded.value = false;

  const highResSrc = src || defaultBg;

  // 如果高清版已经在缓存中，直接显示
  if (isHighResLoaded.value && displayBgSrc.value === highResSrc) {
    return;
  }

  // 后台加载高清版
  const img = new Image();
  img.onload = () => {
    displayBgSrc.value = highResSrc;
    isHighResLoaded.value = true;
  };
  img.onerror = () => {
    // 高清版加载失败，保持显示压缩版
    console.warn('高清背景图加载失败，使用压缩版');
  };
  img.src = highResSrc;
};
// 更新时间的函数
const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  currentTime.value = `${hours}:${minutes}`;

  // 计算到下一分钟的时间间隔，确保每次都在整分钟更新
  const secondsToNextMinute =
    (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
  return secondsToNextMinute;
};

const onFocus = () => {
  isFocus.value = true;
};

const onBlur = (event) => {
  // 阻止blur事件的默认行为，改为手动控制
  setTimeout(() => {
    const activeElement = document.activeElement;
    const searchContainer = document.querySelector(".search-container");

    // 检查当前焦点是否还在搜索相关元素上
    if (searchContainer && !searchContainer.contains(activeElement)) {
      // 检查是否是dropdown相关的元素
      const isDropdownElement =
        activeElement.closest(".el-dropdown") ||
        activeElement.closest(".el-dropdown-menu") ||
        activeElement.classList.contains("el-popper");

      if (!isDropdownElement) {
        isFocus.value = false;
      }
    }
  }, 10);
};

const onSelcetSearch = (searchInfo) => {
  searchStore.setCurrentEngine(searchInfo.key);
};

const onSearch = () => {
  if (searchText.value) {
    window.open(currentSearchInfo.value.url + searchText.value, "_blank");
    searchText.value = "";
    isFocus.value = false;
  }
};

const handleKeyDown = (e) => {
  if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    document.querySelector(".search-input").focus();
  }

  if (e.key === "Escape") {
    document.querySelector(".search-input").blur();
    isFocus.value = false;
  }
};

const handleClick = (e) => {
  const searchContainer = document.querySelector(".search-container");

  // 检查点击的元素是否在搜索容器或dropdown相关元素内
  const isClickInsideSearch =
    searchContainer && searchContainer.contains(e.target);
  const isClickOnDropdown =
    e.target.closest(".el-dropdown") ||
    e.target.closest(".el-dropdown-menu") ||
    e.target.classList.contains("el-popper");

  if (!isClickInsideSearch && !isClickOnDropdown) {
    isFocus.value = false;
  }
};
const toggleWeatherPanel = () => {
  isWeatherPanelVisible.value = !isWeatherPanelVisible.value;
};

watch(
  () => weather.value,
  async (val) => {
    // 确保 DOM 更新后再设置天气效果
    await nextTick();

    switch (val) {
      case "rain":
        localStorage.setItem("weather", "rain");
        await setWeather("rain");
        break;
      case "snow":
        localStorage.setItem("weather", "snow");
        await setWeather("snow");
        break;
      case "flower":
        localStorage.setItem("weather", "flower");
        await setWeather("sakura");
        break;
      case "nothing":
        localStorage.setItem("weather", "nothing");
        await stopWeather();
        break;
      default:
        break;
    }
    bus.emit("weatherChange", weather.value);
  },
  {
    immediate: true,
  },
);

// 监听背景图变化，预加载新背景
watch(
  () => currentBgSrc.value,
  (newSrc) => {
    preloadBg(newSrc || defaultBg);
  },
);

onMounted(async () => {
  await nextTick();

  // 预加载初始背景图
  preloadBg(currentBgSrc.value || defaultBg);

  // 初始化时间显示
  updateTime();
  const delay = updateTime();
  timer.value = setTimeout(() => {
    updateTime();
    timer.value = setInterval(updateTime, 60000);
  }, delay);

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("click", handleClick);

  bus.on("dialog-open", () => {
    if (backgroundRef.value) {
      backgroundRef.value.style.transform = "scale(1.1)";
    }
  });
  bus.on("dialog-close", () => {
    if (backgroundRef.value) {
      backgroundRef.value.style.transform = "scale(1)";
    }
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("click", handleClick);
  clearTimeout(timer.value); // 清除可能存在的timeout
  clearInterval(timer.value); // 清除interval
  bus.off("dialog-open", () => {
    if (backgroundRef.value) {
      backgroundRef.value.style.transform = "scale(1.1)";
    }
  });
  bus.off("dialog-close", () => {
    if (backgroundRef.value) {
      backgroundRef.value.style.transform = "scale(1)";
    }
  });
});
</script>
<style scoped lang="scss">
.nav-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  .background {
    height: 100%;
    width: 100%;
    transform: scale(1);
    transform-origin: center;
    background-color: #1a1a2e;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.6s ease, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .bg-loaded {
    opacity: 1;
  }
}

/* 毛玻璃遮罩层 */
.blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  background-color: rgba(255, 255, 255, 0);
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: all cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.blur-active {
  transform: scale(1.1) !important;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: all cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.blur-active + .blur-overlay {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 600px;
  width: 100%;
  z-index: 1;

  .time {
    animation-duration: 1s;
    color: #fff;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont;
    font-size: 42px;
    font-weight: 400;
    left: 50%;
    max-width: 300px;
    padding: 10px;
    position: fixed;
    text-align: center;
    text-overflow: ellipsis;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
    top: 115px;
    transform: translate(-50%);
    transition:
      color 0.25s,
      font-weight 0.25s,
      text-shadow 0.25s,
      top 0.25s;
    white-space: nowrap;
  }
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 30px;
  background: #ffffffe6;
  display: flex;
  align-items: center;
  justify-content: 980914space-between;
  height: 33px;
  padding: 5px;
  // box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  box-shadow: #0003 0 0 20px;
  animation-duration: 0.25s;
  -webkit-backdrop-filter: blur(10px) saturate(1.5);
  backdrop-filter: blur(10px) saturate(1.5);
  background-color: #ffffff40;
  border-radius: 30px;
  box-shadow: #0003 0 0 10px;
  color: #fff;
  left: 50%;
  max-width: 80%;
  overflow: hidden;
  position: fixed;
  top: 200px;
  transform: translate(-50%);
  transition:
    color 0.25s,
    background-color 0.25s,
    box-shadow 0.25s,
    left 0.25s,
    opacity 0.25s,
    top 0.25s,
    width 0.25s;
  width: 500px;
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    width: 33px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #fff;
    }
  }
}
.blur-search-container {
  background-color: transparent;
  color: #fff;
}

.search-input {
  height: calc(100% - 10px);
  flex: 1;
  font-size: 18px;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: black;
  outline: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;
  border: none;
  margin: 0 10px;
  background: transparent;
  text-align: center;
  :deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
    padding: 0;
    background: transparent;
    .el-input__inner {
      text-align: center;
      &::-webkit-input-placeholder {
        color: #fff;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}
.weather-radio {
  position: absolute;
  left: 0;
  bottom: 0;
}

.weather-panel-wrapper {
  position: absolute;
  left: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  z-index: 10;
}

.weather-content {
  margin-right: 10px;
  transform-origin: left center;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.weather-toggle-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 11;

  &:hover {
    background: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  .toggle-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
}

// 展开/收起动画
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-enter-from {
  transform: scale(0.8) translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: scale(0.8) translateX(-20px);
  opacity: 0;
}

// 当面板收起时，按钮旋转180度
.collapsed .toggle-icon {
  transform: rotate(180deg);
}

// 当面板收起时的整体样式调整
.collapsed {
  .weather-content {
    transform: scale(0.8) translateX(-20px);
    opacity: 0;
  }
}
</style>
