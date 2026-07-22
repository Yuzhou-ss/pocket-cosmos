<template>
  <teleport to="body">
    <div
      v-if="visible"
      class="pet-context-menu"
      :style="menuStyle"
      @click.stop
      @contextmenu.prevent
    >
      <div class="menu-section">
        <div class="menu-section-title">动作</div>
        <div
          v-for="item in actionMenuItems"
          :key="item.key"
          class="menu-item"
          :class="{ active: hoveredMenu === item.key }"
          @click="onSelectAction(item.key)"
          @mouseenter="hoveredMenu = item.key"
          @mouseleave="hoveredMenu = ''"
        >
          <span class="menu-icon">{{ item.icon }}</span>
          <span class="menu-label">{{ item.label }}</span>
        </div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-section">
        <div
          class="menu-item"
          :class="{ active: hoveredMenu === 'settings' }"
          @click="onOpenSettings"
          @mouseenter="hoveredMenu = 'settings'"
          @mouseleave="hoveredMenu = ''"
        >
          <span class="menu-icon">⚙️</span>
          <span class="menu-label">设置</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/theme-chalk/el-message-box.css";
import { getPetName, setPetName } from "@/utils/petName";

const props = defineProps({
  visible: { type: Boolean, default: false },
  left: { type: Number, default: 0 },
  top: { type: Number, default: 0 },
});

const emit = defineEmits([
  "select-action",
  "update:visible",
  "update-pet-name",
]);

const hoveredMenu = ref("");
const menuStyle = reactive({ left: "0px", top: "0px" });

const actionMenuItems = [
  { key: "walkleft", label: "向左走", icon: "←" },
  { key: "walkright", label: "向右走", icon: "→" },
  { key: "fish", label: "吃小鱼干", icon: "🐟" },
  { key: "kiss", label: "亲亲", icon: "💋" },
  { key: "sleep", label: "睡觉", icon: "💤" },
  { key: "stand", label: "站着", icon: "🧍" },
];

const closeMenu = () => {
  if (props.visible) emit("update:visible", false);
};

const onSelectAction = (actionName) => {
  emit("select-action", actionName);
  closeMenu();
};

const onOpenSettings = () => {
  closeMenu();
  ElMessageBox.prompt("请输入宠物的名字", "宠物设置", {
    confirmButtonText: "保存",
    cancelButtonText: "取消",
    inputValue: getPetName(),
    inputValidator: (val) => {
      if (!val || !val.trim()) return "名字不能为空";
      if (val.length > 12) return "名字不超过 12 个字符";
      return true;
    },
  })
    .then(({ value }) => {
      const trimmed = value.trim();
      setPetName(trimmed);
      emit("update-pet-name", trimmed);
      ElMessage.success("已保存");
    })
    .catch(() => {});
};

watch(
  () => [props.left, props.top, props.visible],
  () => {
    if (!props.visible) return;
    const menuWidth = 180;
    const menuHeight = 320;
    let left = props.left;
    let top = props.top;
    if (left + menuWidth > window.innerWidth - 8) {
      left = window.innerWidth - menuWidth - 8;
    }
    if (top + menuHeight > window.innerHeight - 8) {
      top = window.innerHeight - menuHeight - 8;
    }
    menuStyle.left = left + "px";
    menuStyle.top = top + "px";
  },
  { immediate: true },
);

const handleDocumentClick = () => closeMenu();

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>

<style lang="scss">
.pet-context-menu {
  position: fixed;
  z-index: 10001;
  min-width: 180px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.12),
    0 2px 10px rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  animation: menuPopIn 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  .menu-section {
    padding: 4px 0;
  }
  .menu-section-title {
    font-size: 11px;
    color: #86868b;
    font-weight: 500;
    padding: 4px 12px 6px;
    letter-spacing: 0.3px;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 12px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 13px;
    color: #1d1d1f;
    transition: all 0.12s;
    user-select: none;

    &.active {
      background: rgba(0, 122, 255, 0.1);
      color: #007aff;
    }
    .menu-icon {
      width: 18px;
      text-align: center;
      font-size: 14px;
    }
    .menu-label {
      flex: 1;
    }
  }
  .menu-divider {
    height: 1px;
    background: rgba(0, 0, 0, 0.08);
    margin: 4px 8px;
  }
}

@keyframes menuPopIn {
  0% {
    opacity: 0;
    transform: scale(0.92);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
