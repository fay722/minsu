<template>
  <!-- <div v-if="!permissions">无权限</div> -->
  <el-container class="layout-container-demo">
    <el-header>
      <span class="welcome">
        欢迎您 {{$store.state.user.user.userName}}
      </span>
      <span class="title">旅游民宿后台管理</span>
      <span class="quit" @click="quit">
        退出登录
      </span>
    </el-header>
    <el-container>
      <el-aside width="180px" style="background-color:rgb(238, 241, 246)">
        <el-menu>
          <el-menu-item index="1" @click="$router.push('/admin/homeIndex')">
            <i class="iconfont icon-home-filling"></i>
            首页
          </el-menu-item>
          <el-menu-item index="2" @click="$router.push('/admin/user')">
            <i class="iconfont icon-user-filling"></i>
            用户信息
          </el-menu-item>
          <el-menu-item index="3" @click="$router.push('/admin/homestays')">
            <i class="iconfont icon-dynamic-filling"></i>
            民宿信息
          </el-menu-item>
          <el-menu-item index="4" @click="$router.push('/admin/order')">
            <i class="iconfont icon-edit-filling"></i>
            订单信息
          </el-menu-item>
          <el-menu-item index="5" @click="$router.push('/admin/tips')">
            <i class="iconfont icon-map-filling"></i>
            攻略信息
          </el-menu-item>
          <el-menu-item index="5" @click="$router.push('/admin/collect')">
            <i class="iconfont icon-favorite-filling"></i>
            收藏情况
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table> -->
        </el-main>

      </el-container>

    </el-container>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  name: 'adminHome',
  setup () {
    const store = useStore()
    const router = useRouter()
    const quit = () => {
      store.commit('setUser', {})
      ElMessage({
        message: '已退出!',
        type: 'success',
        center: true,
      })
      router.push('/login')
    }
    return { quit }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .title {
    font-size: 24px;
  }
}
.el-aside {
  padding-top: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  height: 100vh;
}
.layout-container-demo .el-header {
  height: 70px;
  position: relative;
  background-color: #2f3958;
  color: #fff;
  padding-left: 40px;
  line-height: 70px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  .quit {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    margin-right: 20px;
  }
}
.layout-container-demo .el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  // background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
// /deep/.el-icon svg {
//   display: none;
// }
.iconfont {
  margin: 0 20px;
}

.el-menu-item {
  background-color: rgb(238, 241, 246);
  color: #313956;
}
/deep/.el-table th.el-table__cell > .cell {
  color: #313956;
}
/deep/.el-input__inner {
  border: 1px solid #ccc;
}
</style>