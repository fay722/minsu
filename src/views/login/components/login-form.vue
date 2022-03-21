<template>
  <div class="login-form">
    <Form class="l-f" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
      <div class="form-item">
        <div class="input">
          <label class="text" for="">请输入账号：</label>
          <Field type="text" name="userName" v-model="userInfo.userName" />
        </div>
        <div class="error" v-if="errors.userName">
          <i class="iconfont icon-cry"></i>{{ errors.userName }}
        </div>
      </div>
      <div class="form-item">
        <div class="input">
          <label class="text" for="">请输入密码：</label>
          <Field type="password" name="userPassword" v-model="userInfo.userPassword" />
        </div>
        <div class="error" v-if="errors.userPassword">
          <i class="iconfont icon-cry"></i>{{ errors.userPassword }}
        </div>
      </div>
    </Form>
    <!-- 按钮 -->
    <button class="btn" @click="loginFn">登陆</button>
  </div>
</template>

<script>
import veeSchema from '../../../utils/vee-validate-schema'
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
import { userLogin } from '../../../api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    const userInfo = reactive({
      userName: null,
      userPassword: null,
    })

    const schema = {
      userName: veeSchema.userName,
      userPassword: veeSchema.userPassword
    }
    const router = useRouter()
    const store = useStore()

    const loginFn = () => {
      console.log('1')
      try {
        userLogin(userInfo).then((data) => {
          if (data.data.status === 0) {
            // console.log(data.data)
            ElMessage({
              message: '登陆成功',
              type: 'success',
              center: true,
            })
            const { token } = data.data
            const userName = userInfo.userName
            // console.log('userName', userName);
            // 将token放入本地内存
            store.commit('setUser', { userName, token })
            if (data.data.userStatus === 1) {
              return router.push('/admin')
            }
            router.push('/')
          } else if (data.data.status === 1) {
            ElMessage({
              message: data.data.message,
              type: 'error',
              center: true,
            })
          }
        })
      } catch (error) {

      }
    }
    return { userInfo, schema, loginFn }
  }
}
</script>

<style lang="less" scoped>
.login-form {
  width: 400px;
  height: 100px;
  margin: 10px auto;
  .l-f {
    padding-left: 30px;
    color: #fff;
    font-size: 20px;
    .form-item {
      position: relative;
      .text {
        display: inline-block;
        // width: 180px;
        text-align: right;
      }
      input {
        position: relative;
        // margin-bottom: 10px;
        height: 30px;
        width: 200px;
        font-size: 16px;
        margin-bottom: 28px;
      }
      .error {
        position: absolute;
        top: 30px;
        left: 125px;
        font-size: 12px;
      }
    }
  }
  .btn {
    font-size: 20px;
    width: 252px;
    height: 50px;
    background-color: #fff;
    color: #000;
    border: none;
    border-radius: 10px;
    margin: 40px 0 0 80px;
  }
}
</style>