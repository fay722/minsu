<template>
  <div class="register-form">
    <Form class="r-f" ref="formCom" :validation-schema="schema" v-slot="{ errors }" autocomplete="off">
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
          <label class="text" for="">请输入手机号：</label>
          <Field type="text" name="tel" v-model="userInfo.tel" />
        </div>
        <div class="error" v-if="errors.tel">
          <i class="iconfont icon-cry"></i>{{ errors.tel}}
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
      <div class="form-item">
        <div class="input">
          <label class="text" for="">请确定密码：</label>
          <Field type="password" name="newPwd" v-model="userInfo.comPwd" />
        </div>
        <div class="error" v-if="comPwdInfo">
          <i class="iconfont icon-cry"></i>两次密码不一致
        </div>
      </div>
    </Form>
    <!-- 按钮 -->
    <button class="btn" @click="registerFn">注册</button>
  </div>
</template>

<script>
import veeSchema from '../../../utils/vee-validate-schema'
import { Form, Field } from 'vee-validate'
import { reactive, ref, watch } from 'vue'
import { userRequest } from '../../../api/user'
import { ElMessage } from 'element-plus'
export default {
  name: 'RegisterForm',
  components: {
    Form,
    Field
  },
  setup (props, { emit }) {
    const userInfo = reactive({
      userName: '',
      tel: '',
      userPassword: '',
      comPwd: ''
    })

    const comPwdInfo = ref(false)
    watch(() => userInfo.comPwd, () => {
      if (userInfo.comPwd !== userInfo.userPassword) {
        comPwdInfo.value = true
      } else {
        comPwdInfo.value = false
      }
    })

    const schema = {
      userName: veeSchema.userName,
      userPassword: veeSchema.userPassword,
      tel: veeSchema.tel,
    }

    const formCom = ref(null)

    const registerFn = () => {
      try {
        userRequest(userInfo).then((data) => {
          if (data.data.status === 0) {
            ElMessage({
              message: '注册成功！去登陆吧！',
              type: 'success',
              center: true,
            })
            emit('chang-login')
          } else if (data.data.status === 1) {
            ElMessage({
              message: '用户名被注册！',
              type: 'warning',
              center: true,
            })
          } else {
            ElMessage({
              message: '用户名或账号不能为空！',
              type: 'error',
              center: true,
            })
          }
        })
      } catch (error) {
        ElMessage({
          message: '出错啦！请稍后再试！',
          type: 'error',
          center: true,
        })
      }
    }

    return { userInfo, schema, formCom, registerFn, comPwdInfo }
  }
}
</script>

<style lang="less" scoped>
.register-form {
  width: 400px;
  height: 100px;
  margin: 10px auto;
  .r-f {
    padding-left: 10px;
    color: #fff;
    font-size: 20px;
    .form-item {
      position: relative;
      .text {
        width: 150px;
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