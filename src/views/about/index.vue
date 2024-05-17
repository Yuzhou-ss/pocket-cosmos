<template>
  <Header />
  <div class="about-container" id="test">
    <div class="title">
      <span class="zh">关于</span>
      <span class="split">|</span>
      <span class="en">about</span>
    </div>
    <IntroCard />
    <SkillCard />
    <InfoCard />
  </div>
</template>

<script setup>
import Header from "@/components/home/header.vue";
import IntroCard from "@/components/about/intro-card.vue";
import SkillCard from "@/components/about/skill-card.vue";
import InfoCard from "@/components/about/info-card.vue";

</script>

<style lang="scss" scoped>
.about-container {
  // height: 100%;
  width: 100%;
  background-color: rgb(250, 250, 250);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "CustomFont-2", sans-serif;
  padding-bottom: 50px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: skyblue;
    border-radius: 8px;
  }

  .title {
    margin-top: 80px;
    font-size: 30px;

    span {
      display: inline-block;
    }

    .split {
      margin: 0 5px;
    }
  }
}</style>