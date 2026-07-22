<template>
  <div
    id="pet"
    class="pet"
    ref="petRef"
    :style="petStyle"
    @mousedown="onMouseDown"
    @contextmenu.prevent="onContextMenu"
  >
    <canvas ref="petCanvas" width="100" height="100"></canvas>
    <div class="pet-speech" v-if="speechText" :style="speechBubbleStyle">
      <div
        class="speech-bubble"
        :class="{
          top: speechBubblePosition.top,
          bottom: !speechBubblePosition.top,
        }"
      >
        <div class="speech-text">{{ speechText }}</div>
      </div>
    </div>
  </div>
  <petContextMenu
    v-model:visible="contextMenuVisible"
    :left="contextMenuLeft"
    :top="contextMenuTop"
    @select-action="executeAction"
    @update-pet-name="onPetNameUpdate"
  />
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { getTimeState } from "@/utils/time";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";
import { getCityWeather } from "@/utils/weather";
import { getPetName } from "@/utils/petName";
import petContextMenu from "./petContextMenu.vue";

// 使用 import.meta.glob 替代 85 行静态导入
const petFrameModules = import.meta.glob("../../assets/pet/max/*.png", {
  eager: true,
});
const frameUrls = {};
for (const [path, mod] of Object.entries(petFrameModules)) {
  const fileName = path.split("/").pop().replace(".png", "");
  const match = fileName.match(/^(.+?)(\d+)$/);
  if (match) {
    const [, action, num] = match;
    if (!frameUrls[action]) frameUrls[action] = [];
    frameUrls[action][parseInt(num) - 1] = mod.default;
  }
}

const router = useRouter();
const userStore = useUserStore();

const pet = reactive({ x: -200, y: -200, vx: 1 });
const actions = reactive({
  walkleft: 1,
  walkright: 1,
  fish: 1,
  sleep: 1,
  kiss: 1,
  stand: 1,
});

// 预加载的 Image 对象
const LeftwalkFrames = ref([]);
const RightwalkFrames = ref([]);
const DragFrames = ref([]);
const fishFrames = ref([]);
const kissFrames = ref([]);
const sleepFrames = ref([]);
const standFrames = ref([]);
const fallingFrames = ref([]);

const actionTimer = ref(null);
const speechTimer = ref(null);
const action = ref("stand");
const isDragging = ref(false);
const animationFrameId = ref(null);
const dragAnimationFrameId = ref(null);

const petCanvas = ref(null);
const ctx = ref(null);

const petName = ref(getPetName());
const nickName = ref(userStore.$state.nickname || "先生");

const speechText = ref(`${getTimeState()}${nickName.value}！`);
const weather = ref(localStorage.getItem("weather"));

const weatherText = {
  snow: "下雪啦！",
  rain: "雨天，要带伞哦~",
  flower: "好美的樱花啊！",
};

const speechMessages = ref([
  "喵~",
  "你想和我一起玩吗？",
  "我饿了，有小鱼干吗？",
  "好无聊呀，来陪我玩！",
  "我最喜欢晒太阳了~",
  "你工作辛苦了！",
  "喵喵喵~",
  "我是全世界最可爱的小猫喵！",
  "今天想吃什么呢？",
  "要不要一起去散步？",
  `你好呀，我叫${petName.value}~`,
]);

const speechBubblePosition = reactive({ top: true, left: 0 });

const petRef = ref(null);
const contextMenuVisible = ref(false);
const contextMenuLeft = ref(0);
const contextMenuTop = ref(0);

let dragOffsetX = 0;
let dragOffsetY = 0;

// Computed
const actionList = computed(() => {
  return Object.keys(actions)
    .map((key) => ({ name: key, weight: actions[key] }))
    .reduce((prev, curr) => prev.concat(curr), []);
});

const speechBubbleStyle = computed(() => ({
  top: speechBubblePosition.top ? "-80px" : "110px",
  left: `${50 + speechBubblePosition.left}%`,
  transform: "translateX(-50%)",
}));

const petStyle = computed(() => ({
  left: `${pet.x}px`,
  top: `${pet.y}px`,
}));

// 预加载图片
const preloadImages = (urls, targetArray) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
    targetArray.value.push(img);
  });
};

const initFrames = () => {
  preloadImages(frameUrls.walkleft || [], LeftwalkFrames);
  preloadImages(frameUrls.walkright || [], RightwalkFrames);
  preloadImages(frameUrls.drag || [], DragFrames);
  preloadImages(frameUrls.fish || [], fishFrames);
  preloadImages(frameUrls.kiss || [], kissFrames);
  preloadImages(frameUrls.sleep || [], sleepFrames);
  preloadImages(frameUrls.stand || [], standFrames);
  preloadImages(frameUrls.falling || [], fallingFrames);
};

