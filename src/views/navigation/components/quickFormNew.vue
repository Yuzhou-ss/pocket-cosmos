<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="logo-upload" @click="triggerUpload">
      <img v-if="currentLogo" :src="currentLogo" alt="" />
      <div v-else class="logo-placeholder">
        <el-icon :size="20"><Plus /></el-icon>
      </div>
      <div class="logo-mask">更换</div>
      <input
        ref="fileInputRef"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        hidden
        @change="handleFileChange"
      />
    </div>

    <div class="field-group">
      <div class="field">
        <label>名称</label>
        <input
          type="text"
          v-model="form.name"
          class="input"
          :class="{ invalid: errors.name }"
          placeholder="例如 GitHub"
          @blur="validateField('name')"
        />
        <div class="error" v-if="errors.name">{{ errors.name }}</div>
      </div>

      <div class="field">
        <label>链接</label>
        <input
          type="text"
          v-model="form.link"
          class="input"
          :class="{ invalid: errors.link }"
          placeholder="https://..."
          @blur="validateField('link')"
        />
        <div class="error" v-if="errors.link">{{ errors.link }}</div>
      </div>
    </div>

    <div class="actions">
      <el-button class="cancel" @click="emit('cancel')">取消</el-button>
      <el-button
        class="primary"
        :class="{ shake: isShaking }"
        @animationend="isShaking = false"
        @click="handleSubmit"
      >
        {{ editingId ? "保存" : "添加" }}
      </el-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  createQuickAccessLocal,
  updateQuickAccessLocal,
  type QuickAccessItem,
} from "@/utils/quickAccessStorage";

const emit = defineEmits<{
  (e: "saved"): void;
  (e: "cancel"): void;
}>();

const form = reactive({ name: "", link: "" });
const errors = reactive({ name: "", link: "" });
const currentLogo = ref<string | null>(null);
const editingId = ref<string | null>(null);
const isShaking = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

const validateField = (field: keyof typeof form) => {
  switch (field) {
    case "name":
      if (!form.name.trim()) errors.name = "名称不能为空";
      else if (form.name.length < 2) errors.name = "至少 2 个字符";
      else if (form.name.length > 20) errors.name = "不超过 20 个字符";
      else errors.name = "";
      break;
    case "link":
      if (!form.link.trim()) errors.link = "链接不能为空";
      else if (!/^https?:\/\/.+/.test(form.link))
        errors.link = "需以 http(s):// 开头";
      else errors.link = "";
      break;
  }
};
const validateAll = () => {
  validateField("name");
  validateField("link");
  return !Object.values(errors).some((e) => e);
};

const triggerUpload = () => fileInputRef.value?.click();

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const raw = target.files?.[0];
  if (!raw) return;
  if (!["image/jpeg", "image/png", "image/jpg"].includes(raw.type)) {
    ElMessage.error("只支持 PNG / JPG / JPEG");
    return;
  }
  if (raw.size > 5 * 1024 * 1024) {
    ElMessage.error("图片不能超过 5MB");
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev) => (currentLogo.value = ev.target?.result as string);
  reader.readAsDataURL(raw);
  target.value = "";
};

const handleSubmit = () => {
  if (!validateAll()) {
    isShaking.value = true;
    return;
  }
  const payload = {
    name: form.name.trim(),
    link: form.link.trim(),
    logo: currentLogo.value || undefined,
  };
  if (editingId.value) {
    updateQuickAccessLocal(editingId.value, payload);
    ElMessage.success("已保存");
  } else {
    createQuickAccessLocal(payload);
    ElMessage.success("已添加");
  }
  emit("saved");
};

const setEditData = (item: QuickAccessItem) => {
  editingId.value = item.id;
  form.name = item.name;
  form.link = item.link;
  currentLogo.value = item.logo || null;
};

const resetForm = () => {
  Object.assign(form, { name: "", link: "" });
  Object.assign(errors, { name: "", link: "" });
  currentLogo.value = null;
  editingId.value = null;
};

defineExpose({ resetForm, setEditData });
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
}
.logo-upload {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(135deg, #eef1f6, #dde3ec);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s;
  &:hover {
    transform: scale(1.03);
    .logo-mask {
      opacity: 1;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .logo-placeholder {
    color: #86868b;
  }
  .logo-mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }
}
.field-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-size: 12px;
    color: #6e7681;
    font-weight: 500;
    padding-left: 4px;
  }
  .input {
    width: 320px;
    height: 36px;
    padding: 0 12px;
    border: 0.5px solid rgba(0, 0, 0, 0.12);
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    color: #1d1d1f;
    outline: none;
    transition: all 0.2s;
    &:focus {
      border-color: #007aff;
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.12);
      background: #fff;
    }
    &.invalid {
      border-color: #ff3b30;
    }
  }
  .error {
    font-size: 11px;
    color: #ff3b30;
    padding-left: 4px;
  }
}
.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;
  margin-top: 4px;
}
.cancel {
  border-radius: 8px;
}
.primary {
  border: none;
  border-radius: 8px;
  background: #007aff;
  color: #fff;
  &:hover {
    background: #0066d6;
  }
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-4px);
  }
  40%,
  80% {
    transform: translateX(4px);
  }
}
.shake {
  animation: shake 0.4s ease-in-out;
}
</style>
