/** * @auther 温粥客 * @desc 注册/登录页 */
<template>
  <div class="login-box">
    <div class="choose-box" :class="loginSuccess ? 'chooseSuccess' : ''">
      <div class="login-choose" v-if="!loginSuccess">
        <h2>Have an account?</h2>
        <div class="btn-box">
          <button id="choose-login" @click="go">Login</button>
        </div>
      </div>
      <div class="signup-choose" v-if="!loginSuccess">
        <h2>Don't have an account?</h2>
        <div class="btn-box">
          <button id="signup-login" @click="go">Sign up</button>
        </div>
      </div>
      <div v-else class="choose-success"></div>
    </div>
    <div
      class="form-box"
      :class="[
        loginAnim ? 'anmi-signup' : 'anmi-login',
        loginSuccess ? 'loginSuccess' : '',
      ]"
    >
      <el-carousel
        :autoplay="false"
        :pause-on-hover="false"
        indicator-position="none"
        arrow="never"
        class="carousel"
        ref="carousel"
        v-if="!loginSuccess"
      >
        <el-carousel-item class="carousel-item">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="demo-ruleForm"
            label-position="right"
          >
            <el-form-item prop="username" class="b-border">
              <el-input
                class="input"
                placeholder="请输入账号"
                v-model="loginForm.username"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="password" class="b-border">
              <el-input
                class="input"
                placeholder="请输入密码"
                v-model="loginForm.password"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login(loginFormRef)"
                >Log in</el-button
              >
            </el-form-item>
          </el-form>
        </el-carousel-item>
        <el-carousel-item class="carousel-item">
          <el-form
            ref="signFormRef"
            :model="signForm"
            :rules="signRules"
            class="demo-ruleForm"
            label-position="right"
          >
            <el-form-item prop="username" class="b-border">
              <el-input
                class="input"
                v-model="signForm.username"
                placeholder="请输入账号"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="nickname" class="b-border">
              <el-input
                class="input"
                placeholder="请输入昵称"
                v-model="signForm.nickname"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="password" class="b-border">
              <el-input
                class="input"
                placeholder="请输入密码"
                v-model="signForm.password"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item prop="checkPass" class="b-border">
              <el-input
                class="input"
                placeholder="请重复密码"
                v-model="signForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="signup(signFormRef)">Sign up</el-button>
            </el-form-item>
          </el-form>
        </el-carousel-item>
      </el-carousel>
      <div v-else class="img">
        <img src="@/assets/images/bingo.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loginRequest, signupRequest } from "@/api";
import { reactive, ref } from "vue";
import { type FormInstance, type FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useMainStore } from "@/store";

const mainStore = useMainStore();
const router = useRouter();

// 判断动画的flag
let loginAnim = ref(false);

// 是否登录成功的flag
let loginSuccess = ref(false);

// 注册表单
let signForm = reactive({
  username: "",
  nickname: "",
  password: "",
  checkPass: "",
});

// 登录表单
let loginForm = reactive({
  username: "",
  password: "",
});

const reg = /^[a-zA-Z0-9_-]{4,16}$/;
const checkUsername = (rule: any, value: string, callback: Function) => {
  if (!reg.test(value)) {
    return callback(new Error("账号长度为4~16位，可由字母、数字、_和-组成"));
  }
  if (!value) {
    return callback(new Error("请输入账号"));
  }
  callback();
};

const passReg = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/;

const checkPassord = (rule: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  }
  if (!passReg.test(value)) {
    return callback(new Error("密码长度为8~16位，至少包含字母和数字"));
  }
  callback();
};

const checkRepeatPassword = (rule: any, value: string, callback: Function) => {
  if (value !== signForm.password) {
    return callback(new Error("密码输入不一致"));
  }
  callback();
};

const checkNickname = (rule: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error("请输入昵称"));
  }
  callback();
};

// 注册表单验证规则
const signRules = {
  username: [{ validator: checkUsername, trigger: "blur" }],
  password: [{ validator: checkPassord, trigger: "blur" }],
  checkPass: [
    { validator: checkRepeatPassword, trigger: "blur" },
    { validator: checkPassord, trigger: "blur" },
  ],
  nickname: [
    { min: 3, max: 9, message: "昵称长度为3~9个字符", trigger: "blur" },
    { validator: checkNickname, trigger: "blur" },
  ],
};

const checkLoginUsername = (rule: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error("请输入账号！"));
  }
  callback();
};

const checkLoginPassowrd = (rule: any, value: string, callback: Function) => {
  if (!value) {
    return callback(new Error("请输入密码！"));
  }
  callback();
};
// 登录表单验证规则
const loginRules = {
  username: [{ validator: checkLoginUsername, trigger: "blur" }],
  password: [{ validator: checkLoginPassowrd, trigger: "blur" }],
};

// 走马灯ref
const carousel = ref<FormRules>();

