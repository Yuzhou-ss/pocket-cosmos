<template>
  <z-modal v-model="modalVisible" :show-close="false" :is-hover="isHover" width="500">
    <template #header>
      <header class="modal-header">
        <div>{{ editingId ? "编辑快捷入口" : "自定义快捷入口" }}</div>
        <div
          class="close"
          @mouseover="isHover = true"
          @mouseleave="isHover = false"
          @click="(isHover = false), (modalVisible = false), quickFormRef.resetForm()"
        >
          <el-icon><close /></el-icon>
        </div>
      </header>
    </template>
    <article class="tool-wrapper">
      <quickFormNew
        ref="quickFormRef"
        @saved="onSaved"
        @cancel="onCancel"
      />
    </article>
  </z-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import quickFormNew from "./quickFormNew.vue";
import type { QuickAccessItem } from "@/utils/quickAccessStorage";

const emit = defineEmits(["updateQuickAccess"]);

const modalVisible = ref(false);
const quickFormRef = ref<any>(null);
const isHover = ref(false);
const editingId = ref<string | null>(null);

const open = (item?: QuickAccessItem) => {
  if (item) {
    editingId.value = item.id;
    quickFormRef.value?.setEditData(item);
  } else {
    editingId.value = null;
    quickFormRef.value?.resetForm();
  }
  modalVisible.value = true;
};

const onSaved = () => {
  emit("updateQuickAccess");
  modalVisible.value = false;
};

const onCancel = () => {
  modalVisible.value = false;
  quickFormRef.value?.resetForm();
};

defineExpose({ open });
</script>

<script lang="ts">
export default { name: "QuickFormModalNew" };
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
    transition: background-color 0.25s, opacity 0.25s;
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
.tool-wrapper {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
