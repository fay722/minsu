<template>
  <div class="home-top">
    <div class="container">
      <ul>
        <!-- <template>
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i>{{ profile.account }}</a
            >
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template> -->
        <li>
          <router-link to="/login">请先登录</router-link>
        </li>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeTop'
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