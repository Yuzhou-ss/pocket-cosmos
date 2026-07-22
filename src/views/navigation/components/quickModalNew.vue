<template>
  <z-modal
    v-model="modalVisible"
    :show-close="false"
    :is-hover="isHover"
    :width="560"
  >
    <template #header>
      <header class="modal-header">
        <div>快捷入口</div>
        <div
          class="close"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
          @click="((isHover = false), (modalVisible = false))"
        >
          <el-icon><close /></el-icon>
        </div>
      </header>
    </template>

    <div class="body">
      <div v-if="!list.length && !loading" class="empty">
        <div class="empty-text">还没有快捷入口</div>
      </div>

      <div class="list" :class="{ 'list--empty': !list.length }">
        <quickAccessCardNew
          v-for="item in list"
          :key="item.id"
          :card-info="item"
          @edit="onEdit(item)"
          @delete="onDelete(item)"
        />
        <div class="add-item" @click="quickFormModalRef.open()">
          <div class="add-icon">
            <el-icon :size="13"><Plus /></el-icon>
          </div>
          <span>添加</span>
        </div>
      </div>
    </div>

    <quickFormModalNew
      ref="quickFormModalRef"
      @updateQuickAccess="refresh"
    />
  </z-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/theme-chalk/el-message-box.css";
import quickAccessCardNew from "@/components/quickAccessCardNew.vue";
import quickFormModalNew from "./quickFormModalNew.vue";
import {
  getQuickAccessListLocal,
  deleteQuickAccessLocal,
  type QuickAccessItem,
} from "@/utils/quickAccessStorage";

const modalVisible = ref(false);
const quickFormModalRef = ref<any>(null);
const isHover = ref(false);
const list = ref<QuickAccessItem[]>([]);
const loading = ref(false);

const open = () => {
  modalVisible.value = true;
  refresh();
};

const refresh = () => {
  loading.value = true;
  try {
    list.value = getQuickAccessListLocal();
  } finally {
    loading.value = false;
  }
};

const onEdit = (item: QuickAccessItem) => {
  quickFormModalRef.value?.open(item);
};

const onDelete = (item: QuickAccessItem) => {
  ElMessageBox.confirm(`确定要删除「${item.name}」吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      if (deleteQuickAccessLocal(item.id)) {
        ElMessage.success("删除成功");
        refresh();
      }
    })
    .catch(() => {});
};

onMounted(refresh);

defineExpose({ open });
</script>

<script lang="ts">
export default { name: "QuickModalNew" };
</script>

<style lang="scss" scoped>
.modal-header {
  text-align: center;
  position: relative;
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  .close {
    position: absolute;
    right: 0;
    cursor: pointer;
    transition:
      background-color 0.25s,
      opacity 0.25s;
    border-radius: 5px;
    height: 44px;
    width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
.body {
  padding: 12px 16px 16px;
  min-height: 120px;
  max-height: 60vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
    border-radius: 2px;
  }
}
.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  &.list--empty .add-item {
    grid-column: 1 / -1;
    justify-content: center;
  }
}
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  .empty-text {
    font-size: 14px;
    color: #86868b;
  }
}
.add-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border: 1px dashed rgba(0, 0, 0, 0.14);
  border-radius: 11px;
  cursor: pointer;
  transition: all 0.2s;
  color: #6e7681;
  font-size: 13px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.25);
  &:hover {
    border-color: rgba(0, 122, 255, 0.4);
    color: #007aff;
    background: rgba(0, 122, 255, 0.04);
    .add-icon {
      background: rgba(0, 122, 255, 0.08);
      color: #007aff;
    }
  }
  .add-icon {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.03);
    color: #86868b;
    transition: all 0.2s;
  }
}
</style>
