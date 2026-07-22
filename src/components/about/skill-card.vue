<template>
  <div class="skill-card">
    <div class="title">
      <svg-icon name="skill" width="30px" height="30px"></svg-icon>
      <span style="font-size: 30px">技能</span>
    </div>
    <div class="tags-container">
      <div
        class="tag"
        v-for="(item, index) in tagsList"
        :key="index"
        :style="{ backgroundColor: item.color }"
        @click="go(item.url)"
      >
        <svg-icon
          :name="item.icon"
          height="20px"
          style="vertical-align: -10%; margin-right: 5px"
        ></svg-icon>
        <span class="text">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const tagsList = [
  {
    name: "VUE",
    icon: "vue",
    color: "rgb(79, 192, 141)",
    url: "https://cn.vuejs.org/",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    color: "rgb(227, 243, 30)",
    url: "https://www.javascript.com/",
  },
  {
    name: "React",
    icon: "react",
    color: "rgb(97, 218, 251)",
    url: "https://react.dev/",
  },
  {
    name: "MySQL",
    icon: "mysql",
    color: "rgb(68, 121, 161)",
    url: "https://www.mysql.com/",
  },

  {
    name: "Webpack",
    icon: "webpack",
    color: "rgb(141, 214, 249)",
    url: "https://webpack.docschina.org/",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    color: "rgb(49, 120, 198)",
    url: "https://www.tslang.cn/",
  },
  {
    name: "Node.js",
    icon: "node-js",
    color: "rgb(51, 153, 51)",
    url: "https://nodejs.org/en",
  },
  {
    name: "HTML",
    icon: "html",
    color: "rgb(227, 79, 38)",
    url: "http://html5.com/",
  },
  {
    name: "CSS",
    icon: "css3",
    color: "rgb(21, 114, 182)",
    url: "https://css3.com/",
  },
  {
    name: "SCSS",
    icon: "scss",
    color: "rgb(255, 131, 196)",
    url: "https://www.sass.hk/",
  },
  {
    name: "Git",
    icon: "git",
    color: "rgb(240, 80, 50)",
    url: "https://git-scm.com/",
  },
  {
    name: "Kubernetes",
    icon: "kubernetes",
    color: "rgb(49, 108, 230)",
    url: "https://kubernetes.io/",
  },
  {
    name: "Uni-app",
    icon: "uni-app",
    color: "rgb(45, 146, 58)",
    url: "https://uniapp.dcloud.net.cn/",
  },
  {
    name: "Docker",
    icon: "docker",
    color: "rgb(29, 99, 237)",
    url: "https://www.docker.com/",
  },
  {
    name: "Python",
    icon: "python",
    color: "rgb(34, 74, 108)",
    url: "https://www.python.org/",
  },
];

let t = null;

onMounted(() => {
  const tag = document.getElementsByClassName("tag");
  t = setInterval(() => {
    const random = Math.floor(Math.random() * tagsList.length);
    tag[random].classList.add("jittery");
    setTimeout(() => {
      tag[random].classList.remove("jittery");
    }, 2000);
  }, 3000);
});

onUnmounted(() => {
  clearInterval(t);
});

const go = (url) => {
  window.open(url);
};
</script>

<style lang="scss">
.skill-card {
  width: 70%;
  background-color: #fff;
  margin-top: 30px;
  box-shadow: 8px 8px 15px 0px rgba(59, 85, 143, 0.2);
  padding: 20px;
  box-sizing: border-box;
  animation: flyInBottom 0.5s linear;
  border-radius: 10px;
  font-family: CustomFont-2;
  z-index: 2;
  .title {
    display: flex;
    align-items: center;
  }
  .tags-container {
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .tag {
      height: 30px;
      background-color: skyblue;
      display: inline-block;
      padding: 2px 15px;
      margin: 15px 5px;
      line-height: 30px;
      border-radius: 10px;
      box-shadow: 4px 4px 8px 0px rgba(59, 85, 143, 0.2);
      transition: all 0.2s linear;
      font-size: 24px;
      cursor: pointer;
      span {
        letter-spacing: 0.08em;
      }
      &:hover {
        // transform: translateY(-10px);
        animation: jittery 2s infinite;
      }
    }
  }
  .text {
    color: #fff;
  }
}

.jittery {
  animation: jittery 2s linear;
}
@keyframes jittery {
  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.9);
  }

  15% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1.15) rotate(-5deg);
  }

  25% {
    transform: scale(1.15) rotate(5deg);
  }

  30% {
    transform: scale(1.15) rotate(-3deg);
  }

  35% {
    transform: scale(1.15) rotate(2deg);
  }

  40% {
    transform: scale(1.15) rotate(0);
  }
}
@keyframes flyInBottom {
  from {
    opacity: 0;
    transform: translateY(70%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
