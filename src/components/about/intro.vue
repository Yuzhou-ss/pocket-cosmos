<template>
  <div class="intro-container">
    <div class="card">
      <div class="img-box"></div>
    </div>
    <div class="card">
      <div class="content">
        <h2>温粥客</h2>
        <span>所望隔山海，山海不睡觉</span>
        <!-- <ul>
          <li>
            性别
            <span>男</span>
          </li>
          <li>
            专业
            <span>机械</span>
          </li>
          <li>
            岗位
            <span>前端</span>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="avatar">
      <div class="img-box">
        <img src="@/assets/images/avatar.jpg" alt="" />
      </div>
    </div>
    <div class="avatar-back">
      <div class="left-top"></div>
      <div class="left-bottom"></div>
      <div class="right-top"></div>
      <div class="right-bottom"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
:root {
  --clr: #083d41;
}
.intro-container {
  background-color: var(--clr);
  position: relative;
  width: 200px;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card {
    background-color: tomato;
    position: relative;
    width: 110%;
    height: 200px;
    border-radius: 10px;
    cursor: pointer;
    .img-box {
      position: absolute;
      inset: 0;
      overflow: hidden;
      border-radius: 15px;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &:nth-child(1)::before {
      content: "";
      width: 20px;
      height: 20px;
      background-color: transparent;

      position: absolute;
      z-index: 10;
      top: 106px;
      left: -1px;
      border-bottom-left-radius: 20px;
      box-shadow: -6px 6px var(--clr);
    }
    &:nth-child(1)::after {
      content: "";
      width: 20px;
      height: 20px;
      background-color: transparent;

      position: absolute;
      z-index: 10;
      bottom: -1px;
      left: 105px;
      border-bottom-left-radius: 20px;
      box-shadow: -6px 6px var(--clr);
    }
    &:nth-child(1) {
      box-shadow: 8px 8px 15px 0px rgba(59, 85, 143, 0.2);
    }
    &:nth-child(2) {
      background-color: #fff;
      width: 100%;
      height: 220px;
      margin-top: 10px;
      box-shadow: 8px 8px 15px 0px rgba(59, 85, 143, 0.2);
      &::before {
        content: "";
        width: 20px;
        height: 20px;
        background-color: transparent;

        position: absolute;
        z-index: 10;
        bottom: 106px;
        left: -1px;
        border-top-left-radius: 20px;
        box-shadow: -6px -6px var(--clr);
      }
      &::after {
        content: "";
        width: 20px;
        height: 20px;
        background-color: transparent;

        position: absolute;
        z-index: 10;
        top: -1px;
        left: 109px;
        border-top-left-radius: 20px;
        box-shadow: -6px -6px var(--clr);
      }
    }
    .content {
      position: absolute;
      inset: 0;
      padding: 30px 10px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      h2 {
        width: 100%;
        padding-left: 80px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        line-height: 1.1em;
        font-size: 1.15em;
        font-weight: 600;
        color: #333;
        span {
          letter-spacing: 0.05em;
          font-size: 0.75em;
          font-weight: 400;
          color: tomato;
          text-transform: initial;
        }
      }
      ul {
        position: relative;
        top: 15px;

        width: 100%;
        padding: 0 10px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        li {
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 10px;
          font-size: 0.85em;
          font-weight: 500;
          color: #999;
          &:not(:last-child) {
            border-right: 1px solid #ccc;
          }
          span {
            font-size: 1.65em;
            color: #333;
          }
        }
      }
    }
  }
  .avatar {
    width: 120px;
    height: 120px;
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    border: 10px solid skyblue;
    .img-box {
      position: absolute;
      inset: 0;
      overflow: hidden;
      /* img的圆角 */
      border-radius: 50%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>