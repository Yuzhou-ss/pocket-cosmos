<template>
    <div class="weather-container">
        <!-- <Cloudy v-if="weather.indexOf('多云') > 0" />
        <Rain v-else-if="weather.indexOf('雨') > 0" />
        <Snowy v-else-if="weather.indexOf('雪') > 0" />
        <Sunny v-else-if="weather.indexOf('晴') > 0" /> -->
        <!-- <Snowy /> -->
    </div>
</template>

<script setup>
import Cloudy from './cloudy.vue'
import Rain from './rain.vue'
import Snowy from './snowy.vue'
import Sunny from './sunny.vue'
import { getCityWeather } from '@/utils/weather'
import { ref } from 'vue'
const weather = ref('')
weather.value = (await getCityWeather()).weather
console.log(weather.value )
</script>

<style lang="scss" scoped>
.weather-container{
   position: absolute;
   right: 10px;
   top: 20px;
}
</style>