<template>
  <loading v-show="pageLoading" />
  <div class="terminal-container" id="terminal-container" v-show="!pageLoading">
    <terminal-window ref="terminalRef" />
  </div>
</template>
<script setup>
import { useSakura } from "@/hooks/sakura-snow";
import { useSnow } from "@/hooks/snow";
import { useRain } from "@/hooks/rain";
import { getCityWeather } from "@/utils/weather";
import { onMounted, onUnmounted, ref } from "vue";
import { getUserConfig } from "@/api";
import { useUserStore } from "@/store";
import loading from "@/components/loading.vue";
import terminalWindow from "@/components/terminal-window/index.vue";

const userStore = useUserStore();

const weather = ref("");
const pageLoading = ref(true);
const loadingTimer = ref(null);
const terminal = document.getElementById("terminal");

const setByWeather = () => {
  getCityWeather()
    .then((res) => {
      weather.value = res.weather;
      if (weather.value.indexOf("雨") > 0) {
        useRain("terminal-container");
      } else if (weather.value.indexOf("雪") > 0) {
        useSnow("terminal-container");
      } else {
        useSakura("terminal-container");
      }
    })
    .catch((err) => {
      useSakura("terminal-container");
    });
};

const setWeather = async () => {
  try {
    const result = await getUserConfig(userStore.$state.username);
    if (['snow', 'sakura', 'rain', 'no-weather'].includes(result?.data?.defaultWeather)) {
      switch (result.data.defaultWeather) {
        case "snow":
          useSnow("terminal-container");
          break;
        case "rain":
          useRain("terminal-container");
          break;
        case "sakura":
          useSakura("terminal-container");
          break;
        case "no-weather":
          const weatherCanvas = document.getElementsByName("weather_canvas")[0];
          if (weatherCanvas.length > 0) {
            terminal.removeChild(weatherCanvas);
          }
          break;
        default:
          useSakura("terminal-container");
      }
    } else {
      setByWeather();
    }
  } catch (err) {
    useSakura("terminal-container");
  }
};

onMounted(() => {
  setWeather();
  loadingTimer.value = setTimeout(() => {
    pageLoading.value = false;
  }, 3000);
});

onUnmounted(() => {
  clearTimeout(loadingTimer.value);
});
</script>
<style scoped>
.terminal-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("@/assets/images/bg8.jpg");
  background-size: 100% 100%;
  transform: translate();
}
</style>
