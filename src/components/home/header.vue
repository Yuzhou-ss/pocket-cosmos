<template>
  <div class="header-container">
    <div class="signature" data-text="余粥">余粥</div>
    <div class="log">
      <img src="@/assets/images/logo.gif" alt="">
    </div>
    <ul class="nav">
      <li></li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header-container {
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  // justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in;
  z-index: 99;
  color: rgb(250, 250, 250);
  background-color: transparent;
  flex-direction: row;
  &:hover {
    color: #333;
    box-shadow: 3px 3px 5px 0px rgba(59, 85, 143, 0.2);
    background-color: #fff;
  }
  .nav {
    height: 100%;
  }
  .signature {
    // position: absolute;
    left: 30px;
    font-size: 28px;
    letter-spacing: 0.1rem;
    animation: typing 1s steps(3, end), blink-caret 0.5s step-end;
    opacity: 1;
    overflow: hidden;
    word-break: break-all;
    color: #333;
    overflow: hidden;
    height: 40px;
    line-height: 1;
    border-right: 2px solid transparent;
    font-family: jiayouya;
    margin-left: 30px;
    font-weight: 1000;
  }
}

// 打字机效果
/* 打印效果 */
@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 3em;
  }
}

/* 光标 */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }

  50% {
    border-color: #333;
  }
}

</style>