<template>
  <div class="info-card">
    <div class="title">
      <svg-icon name="info" height="30px" width="30px"></svg-icon>
      <span style="font-size: 30px">基本信息</span>
    </div>
    <div class="content">
      <!-- 基本信息 -->
      <h2 class="content-title" style="margin-top: 1em">我</h2>
      <p class="content-text">理工男</p>
      <p class="content-text">一个入职半年的职场萌新</p>
      <p class="content-text">
        破壳日：<psw>{{ birthday }}</psw>
      </p>
      <p class="content-text">
        年龄：<psw>{{ age }}</psw>
      </p>
      <p class="content-text" style="margin-bottom: 3em">
        十六型人格测试：<psw class="mask-text">调停者</psw>
      </p>

      <!-- 性格 -->
      <h2 class="content-title">性格</h2>
      <p class="content-text">期待未来，怀疑自己</p>
      <p class="content-text" style="margin-bottom: 3em">
        所望隔山海，山海不睡觉
      </p>

      <!-- 联系方式 -->
      <h2 class="content-title">联系方式</h2>
      <p class="content-text">QQ：1500932714</p>
      <p class="content-text" style="margin-bottom: 3em">VX：IltcatZ</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import psw from "@/components/psw.vue";

import { ref } from "vue";
const birthday = "1999-09-21";
const age = ref(0);

const getAge = (birthday: string): number => {
  let currentYear = new Date().getFullYear(); //当前的年份
  let calculationYear = new Date(birthday).getFullYear(); //计算的年份
  const wholeTime = currentYear + birthday.substring(4); //周岁时间
  const calculationAge = currentYear - calculationYear; //按照年份计算的年龄
  //判断是否过了生日
  if (new Date().getTime() > new Date(wholeTime).getTime()) {
    return calculationAge;
  } else {
    return calculationAge - 1;
  }
};
age.value = getAge(birthday);
</script>

<style lang="scss" scoped>
.info-card {
  width: 70%;
  background-color: #fff;
  margin-top: 30px;
  box-shadow: 8px 8px 15px 0px rgba(59, 85, 143, 0.2);
  padding: 20px;
  box-sizing: border-box;
  animation: flyInBottom 0.5s linear;
  border-radius: 10px;
  z-index:2;
  .title {
    display: flex;
    align-items: center;
    font-family: CustomFont-2;
  }
  .content {
    font-family: jiayouya, UbuntuMono, "Varela Round", "PingFang SC",
      "Microsoft YaHei";
    .content-title {
      font-size: 28px;
      font-weight: 700;
    }
    .content-text {
      font-size: 20px;
      margin: 1em 0;
    }
  }
}


@keyframes flyInBottom {
  from {
    opacity: 0;
    transform: translateY(80%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>