<template>
  <div class="home-top">
    <div class="container">
      <ul>
        <template v-if="userInfo.userName">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>{{ userInfo.userName }}</a>
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <template v-if="userInfo.userName==='admin'">
          <li>
            <router-link to="/admin">返回后台</router-link>
          </li>
        </template>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <!-- <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li> -->
      </ul>
    </div>
  </div>
  <!-- 二级路由 -->
  <router-view></router-view>
  <!-- 底部 -->
  <footer class="app-footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-customer-service"></i> 在线客服</dd>
          <dd><i class="iconfont icon-help"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="../assets/images/erweima.jpeg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">
            400-0000-000 <small>周一至周日 8:00-18:00</small>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>安全保障</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>专业服务</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">加入我们</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 20级升一班fjy</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'Layout',
  setup () {
    const store = useStore()
    const router = useRouter()
    // console.log(store.state.user)
    const userInfo = computed(() => {
      return store.state.user.user
    })
    const logout = () => {
      store.commit('setUser', {})
      ElMessage({
        message: '已退出!',
        type: 'success',
        center: true,
      })
      router.push('/login')
    }
    return { userInfo, logout }
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
.app-footer {
  margin-top: 100px;
  border-top: 1px solid #ccc;
  overflow: hidden;
  background-color: #f5f5f5;
  // padding-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 0;
      display: flex;
    }
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }
      &:hover {
        .iconfont {
          color: #88b0eb;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .qrcode {
      width: 90px;
      height: 90px;
      padding: 7px;
      border: 1px solid #ededed;
    }
    .download {
      padding-top: 25px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: #88b0eb;
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #2f3958;
  }
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>