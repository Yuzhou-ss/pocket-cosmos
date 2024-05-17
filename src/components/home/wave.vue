<template>
  <div class="wave-container">
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" />
          <use xlink:href="#gentle-wave" x="48" y="3" />
          <use xlink:href="#gentle-wave" x="48" y="5" />
          <use xlink:href="#gentle-wave" x="48" y="7" />
        </g>
      </svg>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.waves {
  position: absolute;
  width: 100%;
  height: 15%;
  bottom: 0;
  left: 0;
//   border-radius: 10px;
}

@mixin fill_backgroundcolor($backcoler) {
  fill: $backcoler;
}

//设置波峰的颜色
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  @include fill_backgroundcolor(#fff);
  opacity: 0.5;
}

// 为每一个波峰，分别设置，运动节奏，达到波浪参差不齐的运动表现。

.parallax > use:nth-child(1) {
  animation-delay: -3s;
  animation-duration: 11s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  //定义过度动画
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>