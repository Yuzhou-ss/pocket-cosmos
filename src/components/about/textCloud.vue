<template>
  <div class="cloud-container">
    <div class="cloud" ref="cloud" id="cloud">
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
let t = null
const strArr = ["我好帅", "摆烂", "社畜", "吃货", "赚钱", "暴富", "I人", "前端", "码农", "机械",'硕士','CV工程师'];
// 生成随机字母和数组
const generateText = () => {
  const letters = [];
  const numbers = [];

  const a = "a".charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode(a + i));

    if (i < 9) {
      numbers.push(i + 1);
    }
  }

  // return [...letters, ...numbers, ...strArr];
  return [...strArr];
};

// 生从生成的数组中随机取出字符
const randomText = () => {
  const texts = generateText();
  const text = texts[Math.floor(Math.random() * texts.length)];

  return text;
};

const rainEffect = () => {
  const cloud = document.getElementById('cloud')
  const textEle = document.createElement("div");

  textEle.innerText = randomText();
  textEle.classList.add("text");

  const left = Math.floor(Math.random() *90);
  const size = Math.random() * 0.5;
  const duration = Math.random();
  const styleSheets = {
    left: `${left}px`,
    fontSize: `${0.3 + size}em`,
    animationDuration: `${1 + duration}s`,
  };
  Object.assign(textEle.style, styleSheets);
  cloud.appendChild(textEle);

  setTimeout(() => {
    cloud.removeChild(textEle);
  }, 3000);
};

onMounted(() => {
  t = setInterval(() => rainEffect(), 200);
});

onUnmounted(() => {
  clearInterval(t);
});
</script> 
  
<style lang="scss">
.cloud-container {
  margin-left: 50px;
  height: 100%;
  display: flex;
  // align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  /* 添加一个从下往上线性渐变的镜像效果，增加视觉层次感 */
  -webkit-box-reflect: below 1px
    linear-gradient(transparent, transparent, transparent, transparent, #0005);
}

.cloud {
  position: relative;
  top: 100px;
  z-index: 100;
  /* 横向云朵 */
  width: 100px;
  height: 30px;
  background-color: #fff;
  border-radius: 100px;
  /* drop-shadow函数将阴影效果应用于投影图像 */
  // filter: drop-shadow(0 0 30px #fff);
  .text {
    position: absolute;
    top: 30px;
    height: 20px;
    line-height: 1;
    text-transform: uppercase;
    color: #fff;
    /* 为文字添加阴影，看上去发光，增加视觉效果 */
    // text-shadow: 0 0 5px #fff, 0 0 15px #fff, 0 0 30px #fff;
    transform-origin: bottom;
    animation: animate 2s linear forwards;
  }
  
}
.cloud::before {
  content: "";
  /* 左侧小云朵 */
  width: 33px;
  height: 33px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 15px;
  /* 右侧大云朵 */
  box-shadow: 30px 0 0 10px #fff;
}


@keyframes animate {
  0% {
    transform: translateX(0);
  }

  70% {
    transform: translateY(100px);
  }

  100% {
    transform: translateY(100px);
  }
}
</style>