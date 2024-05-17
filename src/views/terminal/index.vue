<template>
  <div class="terminal-container" id="terminal-container">
    <terminal-window />
    <!-- <Suspense>
      <template #default>
        <Weather />
      </template>
    </Suspense> -->
  </div>
</template>
<script setup>
import { useSakura } from "@/hooks/sakura-snow";
import { useSnow } from '@/hooks/snow'
import { useRain } from '@/hooks/rain'
import { getCityWeather } from '@/utils/weather'
import { onMounted, ref } from 'vue'
// import { defineAsyncComponent } from "vue";
// const Weather = defineAsyncComponent(() => import ('@/components/weather/index.vue'))


const weather = ref('')

const setWeather = () => {
  getCityWeather().then(res => {
    weather.value = res.weather

    if (weather.value.indexOf('雨') > 0) {
      useRain('terminal-container')
    }
    else if (weather.value.indexOf('雪') > 0) {
      console.log(111)
      useSnow('terminal-container')
    }
    else {
      console.log(111)
      useSakura('terminal-container')
    }
  }).catch(err => {
    useSakura('terminal-container')
  })
}
useSakura('terminal-container')

</script>
<style scoped>
.terminal-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("@/assets/images/bg.jpg");
  background-size: 100% 100%;
  transform: translate();
}
</style>