const loginFormRef = ref<FormRules>();
const signFormRef = ref<FormRules>();

const go = () => {
  (signFormRef.value as any).resetFields();
  (loginFormRef.value as any).resetFields();
  loginAnim.value = !loginAnim.value;
  const index = loginAnim.value ? 1 : 0;
  (carousel.value as any).setActiveItem(index);
};

// 注册
const signup = (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid: boolean) => {
    if (valid) {
      const result: any = await signupRequest(signForm);
      if (result.status === 1) {
        ElMessage({
          type: "success",
          message: "注册成功！",
        });
        (signFormRef.value as any).resetFields();
      } else {
        ElMessage({
          type: "warning",
          message: result.message,
        });
      }
    } else {
      ElMessage({
        message: "请输入正确的注册信息！",
        type: "warning",
      });
    }
  });
};

// 登录
const login = (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid: boolean) => {
    if (valid) {
      const result: any = await loginRequest(loginForm);
      if (result.status === 1) {
        loginSuccess.value = true;
        localStorage.setItem("username", result.data.username);
        localStorage.setItem("nickname", result.data.nickname);
        mainStore.changeUserInfo(
          result.data.username,
          result.data.nickname,
          result.data.defaultSearch
        );
        setTimeout(() => {
          return router.push("/home");
        }, 500);
      } else {
        return ElMessage({
          message: "登录失败！",
          type: "warning",
        });
      }
      return ElMessage({
        message: "登录成功！",
        type: "success",
      });
    } else {
      ElMessage({
        message: "请输入正确的用户名和密码！",
        type: "warning",
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.login-box {
  height: 100%;
  width: 100%;
  position: relative;
  .choose-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    height: 40vh;
    background-color: rgb(152, 156, 225, 0.6);
    display: flex;
    .login-choose {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      h2 {
        font-size: 20px;
      }
      .btn-box {
        padding: 25px;
      }
      #choose-login {
        padding: 10px 20px;
        // height: 45px;
        // width: 100px;
        font-size: 16px;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #fff;
        &:active {
          border: 2px solid #fff;
        }
      }
    }
    .signup-choose {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      h2 {
        font-size: 20px;
      }
      .btn-box {
        padding: 25px;
      }
      #signup-login {
        // height: 45px;
        // width: 100px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #fff;
        &:active {
          border: 2px solid #fff;
        }
      }
    }
    .choose-success {
      height: 100%;
      width: 100%;
    }
  }
  .form-box {
    position: absolute;
    left: 42%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 45vh;
    width: 37vh;
    background-color: rgb(248, 248, 251);
    box-shadow: 20px 20px 50px 20px rgb(100, 100, 100, 0.3);
    animation-fill-mode: forwards;
    // animation: chooseSuccess 0.3s linear;
  }

  .anmi-login {
    animation: movelogin 0.3s linear;
    animation-fill-mode: forwards;
  }
  .anmi-signup {
    animation: movesignup 0.3s linear;
    animation-fill-mode: forwards;
  }
  .loginSuccess {
    animation: loginSuccess 0.3s linear;
    animation-fill-mode: forwards;
  }
  .chooseSuccess {
    animation: chooseSuccess 0.3s linear;
    animation-fill-mode: forwards;
  }

  .carousel {
    height: 100%;
    .carousel-item {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  :deep(.el-carousel) {
    .el-carousel__container {
      height: 100%;
    }
  }
  .el-button {
    background-color: rgb(255, 115, 179) !important;
    border: none !important;
    color: #fff;
    &::before {
      content: "";
      position: absolute;
      top: -1px;
      left: -1px;
      bottom: -1px;
      right: -1px;
      background: rgb(255, 115, 179);
      z-index: -1;
      filter: blur(5px);
    }
    &:active {
      &::before {
        content: "";
        position: absolute;
        top: -3px;
        left: -3px;
        bottom: -3px;
        right: -3px;
        background: rgb(255, 115, 179);
        z-index: -1;
        filter: blur(5px);
      }
    }
  }
}

.input {
  width: 100%;
}
:deep(.el-input) {
  .el-input__wrapper {
    border-radius: 0;
    box-shadow: none;
  }
}
:deep(.b-border) {
  margin-bottom: 30px;
  .el-form-item__content {
    border: 1px solid black;
  }
}

.img {
  height: 120px;
  width: 120px;
  img {
    height: 100%;
    width: 100%;
  }
}

@keyframes movelogin {
  from {
    left: 58%;
  }

  to {
    left: 42%;
  }
}

@keyframes movesignup {
  from {
    left: 42%;
  }

  to {
    left: 58%;
  }
}

@keyframes chooseSuccess {
  from {
    left: 50%;
  }

  to {
    left: 50%;
    height: 80px;
    width: 150px;
  }
}

@keyframes loginSuccess {
  from {
    left: 42%;
  }

  to {
    left: 50%;
    height: 120px;
    width: 120px;
  }
}
</style>
