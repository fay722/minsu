<template>
  <div class="home-nav">
    <div class="content">
      <div class="logo">
      </div>
      <ul class="content-nav">
        <li><a href="">Home</a></li>
        <li>
          <router-link to="/list">Room</router-link>
        </li>
        <li><a href="">Travel</a></li>
      </ul>
      <ul class="content-icon">
        <li class="icon">
          <i class="iconfont icon-search" @click="isInput = !isInput"></i>
        </li>
        <li class="icon">
          <i class="iconfont icon-RectangleCopy"></i>
        </li>
      </ul>
      <translation name="fade">
        <h1 class="text">来一场所走就走的旅行</h1>
      </translation>
    </div>
    <Transition name="input">
      <el-input v-model="input" size="default" placeholder="Please" v-show="isInput"></el-input>
    </Transition>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home-Nav',
  setup () {
    const input = ref('')
    const isInput = ref(false)
    return { input, isInput, }
  }
}
</script>

<style lang="less" scoped>
.home-nav {
  overflow: hidden;
  height: 800px;
  background: url(@/assets/images/home-1.jpeg) no-repeat;
  .content {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    font-size: 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    .logo {
      margin-left: 100px;
      width: 167px;
      height: 44px;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .content-nav {
      flex: 1;
      margin-left: 120px;
      li {
        display: inline-block;
        margin-right: 50px;
        a {
          color: #fff;
        }
      }
    }
    .content-icon {
      float: right;
      margin-right: 100px;
      .icon {
        display: inline-block;
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: rgba(255, 255, 255, 0.2);
        .icon-search:before,
        .icon-RectangleCopy:before {
          color: #fff;
          /* display: block; */
          text-align: center;
          position: absolute;
          top: 8px;
          left: 13px;
          font-size: 24px;
        }
        .icon-RectangleCopy:before {
          font-size: 28px;
          top: 6px;
          left: 11px;
        }
      }
      :first-child {
        margin-right: 15px;
      }
    }
  }
  .el-input {
    justify-content: flex-end;
    margin-right: 150px;
    padding-right: 150px;
    margin-top: 1px;
  }
  /deep/.el-input__inner {
    width: 250px;
    height: 50px;
    font-size: 24px;
    padding: 0 5px;
  }
  .text {
    color: #fff;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -100%);
    font-size: 68px;
  }
}
.input {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>