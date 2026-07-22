<template>
  <div class="intro-card">
    <div class="hello">Hello world</div>
    <div class="main-content">
      <div class="left-tags">
        <div v-for="(item, index) in leftTagsList" :key="index" class="tags">
          <svg-icon :name="item.icon" width="20px" height="20px"></svg-icon>
          <span>{{ item.text }}</span>
        </div>
      </div>
      <div class="avatar">
        <div class="outer">
          <div class="square"></div>
        </div>
        <div class="inner">
          <img src="@/assets/images/avatar.jpg" alt="" />
        </div>
      </div>
      <div class="right-tags">
        <div v-for="(item, index) in rightTagsList" :key="index" class="tags">
          <span>{{ item.text }}</span>
          <svg-icon :name="item.icon" width="20px" height="20px"></svg-icon>
        </div>
      </div>
    </div>
    <div class="name">余粥</div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const leftTagsList = [
  {
    text: "游戏爱好者",
    icon: "game",
  },
  {
    text: "嘴大吃四方",
    icon: "eat",
  },
  {
    text: "CV工程师",
    icon: "cv",
  },
  {
    text: "机械系强者",
    icon: "machine",
  },
];

const rightTagsList = [
  {
    text: "社畜打工人",
    icon: "oficina",
  },
  {
    text: "期待暴富",
    icon: "money",
  },
  {
    text: "本人超帅",
    icon: "dog",
  },
  {
    text: "社交恐惧症",
    icon: "i",
  },
];

onMounted(() => {
  const tags = document.getElementsByClassName("tags");
  let num = 50;
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      tags[i].classList.add("floatTag");
    }, num);
    num += 100;
  }
});
</script>

<style lang="scss" scoped>
.intro-card {
  margin-top: 30px;
  height: 330px;
  width: 70%;
  background-color: #fff;
  box-shadow: 8px 8px 15px 0px rgba(59, 85, 143, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  animation: flyInBottom 0.5s linear;
  z-index:2;

  .hello {
    margin-top: 10px;
    font-size: 28px;
  }
  .main-content {
    margin-top: 20px;
    display: flex;
    height: 200px;
    .left-tags,
    .right-tags {
      width: 150px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 18px;
      font-family: geetype, sans-serif;

      .tags {
        height: 30px;
        width: 110px;
        box-shadow: 3px 3px 8px 0px rgba(59, 85, 143, 0.2);
        background-color: #fff;
        border-radius: 20px;
        padding: 2px 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        span {
          display: inline-block;
        }
      }
    }
    .left-tags {
      .tags {
        &:first-child,
        &:last-child {
          margin-left: 2rem;
        }
      }
    }
    .right-tags {
      margin-left: 1rem;
      .tags {
        &:first-child,
        &:last-child {
          margin-left: -2rem;
        }
      }
    }
    .avatar {
      position: relative;
      margin: 0 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .inner {
        height: 200px;
        border-radius: 100px;
        overflow: hidden;
        z-index: 9;
        position: relative;
        img {
          height: 100%;
        }
      }
      .outer {
        height: 210px;
        width: 210px;
        position: absolute;
        border-radius: 50%;
        overflow: hidden;
        .square {
          height: 100%;
          width: 80%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background-color: skyblue;
        }
      }
    }
  }
  .name {
    margin-top: 15px;
  }
}

.floatTag {
  animation: float 2s linear infinite;
}
@keyframes float {
  0%,
  50%,
  100% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(5px);
  }

  75% {
    transform: translateY(-5px);
  }
}

@keyframes flyInBottom {
  from {
    opacity: 0;
    transform: translateY(60%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>