// Canvas 绘制
const drawPetOnCanvas = (framesArray) => {
  if (!ctx.value || framesArray.value.length === 0) return;
  const frameIndex =
    Math.floor(Date.now() / 100) % framesArray.value.length;
  const img = framesArray.value[frameIndex];
  ctx.value.clearRect(0, 0, petCanvas.value.width, petCanvas.value.height);
  if (img.complete) {
    ctx.value.drawImage(img, 5, 5, 90, 90);
  }
};

const drawDragAnimation = () => {
  if (isDragging.value) {
    drawPetOnCanvas(DragFrames);
    dragAnimationFrameId.value = requestAnimationFrame(drawDragAnimation);
  }
};

const randomAction = () => {
  const totalWeight = actionList.value.reduce(
    (prev, curr) => prev + curr.weight,
    0,
  );
  let randomNum = Math.random() * totalWeight;
  for (let i = 0; i < actionList.value.length; i++) {
    if (randomNum <= actionList.value[i].weight) return actionList.value[i].name;
    randomNum -= actionList.value[i].weight;
  }
};

const restartActionTimer = () => {
  if (actionTimer.value) clearInterval(actionTimer.value);
  actionTimer.value = setInterval(() => {
    action.value = randomAction();
  }, 3000);
};

// 递归 setTimeout 实现每次随机间隔
const scheduleSpeech = () => {
  const delay = Math.random() * 10000 + 10000;
  speechTimer.value = setTimeout(() => {
    if (!isDragging.value) showSpeech();
    scheduleSpeech();
  }, delay);
};

const randomSpeech = () => {
  return speechMessages.value[
    Math.floor(Math.random() * speechMessages.value.length)
  ];
};

const showSpeech = () => {
  calculateSpeechPosition();
  speechText.value = randomSpeech();
  setTimeout(() => {
    speechText.value = "";
  }, 3000);
};

const calculateSpeechPosition = () => {
  if (!petRef.value) return;
  const petRect = petRef.value.getBoundingClientRect();
  const bubbleWidth = 200;
  const bubbleHeight = 60;
  const margin = 20;

  speechBubblePosition.top = true;
  speechBubblePosition.left = 0;

  if (
    petRect.left + petRect.width / 2 + bubbleWidth / 2 >
    window.innerWidth - margin
  ) {
    const overflow =
      petRect.left +
      petRect.width / 2 +
      bubbleWidth / 2 -
      (window.innerWidth - margin);
    speechBubblePosition.left = -(overflow / (window.innerWidth / 100));
  }

  if (petRect.left + petRect.width / 2 - bubbleWidth / 2 < margin) {
    const overflow =
      margin - (petRect.left + petRect.width / 2 - bubbleWidth / 2);
    speechBubblePosition.left = overflow / (window.innerWidth / 100);
  }

  if (petRect.top - bubbleHeight < margin) {
    speechBubblePosition.top = false;
  }

  if (
    !speechBubblePosition.top &&
    petRect.bottom + bubbleHeight > window.innerHeight - margin
  ) {
    speechBubblePosition.top = true;
  }
};

const updatePet = () => {
  pet.x += pet.vx;
  if (pet.x < 0) action.value = "walkright";
  if (pet.x + 100 > window.innerWidth) action.value = "walkleft";
};

// 事件处理
const onMouseDown = (event) => {
  if (event.button !== 0) return;
  clearInterval(actionTimer.value);
  isDragging.value = true;
  dragOffsetX = event.clientX - pet.x;
  dragOffsetY = event.clientY - pet.y;
  if (dragAnimationFrameId.value) {
    cancelAnimationFrame(dragAnimationFrameId.value);
  }
  dragAnimationFrameId.value = requestAnimationFrame(drawDragAnimation);
};

const onMouseMove = (event) => {
  if (!isDragging.value) return;
  pet.x = event.clientX - dragOffsetX;
  pet.y = event.clientY - dragOffsetY;
};

const onMouseUp = () => {
  if (!isDragging.value) return;
  if (dragAnimationFrameId.value) {
    cancelAnimationFrame(dragAnimationFrameId.value);
    dragAnimationFrameId.value = null;
  }
  isDragging.value = false;

  if (
    pet.y < 0 ||
    pet.y + 100 > window.innerHeight ||
    pet.x + 100 > window.innerWidth ||
    pet.x < 0
  ) {
    drawPetOnCanvas(fallingFrames);
    setTimeout(() => {
      pet.x = 500;
      pet.y = 500;
      action.value = "stand";
      restartActionTimer();
    }, 300);
  } else {
    action.value = "stand";
    restartActionTimer();
  }
};

const onContextMenu = (event) => {
  contextMenuLeft.value = event.clientX;
  contextMenuTop.value = event.clientY;
  contextMenuVisible.value = true;
};

