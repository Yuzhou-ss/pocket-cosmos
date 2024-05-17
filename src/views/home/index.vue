<template>
  <div class="home-container">
    <Header />
    <div class="view-win">
      <!-- <client-only> -->
        <BigImage />
      <!-- </client-only> -->
      <Wave />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/home/header.vue";
import BigImage from "@/components/home/bigImage.vue";
import Wave from "@/components/home/wave.vue";

</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  background-size: 100% 100%;
  
  ::-webkit-scrollbar{
    width: 8px;
  }
  &::-webkit-scrollbar-track{
    background-color: #fff;
  }
  
  ::-webkit-scrollbar-thumb{
    background-color: skyblue;
    border-radius: 8px;
  }
  .view-win {
    height: 100vh;
    position: relative;
  }
}
</style>