<template>
  <div class="tips">
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
          <li>
            <router-link to="/tips">Travel</router-link>
          </li>
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
    <div class="content w">
      <div class="item" v-for="item in tipsInfoArr" :key="item.id">
        <img class="tipImg" :src="item.image" alt="">
        <div class="title ellipsis">{{item.title}}</div>
        <div class="tipText ellipsis-4 " v-html="item.content">
        </div>
        <el-button class="watch" @click="$router.push(`/tips/tipContent/${item.id}`)">查看</el-button>
      </div>
    </div>
    <div class="footer">
      <img class="footerImg" src="@/assets/images/1111.png" alt="">
      <div class="writing">
        <span class="writing1">来一次说走走的旅行吧！</span>
        <span class="writing2">旅行是一个过程，一次发现。是一个自我发现的过程。真正的旅行让我们直面自我。</span>
      </div>
      <el-button class="goHome" round @click='$router.push("/")'>预定民宿</el-button>
    </div>
  </div>
</template>

<script>
import { getAllTips } from '@/api/tips'
import { ref } from 'vue'
import HomeNav from '../home/components/home-nav.vue'
export default {
  name: 'tips',
  components: {
    HomeNav
  },
  setup () {
    const tipsInfoArr = ref([])
    getAllTips().then(data => {
      console.log(data);
      tipsInfoArr.value = data.data.results
      console.log(tipsInfoArr.value);
    })

    return { tipsInfoArr }
  }
}
</script>

<style lang="less" scoped>
.tips {
  .home-nav {
    position: relative;
    overflow: hidden;
    height: 800px;
    background: url(@/assets/images/home-2.jpeg) no-repeat;
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
  .content {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      //   flex: 1;
      width: 30%;
      height: 390px;
      //   margin-right: 20px;
      background-color: #f0f2f8;
      margin-top: 10px;
      .tipImg {
        width: 100%;
        height: 200px;
      }
      .title {
        padding: 8px 20px;
        font-size: 20px;
        font-family: "Playfair Display", Arial, serif;
      }
      .tipText {
        padding: 0 20px;
        color: #828282;
      }
      .watch {
        margin-left: 20px;
        margin-top: 15px;
        width: 80px;
        background-color: #313956;
        border: none;
        color: #fff;
      }
    }
  }
  .footer {
    background-color: #416794;
    height: 220px;
    margin-top: 100px;
    margin-bottom: 20px;
    overflow: hidden;
    .footerImg {
      float: left;
      margin-top: 40px;
      margin-left: 150px;
    }
    .writing {
      float: left;
      margin-top: 75px;
      overflow: hidden;
      .writing1 {
        font-family: "Playfair Display", Arial, serif;
        display: block;
        font-size: 30px;
        color: #fff;
        margin-left: 30px;
      }
      .writing2 {
        margin-left: 30px;
        display: block;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .goHome {
      margin-top: 90px;
      margin-left: 30px;
      width: 120px;
      height: 40px;
      color: #416794;
    }
  }
}
</style>