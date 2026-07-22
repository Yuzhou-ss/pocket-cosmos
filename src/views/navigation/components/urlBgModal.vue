<template>
  <z-modal
    v-model="modalVisible"
    width="508px"
    :show-close="false"
    :is-hover="isHover"
    offset="30vh"
  >
    <div style="margin-bottom: 6px">请输入在线图片链接地址</div>
    <el-form :model="formItem" :rules="rules" ref="formRef">
      <el-form-item prop>
        <el-input v-model="formItem.url" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="modalVisible = false">取消</el-button>
      <el-button type="primary" @click="onChangeBg">确定</el-button>
    </template>
  </z-modal>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useNavBgStore } from "@/store";

const formRef = ref(null);
const navBgStore = useNavBgStore();
const isHover = ref(false);
const modalVisible = ref(false);
const rules = {
  url: [
    {
      validator: (rule, value, callback) => {
        const reg =
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的URL"));
        }
      },
    },
  ],
};
const formItem = reactive({
  url: "",
});
const open = () => {
  modalVisible.value = true;
};

const onChangeBg = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      navBgStore.setCurrentBg(formItem.url);
      modalVisible.value = false;
    }
  });
};
defineExpose({
  open,
});
</script>

<script>
export default {};
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
.el-input {
  border: none;
  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.05);
    border: none;
    transition: all 0.2s linear;
    &.is-focus {
      background-color: #fff !important;
      border: 1px solid #70c000 !important;
    }
  }
}
</style>
