<template>
  <router-view></router-view>
  <SuspendedMenu />
  <pet />
</template>
<script setup>
import SuspendedMenu from "@/components/suspended-menu/index.vue";
import pet from "@/components/desktopPet/index.vue";

// 简化版banner
const simpleBanner = `
  ****************************************               
                Hello world!                    
  ****************************************
`;

console.log("%c" + simpleBanner, "color: #dda0dd; font-weight: bold;");
// 彩色欢迎信息
console.log(
  "%c✨     要天天开心奥!    ✨",
  "background: #fff5f5; color: #dda0dd; padding: 5px 10px; border-radius: 3px;"
);
</script>
