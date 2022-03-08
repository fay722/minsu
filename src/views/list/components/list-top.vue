<template>
  <div class="list-top">
    <div class="logo"></div>
    <el-input v-model="input" placeholder="Please input" clearable @focus='onFocus' class="focusInput" ref="DomInput">
      <template #prefix>
        <el-icon class="iconfont icon-search">
        </el-icon>
      </template>
    </el-input>
    <ul class="content-nav">
      <li><a href="">Home</a></li>
      <li>
        <router-link to="/list">Room</router-link>
      </li>
      <li><a href="">Travel</a></li>
    </ul>
    <ul class="content-icon">
      <li class="icon">
        <i class="iconfont icon-RectangleCopy"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ListTop',
  setup () {
    const input = ref()
    const DomInput = ref()
    const onFocus = () => {
    }
    return { input, DomInput, onFocus }
  },
  mounted () {
    console.log(this.$refs.DomInput.style)
  }
}
</script>

<style lang="less" scoped>
.list-top {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 80px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 100%;
  .logo {
    height: 30px;
    width: 50px;
    background-color: #999;
    margin-left: 50px;
  }
  /deep/.el-input {
    margin-left: 25px;
    width: 400px;
    .el-input__inner {
      height: 48px;
      box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.1);
      font-size: 22px;
      padding-left: 45px;
    }
  }
  .icon-search:before {
    color: #999;
    position: absolute;
    top: 15px;
    left: 0px;
    font-size: 28px;
  }
  .icon {
    display: inline-block;
    margin-left: 200px;
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.1);
    .icon-RectangleCopy:before {
      color: rgba(0, 0, 0, 0.5);
      /* display: block; */
      text-align: center;
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 24px;
    }
  }
  .content-nav {
    margin-left: 130px;
    li {
      display: inline-block;
      margin-right: 70px;
      a {
        color: #4b5c8d;
        font-size: 24px;
      }
    }
  }
}
</style>