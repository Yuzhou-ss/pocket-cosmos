<!-- EnhancedGlassDialog.vue -->
<template>
  <el-dialog
    ref="dialogRef"
    v-bind="$attrs"
    :modal="false"
    v-model="visibleModel"
    class="glass-dialog"
    :class="[
      { 'glass-dialog--fullscreen': fullscreen },
      `glass-dialog--${theme}`,
      isHover ? 'hover-dialog' : '',
    ]"
    :show-close="false"
    :top="offset"
    @open="bus.emit('dialog-open', $event)"
    @close="bus.emit('dialog-close', $event)"
  >
    <template #header="{ titleId, titleClass, close }">
      <slot name="header" v-bind="{ titleId, titleClass, close }" />
    </template>

    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>

  <!-- 自定义毛玻璃遮罩层 -->
  <div
    v-if="visibleModel"
    class="glass-mask"
    :class="`glass-mask--${theme}`"
    @click="handleMaskClick"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import bus from "@/utils/bus";

// 定义 props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  isHover: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: String,
    default: "15vh",
  },
});

// 定义 emits
const emit = defineEmits(["update:modelValue"]);

// 控制显示隐藏
const visibleModel = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

// 处理遮罩点击事件
const handleMaskClick = () => {
  if (props.closeOnClickModal) {
    visibleModel.value = false;
  }
};

// 获取 dialog 实例
const dialogRef = ref();
</script>

<style scoped lang="scss">
.glass-dialog {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  &--light {
    --el-dialog-bg-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  &--dark {
    --el-dialog-bg-color: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(10px);
    color: #fff;

    :deep(.el-dialog__header) {
      color: #fff;
    }

    :deep(.el-dialog__title) {
      color: #fff;
    }
  }

  &--fullscreen {
    &.glass-dialog--light {
      --el-dialog-bg-color: rgba(255, 255, 255, 0.9);
    }

    &.glass-dialog--dark {
      --el-dialog-bg-color: rgba(30, 30, 30, 0.9);
    }
  }
}

.glass-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;

  &--light {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
  }

  &--dark {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
  }
}
</style>