const onResize = () => {
  if (speechText.value) calculateSpeechPosition();
};

const loop = () => {
  if (!isDragging.value) {
    switch (action.value) {
      case "walkleft":
        pet.vx = -0.5;
        updatePet();
        drawPetOnCanvas(LeftwalkFrames);
        break;
      case "walkright":
        pet.vx = 0.5;
        updatePet();
        drawPetOnCanvas(RightwalkFrames);
        break;
      case "fish":
        drawPetOnCanvas(fishFrames);
        break;
      case "kiss":
        drawPetOnCanvas(kissFrames);
        break;
      case "sleep":
        drawPetOnCanvas(sleepFrames);
        break;
      case "stand":
        drawPetOnCanvas(standFrames);
        break;
    }
  }
  animationFrameId.value = requestAnimationFrame(loop);
};

const getWeatherInfo = () => {
  getCityWeather().then((res) => {
    speechMessages.value.push(
      `${nickName.value}，今天天气${res.weather}，${res.temperature}度，注意穿合适的衣服奥~`,
    );
  });
};

const executeAction = (actionName) => {
  action.value = actionName;
  restartActionTimer();
};

const onPetNameUpdate = (name) => {
  petName.value = name;
  speechText.value = `我喜欢这个新名字~`;
};

const checkRouteAndUpdateSpeech = () => {
  const weatherMessage = "可以点击左下角的按钮设置天气效果奥";
  const index = speechMessages.value.indexOf(weatherMessage);
  if (router.currentRoute.value.name === "navigation") {
    if (index === -1) speechMessages.value.push(weatherMessage);
  } else {
    if (index !== -1) speechMessages.value.splice(index, 1);
  }
};

watch(
  () => weather.value,
  (val) => {
    if (val && weatherText[val]) speechText.value = weatherText[val];
  },
);

router.afterEach((to, from) => {
  const weatherMessage = "可以点击左下角的按钮设置天气效果奥";
  if (to.name === "navigation") {
    if (!speechMessages.value.includes(weatherMessage))
      speechMessages.value.push(weatherMessage);
  } else if (from.name === "navigation") {
    const index = speechMessages.value.indexOf(weatherMessage);
    if (index !== -1) speechMessages.value.splice(index, 1);
  }
});

onMounted(() => {
  ctx.value = petCanvas.value.getContext("2d");
  pet.x = window.innerWidth - 150;
  pet.y = window.innerHeight - 150;

  initFrames();
  restartActionTimer();
  scheduleSpeech();
  loop();
  getWeatherInfo();
  checkRouteAndUpdateSpeech();

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  if (actionTimer.value) clearInterval(actionTimer.value);
  if (speechTimer.value) clearTimeout(speechTimer.value);
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value);
  if (dragAnimationFrameId.value) cancelAnimationFrame(dragAnimationFrameId.value);

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.pet {
  position: fixed;
  width: 100px;
  height: 100px;
  z-index: 9999;
  cursor: url(../../assets/pet/Maxwell_Who-CatCursor/alternate.ico), default;
  display: flex;
}

.pet-speech {
  position: absolute;
  z-index: 10000;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  .speech-bubble {
    position: relative;
    background: #ffffff;
    border: 2px solid #ff9aa2;
    border-radius: 20px;
    padding: 12px 16px;
    box-shadow:
      0 4px 15px rgba(255, 154, 162, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
    max-width: 200px;
    min-width: 100px;

    &::before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 10px solid transparent;
    }

    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 8px solid transparent;
    }
  }

  .speech-bubble.top {
    &::before {
      bottom: -12px;
      left: 50%;
      border-top-color: #ff9aa2;
      border-bottom: 0;
      transform: translateX(-50%);
      margin-left: -10px;
    }

    &::after {
      bottom: -8px;
      left: 50%;
      border-top-color: #ffffff;
      border-bottom: 0;
      transform: translateX(-50%);
      margin-left: -8px;
    }
  }

  .speech-bubble.bottom {
    &::before {
      top: -12px;
      left: 50%;
      border-top: 0;
      border-bottom: 10px solid #ff9aa2;
      transform: translateX(-50%);
      margin-left: -10px;
    }

    &::after {
      top: -8px;
      left: 50%;
      border-top: 0;
      border-bottom: 8px solid #ffffff;
      transform: translateX(-50%);
      margin-left: -8px;
    }
  }

  .speech-text {
    font-size: 14px;
    color: #5a3d5c;
    font-weight: 500;
    font-family: "Comic Sans MS", "Arial", sans-serif;
    text-align: center;
    line-height: 1.4;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    word-wrap: break-word;
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0.5);
  }
  70% {
    transform: translateX(-50%) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) scale(0.8);
  }
}

.pet-speech.v-leave-active {
  animation: fadeOut 0.3s ease-in;
}
</style>
