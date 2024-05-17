<template>
  <div
    class="menu-wrapper"
    @mouseenter="changeMenu"
    @mouseleave="isHover = false"
  >
    <div v-if="!isHover" class="icon-box" @mouseleave="isHover = false">
      <svg-icon name="up" class="icon"></svg-icon>
      <svg-icon
        name="up"
        style="margin-bottom: 20px; margin-top: -8px"
        class="icon"
      ></svg-icon>
    </div>
    <ul v-else @mouseleave="isHover = false">
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const list = ref([
  {
    text: "首页",
    color: "#f44336",
    icon: "iconfont icon-shouye",
    link: "/home",
  },
  {
    text: "终端",
    color: "#0fc70f",
    icon: "iconfont icon-code",
    link: "/terminal",
  },
  {
    text: "关于",
    color: "#2196f3",
    icon: "iconfont icon-box-empty",
    link: "/about",
  },
  // {
  //   text: "盒子",
  //   color: "#b145e9",
  //   icon: "iconfont icon-box-empty",
  // },
  // {
  //   text: "gitee",
  //   color: "#ffa111",
  //   icon: "iconfont icon-gitee-fill-round",
  // },
]);
const active = ref(0);
const isHover = ref(false);

router.isReady().then(() => {
  list.value.map((el, index) => {
    if (el.link == router.currentRoute.value.path) {
      active.value = index;
    }
  });
});

const changeMenu = () => {
  setTimeout(() => {
    isHover.value = true;
  }, 100);
};

const go = (link, index) => {
  if (active.value === index) return;
  active.value = index;
  router.push(link);
};
</script>

<style lang="scss" scoped>
@import url("./index.scss");
</style>