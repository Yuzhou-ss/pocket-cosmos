<template>
  <div class="browser" @click="onOpen(cardInfo.link)">
    <div class="tabs-head">
      <div class="tabs">
        <div class="tab-open">
          <div class="rounded-l">
            <div class="mask-round"></div>
          </div>
          <span class="tab-title">
            <div class="logo">
              <img :src="cardInfo.logo" class="logo-img" alt="" />
            </div>
            <div class="site-name">{{ cardInfo.name }}</div>
          </span>
          <div class="close-tab">✕</div>
          <div class="rounded-r">
            <div class="mask-round"></div>
          </div>
        </div>
      </div>

      <div class="window-opt">
        <button class="window-btn" @click.stop>-</button>
        <button class="window-btn" @click.stop>□</button>
        <button class="window-btn window-close" @click="onDelete($event)">
          ✕
        </button>
      </div>
    </div>

    <div class="head-browser">
      <div class="link">{{ cardInfo.link }}</div>
      <button class="dropdown-trigger">
        <el-dropdown @click.stop trigger="click" placement="bottom-end">
          <div class="dropdown-icon" @click.stop>⋮</div>
          <template #dropdown>
            <el-dropdown-menu>
              <div type="text" class="button" @click="onDelete($event)">
                删除
              </div>
              <div type="text" class="button" @click="emit('editAccess')">
                编辑
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </button>

      <button class="star">✰</button>
    </div>

    <div class="card-body">
      <div class="iframe-container">
        <iframe
          :src="cardInfo.link"
          frameborder="0"
          class="scaled-iframe"
        ></iframe>
        <div class="iframe-overlay" @click="onOpen(cardInfo.link)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CardInfo {
  name: string;
  link: string;
  logo: string;
  desc: string;
}
const props = defineProps<{
  cardInfo: CardInfo;
}>();

const emit = defineEmits<{
  (e: "deleteAccess"): void;
  (e: "editAccess"): void;
}>();

const onOpen = (url: string) => {
  window.open(url, "_blank");
};
const onDelete = (event: MouseEvent) => {
  event.stopPropagation();
  emit("deleteAccess");
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.browser {
  width: 300px;
  height: 250px;
  background: lightgrey;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: 5px 5px 10px rgba(31, 31, 31, 0.245);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 8px 8px 13px rgba(31, 31, 31, 0.3);
  }
}

/* tabs-head */
.tabs-head {
  background-color: #353535;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding-left: 20px;
}

.tabs-head .tabs {
  flex: 1;
}

.tab-open {
  width: 140px;
  height: 34px;
  border-radius: 7px 7px 0 0;
  background-color: #515151;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 10px 8px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.close-tab {
  color: #fff;
  font-size: 9px;
  padding: 1px 4px;
  border-radius: 50%;
  cursor: default;
  height: 20px;
  line-height: 1.6;
  &:hover {
    background-color: #5d5d5d;
  }
}

.rounded-l,
.rounded-r {
  position: absolute;
  background-color: #515151;
  width: 20px;
  height: 24px;
  top: 0;
  overflow: hidden;
}

.rounded-l {
  right: 0;
  transform: translate(100%);
}

.rounded-r {
  left: 0;
  transform: translate(-100%);
}

.mask-round {
  width: 100%;
  height: 100%;
  background-color: #353535;
}

.rounded-l .mask-round {
  border-radius: 0 0 0 7px;
}

.rounded-r .mask-round {
  border-radius: 0 0 7px 0;
}

.tab-title {
  color: #fff;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
}

.logo-img {
  height: 14px;
}

.site-name {
  flex: 1;
  height: 20px;
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 90px;
}

.window-opt {
  display: flex;
  margin-right: 5px;
}

.window-btn {
  height: 30px;
  width: 30px;
  border: none;
  background-color: transparent;
  transition: 0.1s ease-out;
  color: #fff;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #515151c8;
  }

  &.window-close:hover {
    background-color: rgb(255, 52, 52);
  }
}

/* head-browser */
.head-browser {
  position: absolute;
  top: 30px;
  width: 100%;
  height: 40px;
  background-color: #515151;
  padding: 7px;
  display: flex;
  border-radius: 7px 7px 0 0;
  gap: 5px;
}

.button {
  display: block;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    background: rgb(230, 230, 230);
    color: #409eff;
  }
}

.link {
  background-color: #3b3b3b;
  border: 2px solid transparent;
  height: 100%;
  border-radius: 20px;
  outline: none;
  color: #fff;
  padding: 0 15px;
  flex: 1;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background-color: #5d5d5d;
  }

  &:focus {
    border-color: rgb(173, 214, 255);
    background-color: #3b3b3b;
    transition: none;
  }
}

.dropdown-trigger,
.star {
  width: 27px;
  height: 25px;
  border: none;
  background-color: transparent;
  color: #fff;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #5d5d5d;
  }

  &:disabled {
    opacity: 0.4;

    &:hover {
      background-color: transparent;
    }
  }
}

.dropdown-icon {
  color: #fff;
  cursor: pointer;
  height: 27px;
  width: 25px;
  line-height: 27px;
}

.star {
  position: absolute;
  right: 45px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  opacity: 0.7;
  height: 18px;
  width: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3px;
}

.card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  color: black;
  overflow: hidden;
  margin-top: 30px;
}

.iframe-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.scaled-iframe {
  transform: scale(0.2);
  transform-origin: 0 0;
  width: 500%;
  height: 500%;
  border: none;
}

.iframe-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  cursor: pointer;
}
</style>
