<template>
  <div class="card" @mouseover="isHover = true" @mouseleave="isHover = false">
    <div class="main" @click="openLink(mediaInfo.link)">
      <img :src="mediaInfo.logo" alt="" height="50" />
      <div>{{ mediaInfo.name }}</div>
    </div>
    <div class="upper">
      <div
        v-for="item in mediaInfo.upper"
        :key="item.key"
        class="item"
        @click="openLink(item.link)"
      >
        <div class="item-inner">
          <div class="item-front">
            <img :src="item.logo" alt="" />
          </div>
          <div class="item-back">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="lower">
      <div
        v-for="item in mediaInfo.lower"
        :key="item.key"
        class="item"
        @click="openLink(item.link)"
      >
        <div class="item-inner">
          <div class="item-front">
            <img :src="item.logo" alt="" />
          </div>
          <div class="item-back">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const isHover = ref(false);
const props = defineProps({
  mediaInfo: {
    type: Object,
    default: () => {},
  },
});

const openLink = (link: string) => {
  window.open(link, "_blank");
};
</script>

<style scoped lang="scss">
.card {
  cursor: pointer;
  position: relative;
  display: flex;
  &:hover {
    .upper {
      top: -60px;
    }
    .lower {
      top: 60px;
    }
  }
  .main {
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #fff;
    padding: 12px;
    border-radius: 12px;
    position: relative;
    z-index: 2;
    width: 118px;
    height: 50px;
    &:hover {
      background-color: rgb(250, 250, 250);
    }
  }
  .upper,
  .lower {
    width: 132px;
    position: absolute;
    transition: all 0.2s linear;
    z-index: 1;
    display: flex;
    align-content: center;
    top: 0px;
    flex-wrap: nowrap;
    height: 70px;
    overflow: hidden;
    left: 5px;
    > div {
      display: flex;
      align-items: center;
      gap: 5px;
      img {
        height: 20px;
      }
    }
  }
  .upper {
    border-radius: 12px 12px 0 0;
    overflow: hidden;
  }
  .lower {
    height: 60px;
    padding-top: 10px;
    border-radius: 0 0 12px 12px;
  }
}

.item {
  flex: 1;
  position: relative;
  background: #fff;
  cursor: pointer;
  perspective: 600px;

  .item-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
    transform-style: preserve-3d;
  }

  .item-front,
  .item-back {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .item-front {
    img {
      height: 20px;
    }
  }

  .item-back {
    background: #fff;
    color: #303133;
    font-size: 12px;
    font-weight: 600;
    padding: 0 4px;
    text-align: center;
    transform: rotateY(180deg);
  }

  &:hover {
    background-color: rgb(250, 250, 250);
    .item-inner {
      transform: rotateY(180deg);
    }
  }
}
</style>
