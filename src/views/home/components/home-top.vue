<template>
  <div class="home-top">
    <div class="container">
      <ul>
        <template v-if="userInfo.user.token">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>{{ profile.account }}</a>
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">还是绘声绘色</router-link>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">111</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'HomeTop',
  setup () {
    const store = useStore()
    console.log(store.state.user.user)
    const userInfo = computed(() => {
      return store.state.user.user
    })
    console.log(userInfo)
    return { userInfo }
  }
}
</script>

<style lang="less" scoped>
.home-top {
  height: 50px;
  background-color: #2c395b;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: #88b0eb;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>