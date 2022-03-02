<template>
  <div class="LoginIndex">
    <div class="content">
      <div class="login">
        <h2 class="title">{{isLogin?'欢迎登陆':'注册'}}</h2>
        <section class="login-section">
          <!-- 登陆表单 -->
          <LoginForm v-if="isLogin" />
          <!-- 注册表单 -->
          <RegisterForm v-else />
          <!-- 注册按钮 -->
          <div class="register" @click="isLogin = !isLogin">{{isLogin?'注册':'返回'}}</div>
          <!-- 登陆注册按钮 -->
          <button class="btn">{{isLogin?'登陆':'注册'}}</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import LoginForm from './components/login-form.vue'
import RegisterForm from './components/register-form'
export default {
  name: 'LoginIndex',
  components: {
    LoginForm, RegisterForm
  },
  setup () {
    const isLogin = ref(true)

    return { isLogin }
  }
}
</script>

<style lang="less" scoped>
.LoginIndex {
  width: 1700px;
  margin: 0 auto;
  overflow: hidden;
  .content {
    width: 100%;
    height: 1200px;
    overflow: hidden;
    background: url(@/assets/images/4.jpeg) no-repeat;
    background-size: cover;
    .login {
      border-radius: 15px;
      width: 500px;
      height: 350px;
      margin: 200px auto;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.5);
      .title {
        font-size: 32px;
        color: #fff;
        text-align: center;
        margin-top: 25px;
      }
    }
  }
  .register {
    display: block;
    margin: 15px 0 0 400px;
    color: #fff;
    font-size: 18px;
    text-decoration: underline;
  }
  .btn {
    font-size: 20px;
    width: 252px;
    height: 50px;
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 10px;
    margin: 20px 0 0 130px;
  }
}
</style>