<template>
  <div class="list-top">
    <div class="logo">
      <img src="@/assets/images/logo-3.png" alt="" class="logo-img">
    </div>
    <el-input v-model="input" placeholder="Please input" clearable class="focusInput" ref="DomInput" @change="searchFn">
      <template #prefix>
        <el-icon class="iconfont icon-search">
        </el-icon>
      </template>
    </el-input>
    <ul class="content-nav">
      <li><a href="">首页</a></li>
      <li>
        <router-link to="/list">民宿</router-link>
      </li>
      <li>
        <router-link to="/tips" href="">攻略</router-link>
      </li>
      <li><a href="">消息</a></li>
      <li><a href="">帮助</a></li>
      <li><a href="">手机端</a></li>
    </ul>
    <ul class="content-icon">
      <li class="icon" @click="$router.push('/personal')">
        <i class="iconfont icon-RectangleCopy"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearchHomestay } from '@/api/homestays'
import { ref, watch } from 'vue'
export default {
  name: 'ListTop',
  setup (props, { emit }) {
    const input = ref()
    const DomInput = ref()

    // const test = () => {
    //   DomInput.input.focus()
    // }
    // test()
    const searchResult = ref([])
    const searchFn = () => {
      getSearchHomestay({ key: input.value }).then(data => {
        // console.log(data);
        searchResult.value = data.data.results
        emit('searchResults', searchResult.value)
      })
    }
    watch(() => searchResult.value, () => {
      // console.log('1');
      emit('searchResults', searchResult.value)
    })
    return { input, DomInput, searchFn }
  },
  mounted () {
    this.$refs.DomInput.focus()
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
    margin-left: 50px;
    .logo-img {
      width: 100px;
    }
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
    margin-left: 165px;
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
    margin-left: 200px;
    li {
      height: 80px;
      box-sizing: border-box;
      display: inline-block;
      margin-right: 30px;
      a {
        line-height: 80px;
        color: #4b5c8d;
        font-size: 16px;
      }
    }
    li:hover {
      border-bottom: 2px solid #000;
    }
  }
}
</style>