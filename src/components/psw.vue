<template>
  <span class="psw">
    <span class="mask"></span>
    <slot></slot>
  </span>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.psw {
  display: inline-block;
  position: relative;
  cursor: pointer;
  .mask {
    display: inline-block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(161, 161, 161);
    border-radius: 3px;
  }

  &:hover{
    .mask{
        display: none;
    }
  }
}
</style>