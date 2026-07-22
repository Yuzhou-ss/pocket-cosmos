<template>
  <div class="qa-card" @click="onOpen">
    <div class="logo-box">
      <img v-if="cardInfo.logo" :src="cardInfo.logo" alt="" />
      <span v-else class="placeholder">{{ initials }}</span>
    </div>
    <span class="name" :title="cardInfo.name">{{ cardInfo.name }}</span>
    <div class="actions" @click.stop>
      <div class="action-btn edit" @click="onEdit" title="编辑">
        <el-icon :size="12"><EditPen /></el-icon>
      </div>
      <div class="action-btn delete" @click="onDelete" title="删除">
        <el-icon :size="12"><Delete /></el-icon>
      </div>
    </div>
    <div class="open-icon" title="打开链接">
      <el-icon :size="12"><TopRight /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { QuickAccessItem } from "@/utils/quickAccessStorage";

const props = defineProps<{
  cardInfo: QuickAccessItem;
}>();

const emit = defineEmits<{
  (e: "edit"): void;
  (e: "delete"): void;
}>();

const initials = computed(() => props.cardInfo.name?.slice(0, 1) || "Q");

const onOpen = () => {
  window.open(props.cardInfo.link, "_blank");
};
const onEdit = () => emit("edit");
const onDelete = () => emit("delete");
</script>

<style lang="scss" scoped>
.qa-card {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 11px;
  border: 0.5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    .actions {
      opacity: 1;
    }
    .open-icon {
      opacity: 1;
    }
  }
}
.logo-box {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eef1f6, #dde3ec);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .placeholder {
    color: #6e7681;
    font-size: 13px;
    font-weight: 600;
  }
}
.name {
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #1d1d1f;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.1px;
}
.actions {
  display: flex;
  gap: 3px;
  opacity: 0;
  transition: opacity 0.15s;
}
.action-btn {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  color: #6e7681;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    transform: scale(1.05);
  }
  &.edit:hover {
    color: #007aff;
  }
  &.delete:hover {
    color: #ff3b30;
  }
}
.open-icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6e7681;
  opacity: 0;
  transition: all 0.15s;
  flex-shrink: 0;
  &:hover {
    color: #007aff;
  }
}
</style>
