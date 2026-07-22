<template>
  <!-- From Uiverse.io by LilaRest -->
  <div class="radio-input">
    <div class="glass">
      <div class="glass-inner"></div>
    </div>
    <div class="selector">
      <div v-for="(option, index) in options" :key="index" class="choice">
        <div>
          <input
            :id="option.id"
            :value="option.value"
            v-model="selectedValue"
            class="choice-circle"
            name="number-selector"
            type="radio"
          />
          <div class="ball"></div>
        </div>
        <label class="choice-name">
          <el-tooltip :content="option.desc" placement="right">
            <img :src="option.icon" alt="" height="41" width="41" />
          </el-tooltip>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import snow from "@/assets/icons/snow.svg";
import rain from "@/assets/icons/rain.svg";
import nothing from "@/assets/icons/nothing.svg";
import flower from "@/assets/icons/flower.svg";

// 定义选项数据
const options = ref([
  { id: "one", value: "flower", icon: flower, desc: "香云坠" },
  { id: "two", value: "rain", icon: rain, desc: "丝牵缘" },
  { id: "three", value: "snow", icon: snow, desc: "同霜鬓" },
  { id: "four", value: "nothing", icon: nothing, desc: "Nothing" },
]);

// 使用 v-model 绑定选中值
const selectedValue = defineModel({ default: "two" });

// 如果需要在父组件中使用，可以 emit 事件
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

/* From Uiverse.io by LilaRest */
.radio-input {
  display: flex;
  height: 350px;
  align-items: center;
  padding: 30px;
  border-radius: 30px;
  background-color: rgba(190, 189, 189, 0.5);
}

.glass {
  z-index: 0;
  height: 110%;
  width: 95px;
  margin-right: 25px;
  padding: 8px;
  background-color: rgba(190, 189, 189, 0.5);
  border-radius: 35px;
  box-shadow:
    rgba(50, 50, 93, 0.2) 0px 25px 50px -10px,
    rgba(0, 0, 0, 0.25) 0px 10px 30px -15px,
    rgba(10, 37, 64, 0.26) 0px -2px 6px 0px inset;
  backdrop-filter: blur(8px);
}

.glass-inner {
  width: 100%;
  height: 100%;
  border-color: rgba(245, 245, 245, 0.45);
  border-width: 9px;
  border-style: solid;
  border-radius: 30px;
}

.selector {
  display: flex;
  flex-direction: column;
}

.choice {
  margin: 10px 0 10px 0;
  display: flex;
  align-items: center;
}

.choice > div {
  position: relative;
  width: 41px;
  height: 41px;
  margin-right: 15px;
  z-index: 0;
}

.choice-circle {
  appearance: none;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  border-width: 9px;
  border-style: solid;
  border-color: rgba(245, 245, 245, 0.45);
  cursor: pointer;
  box-shadow:
    0px 0px 20px -13px gray,
    0px 0px 20px -14px gray inset;
}

.ball {
  z-index: 1;
  position: absolute;
  inset: 0px;
  transform: translateX(-95px);
  box-shadow:
    rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -15px 15px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -40px 20px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px,
    0px -1px 15px -8px rgba(0, 0, 0, 0.09);
  border-radius: 100%;
  transition: transform 800ms cubic-bezier(1, -0.4, 0, 1.4);
  background-color: rgb(232, 232, 232, 1);
}

.choice-circle:checked + .ball {
  transform: translateX(0px);
}

.choice-name {
  color: rgb(177, 176, 176);
  font-size: 35px;
  font-weight: 900;
  font-family: monospace;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
