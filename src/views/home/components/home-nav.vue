<template>
  <div class="home-nav">
    <div class="content">
      <div class="logo">
        <img src="@/assets/images/logo.png" class="logo-img" alt="">
      </div>
      <ul class="content-nav">
        <li><a href="">Home</a></li>
        <li>
          <router-link to="/list">Room</router-link>
        </li>
        <li><a href="">Travel</a></li>
        <li><a href="">History</a></li>
        <li><a href="">Message</a></li>
      </ul>
      <ul class="content-icon">
        <li class="icon">
          <i class="iconfont icon-search" @click="$router.push('/list')"></i>
        </li>
        <li class="icon" @click="$router.push('/personal')">
          <i class="iconfont icon-RectangleCopy"></i>
        </li>
      </ul>
      <translation name="fade">
        <h1 class="text">来一场所走就走的旅行</h1>
      </translation>
    </div>
    <!-- <el-input v-model="input" size="default" placeholder="Please" v-show="isInput" @change="searchFn"></el-input> -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { getSearchHomestay } from '@/api/homestays'
import { useRouter } from 'vue-router'
export default {
  name: 'Home-Nav',
  setup () {
    const input = ref('')
    const isInput = ref(false)

    const router = useRouter()

    const searchResult = ref([])
    const searchFn = () => {

      getSearchHomestay({ key: input.value }).then(data => {
        router.push('/list')
        console.log(data);
      })
    }

    return { input, isInput, searchFn }
  }
}
</script>

<style lang="less" scoped>
.home-nav {
  position: relative;
  overflow: hidden;
  height: 800px;
  background: url(@/assets/images/home-1.jpeg) no-repeat;
  .content {
    // position: relative;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    font-size: 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    .logo {
      margin-left: 130px;
      // width: 167px;
      // height: 44px;
      // background: url(@/assets/images/logo.png) no-repeat;
      .logo-img {
        width: 130px;
      }
    }
    .content-nav {
      flex: 1;
      margin-left: 190px;
      li {
        display: inline-block;
        margin-right: 50px;
        a {
          font-size: 16px;
          font-family: "Nunito Sans", sans-serif !important;
          font-weight: 400;
          color: #fff;
          &:hover {
            color: #303959;
          }
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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