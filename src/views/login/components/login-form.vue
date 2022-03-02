<template>
  <div class="login-form">
    <form class="l-f" action="">
      <div>
        <label class="text" for="">请输入手机号：</label>
        <input type="text">
      </div>
      <div>
        <label class="text" for="">请输入密码：</label>
        <input type="password">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>

<style lang="less" scoped>
.login-form {
  margin: 10px 0 0 50px;
  .l-f {
    color: #fff;
    font-size: 20px;
    .text {
      display: inline-block;
      width: 180px;
      text-align: right;
    }
    input {
      margin-bottom: 10px;
      height: 30px;
      width: 200px;
      font-size: 20px;
    }
  }
}
</style>