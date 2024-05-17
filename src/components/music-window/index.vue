<template>
  <div id="music-container" :draggable="true">
    <header class="m-head">
      <ul class="m-head-shell">
        <li class="m-window-icon red"></li>
        <li class="m-window-icon yellow"></li>
        <li class="m-window-icon green"></li>
      </ul>
      <h4 class="m-head-title">Music-Player</h4>
    </header>
    <div class="music-body">
      <!-- <div id="aplayer"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import APlayer from "aplayer";
import { onMounted } from "vue";

onMounted(() => {
  const aplayer = new APlayer({
    container: document.getElementById("aplayer"),
    audio: [
      {
        name: "name",
        artist: "artist",
        url: "url.mp3",
        cover: "cover.jpg",
      },
    ],
  });
});
</script>

<style scoped lang="scss">
#music-container {
  height: 80%;
  width: 70%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .m-head {
    height:30px;
    background-color: rgba(49, 49, 49, 0.8);
    text-align: center;
    .m-head-shell {
      position: absolute;
      top: 5px;
      left: 8px;
      padding-left: 0;
      .m-window-icon {
        height: 16px;
        width: 16px;
        border-radius: 16px;
        margin-left: 6px;
        margin-top: 4px;
        line-height: 16px;
        cursor: pointer;
        display: inline-block;
      }
      .red {
        background-color: #c83030;
      }
      .yellow {
        background-color: #f7db60;
      }
      .green {
        background-color: #2ec971;
      }
    }
    .m-head-title {
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      margin: 5px;
      letter-spacing: 1px;
    }
  }
  .music-body {
    height: 95%;
    margin-top: 1px;
    background-color: rgba(49, 49, 49, 0.6);
  }
}
</style>
