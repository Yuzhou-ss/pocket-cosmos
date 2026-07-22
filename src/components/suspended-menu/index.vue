<template>
  <div
    class="menu-wrapper"
    @mouseenter="changeMenu"
    @mouseleave="handleMouseLeave"
    ref="menuRef"
  >
    <div v-if="!isHover" class="icon-box">
      <svg-icon name="up" class="icon"></svg-icon>
      <svg-icon
        name="up"
        style="margin-bottom: 20px; margin-top: -8px"
        class="icon"
      ></svg-icon>
    </div>
    <ul v-else>
      <li
        @click="go(item.link, index)"
        :class="active === index ? 'active' : ''"
        v-for="(item, index) in list"
        :key="index"
        :style="{ '--clr': item.color }"
      >
        <span><i :class="item.icon"></i>{{ item.text }}</span>
      </li>
      <div class="indicator"></div>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const menuRef = ref(null);
const list = ref([
  {
    text: "终端",
    color: "#0fc70f",
    icon: "iconfont icon-code",
    link: "/yuzhou/terminal",
  },
  {
    text: "首页",
    color: "#f44336",
    icon: "iconfont icon-shouye",
    link: "/yuzhou/navigation",
  },
  {
    text: "关于",
    color: "#2196f3",
    icon: "iconfont icon-box-empty",
    link: "/yuzhou/about",
  },
]);

const active = ref(0);
const isHover = ref(false);

// 计算当前激活菜单项的函数
const updateActiveMenu = () => {
  const currentIndex = list.value.findIndex((item) => item.link === route.path);

  if (currentIndex !== -1) {
    active.value = currentIndex;
  } else {
    // 如果没有匹配的路由，默认激活第一个菜单项
    active.value = 0;
  }
};

// 在路由准备就绪后更新激活状态
router.isReady().then(() => {
  updateActiveMenu();
});

// 监听路由变化，同步更新菜单激活状态
watch(
  () => route.path,
  () => {
    updateActiveMenu();
  },
);

const changeMenu = () => {
  isHover.value = true;
};

const handleMouseLeave = () => {
  isHover.value = false;
};

const handleDocumentMouseLeave = (e) => {
  // 检查鼠标是否真的离开了浏览器窗口
  if (e.relatedTarget === null || e.toElement === null) {
    isHover.value = false;
  }

  // 或者检查鼠标是否离开了菜单元素
  if (menuRef.value && !menuRef.value.contains(e.relatedTarget)) {
    isHover.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mouseleave", handleDocumentMouseLeave);
});

onUnmounted(() => {
  document.removeEventListener("mouseleave", handleDocumentMouseLeave);
});

const go = (link, index) => {
  if (active.value === index) return;
  active.value = index;
  router.push(link);
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>
