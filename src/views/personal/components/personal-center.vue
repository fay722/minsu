<template>
  <div class="PersonalCenter">
    <div class="box" v-if="userInfo.token">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="activeIndex = '1'">我的订单</el-menu-item>
        <!-- <el-sub-menu index="1">
          <template #title>我的订单</template>
          <el-menu-item index="1-0" @click="activeIndex = '1-0'">未入住</el-menu-item>
          <el-menu-item index="1-1" @click="activeIndex = '1-1'">已入住</el-menu-item>
          <el-menu-item index="1-2" @click="activeIndex = '1-2'">已退订</el-menu-item>
        </el-sub-menu> -->
        <el-menu-item index="2" @click="activeIndex = '2'">我的收藏</el-menu-item>

        <el-menu-item index="3" @click="activeIndex = '3'">修改密码</el-menu-item>

      </el-menu>
      <div class="content">
        <div class="order" v-if="activeIndex==='1'">
          <PersonalOrder />
        </div>
        <div class=" chang-psd" v-else-if="activeIndex==='3'">
          <span>你好！{{userInfo.userName}}</span>
          <Form ref="formCom" class="form-input" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
            <div class="form-item">
              <div class="input">
                <label class="text" for="">请输入原密码：</label>
                <Field type="password" name="oldPwd" v-model="userPassword.oldPwd" />
              </div>
              <div class="error" v-if="errors.oldPwd">
                <i class="iconfont icon-cry"></i>{{ errors.oldPwd }}
              </div>
            </div>
            <div class="form-item">
              <div class="input">
                <label class="text" for="">请输入新密码：</label>
                <Field type="password" name="newPwd" v-model="userPassword.newPwd" />
              </div>
              <div class="error" v-if="errors.newPwd">
                <i class="iconfont icon-cry"></i>{{ errors.newPwd }}
              </div>
            </div>
          </Form>
          <el-button class="confirm-change" type="primary" round @click="changPwdFn">确认修改</el-button>
        </div>
        <div class="myCollect" v-else>
          <PersonalCollect />
        </div>
      </div>
    </div>
    <div class="box" v-else>
      <div class="not-log">您未登陆！请<span style="color:#74a0f8" @click="$router.push('/login')">登陆</span></div>
    </div>
  </div>

</template>

<script>
import { ref, computed, reactive } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import veeSchema from '../../../utils/vee-validate-schema'
import { Form, Field } from 'vee-validate'
import { userChangPwd } from '@/api/user'
import { ElMessage } from 'element-plus'
import PersonalOrder from './personal-order.vue'
import PersonalCollect from './personal-collect.vue'
export default {
  name: 'PersonalCenter',
  components: {
    Form, Field, PersonalOrder, PersonalCollect
  },
  setup () {
    const activeIndex = ref("1");
    const store = useStore()
    const router = useRouter()
    const userInfo = store.state.user.user
    // console.log(userInfo);
    // const userInfo = computed(() => {
    //   return store.state.user.user
    // })

    const userPassword = reactive({
      oldPwd: '',
      newPwd: ''
    })
    const schema = {
      oldPwd: veeSchema.userPassword,
      newPwd: veeSchema.newPwd
    }
    const formCom = ref(null)
    const changPwdFn = async () => {
      const { valid } = await formCom.value.validate().then()
      console.log(valid) // true false
      if (valid) {
        userChangPwd({ oldPwd: userPassword.oldPwd, newPwd: userPassword.newPwd }).then(data => {
          const result = data.data
          console.log(result);
          if (result.status === 1) {
            return ElMessage({
              message: result.message,
              type: 'error',
              center: true,
            })
          }
          if (result.status === 2 && result.message === '\"newPwd\" contains an invalid value') {
            return ElMessage({
              message: '两次密码一致!',
              type: 'error',
              center: true,
            })
          }
          if (result.status === 0) {
            ElMessage({
              message: result.message,
              type: 'success',
              center: true,
            })
            store.commit('setUser', {})
            router.push('/login')
          }
        })
      }

    }

    return { activeIndex, userInfo, userPassword, schema, changPwdFn, formCom }
  }
}
</script>

<style lang="less" scoped>
.PersonalCenter {
  padding: 120px 0;
  .box {
    padding: 10px 20px;
    width: 1000px;
    height: 500px;
    margin: 0 auto;
    // border: 2px solid #ccc;
    border-radius: 20px;
    box-shadow: 10px 10px 50px 5px rgba(0, 0, 0, 0.1);
    .el-menu--horizontal > .el-menu-item {
      font-size: 20px !important;
    }
    .content {
      padding: 40px 20px;
      .chang-psd {
        width: 400px;
        margin: 0 auto;
        font-size: 18px;
        input {
          height: 26px;
          width: 200px;
          border: 1px solid #ccc;
        }
        .form-input {
          margin-top: 20px;
          .form-item {
            position: relative;
            margin-bottom: 25px;
            .error {
              position: absolute;
              top: 25px;
              left: 125px;
              font-size: 12px;
              color: #999;
            }
          }
        }
        .confirm-change {
          margin: 10px 120px;
        }
      }
    }
    .not-log {
      line-height: 500px;
      font-size: 24px;
      text-align: center;
    }
  }
}
/deep/.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  font-size: 20px;
}
</style>