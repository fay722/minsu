<template>
  <div class="adminUser">
    <el-button class="public" type="primary" round @click="addFn">添加</el-button>
    <!-- <el-button class="public" type="primary" round>全部删除</el-button> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="id" />
      <el-table-column label="userName" prop="userName" />
      <el-table-column label="tel" prop="tel" />
      <el-table-column label="status" prop="status"> {{status?'管理员':'普通用户'}} </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="输入用户名" @change="searchFn" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="delFn(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 编辑弹窗 -->
  <el-dialog v-model="dialogFormVisible" title="编辑用户资料">
    <el-form :model="form">
      <el-form-item label="id" :label-width="formLabelWidth">
        {{form.id}}
      </el-form-item>
      <el-form-item label="userName" :label-width="formLabelWidth">
        <el-input type="text" name="userName" v-model="form.userName" />
      </el-form-item>
      <el-form-item label="tel" :label-width="formLabelWidth">
        <el-input type="text" name="tel" v-model="form.tel" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmFn(form.id)">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加弹窗 -->
  <el-dialog v-model="addFormVisible" title="Shipping address">
    <el-form :model="newForm">
      <el-form-item label="userName" :label-width="formLabelWidth">
        <el-input v-model="newForm.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="tel" :label-width="formLabelWidth">
        <el-input v-model="newForm.tel" autocomplete="off" />
      </el-form-item>
      <el-form-item label="userPassword" :label-width="formLabelWidth">
        <el-input v-model="newForm.userPassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getAllUser } from '@/api/admin'
import { ref, reactive } from 'vue'
import { Edit, Share, Delete, Search, Upload } from '@element-plus/icons-vue'
import { editUser, deleteUser, searchUser } from '@/api/admin'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userRequest } from '@/api/user'
export default {
  name: 'AdminUser',
  setup () {
    const tableData = ref([])
    const shift = ref([])
    getAllUser().then(data => {
      shift.value = data.data.result.shift();
      tableData.value = data.data.result
      // console.log(tableData.value);
    })

    // 编辑弹窗
    const form = ref([])
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const handleEdit = (value) => {
      // console.log('value', value.userName)
      dialogFormVisible.value = true;
      form.value = { ...value }
      console.log(form);
    }
    const confirmFn = (id) => {
      // console.log(id);
      // console.log(form.value.userName);
      if (form.value.userName.length < 3 || form.value.userName.length > 10) {
        return ElMessage({ message: '用户名格式错误', type: 'error', center: true, })
      }
      if (form.value.tel.length !== 11 || !/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(form.value.tel)) {
        return ElMessage({ message: '手机号格式错误', type: 'error', center: true, })
      }
      editUser({ id: id, userName: form.value.userName, tel: form.value.tel }).then(data => {
        if (data.data.status === 0) {
          getAllUser().then(data => {
            shift.value = data.data.result.shift();
            tableData.value = data.data.result
          })
          ElMessage({ message: '修改成功', type: 'success', center: true, })
        }
      })
      dialogFormVisible.value = false
    }

    // 删除
    const delFn = (value) => {
      ElMessageBox.confirm(
        '你确定要删除该用户吗?',
        'Warning',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteUser({ id: value.id }).then((data) => {
          if (data.data.status == 0) {
            ElMessage({
              type: 'success', message: '删除成功！', center: true,
            })
            getAllUser().then(data => {
              shift.value = data.data.result.shift();
              tableData.value = data.data.result
            })
          } else {
            ElMessage({
              type: 'error', message: '删除失败！', center: true,
            })
          }
        })
      })
    }

    // 添加
    const newForm = reactive({
      userName: '',
      tel: '',
      userPassword: ''
    })
    const addFormVisible = ref(false)
    const addFn = () => {
      addFormVisible.value = true
    }
    const addConfirm = () => {
      console.log(newForm);
      if (newForm.userName.length < 3 || newForm.userName.length > 10) {
        return ElMessage({ message: '用户名为3-12个字符', type: 'error', center: true, })
      } else if (newForm.tel.length !== 11 || !/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(newForm.tel)) {
        return ElMessage({ message: '手机号格式错误', type: 'error', center: true, })
      } else if (newForm.userPassword.length < 6 || newForm.userPassword.length > 12) {
        return ElMessage({ message: '密码是6-12个字符', type: 'error', center: true, })
      }
      userRequest(newForm).then(data => {
        console.log(newForm);
        if (data.data.status === 1) {
          return ElMessage({ message: data.data.message, type: 'error', center: true, })
        } else if (data.data.status === 2) {
          return ElMessage({ message: '用户或密码格式不正确', type: 'error', center: true, })
        } else {
          ElMessage({ message: '添加成功', type: 'success', center: true, })
          getAllUser().then(data => {
            shift.value = data.data.result.shift();
            tableData.value = data.data.result
          })
          addFormVisible.value = false
        }
      })
    }

    // 搜索
    const search = ref('')
    const searchFn = () => {
      searchUser({ userName: search.value }).then(data => {
        if (data.data.status === 0) {
          ElMessage({ message: '搜索成功', type: 'success', center: true, })
          tableData.value = data.data.result.filter(item => item.userName !== 'admin')
        } else if (data.data.status === 1) {
          tableData.value = ''
          ElMessage({ message: '无结果', type: 'error', center: true, })
        }
      })
    }

    return { tableData, Delete, Edit, dialogFormVisible, handleEdit, search, formLabelWidth, form, confirmFn, delFn, addFn, addFormVisible, newForm, addConfirm, searchFn }
  }

}
</script>

<style lang="less" scoped>
.adminUser {
  padding: 80px 0 0 260px;
  .public {
    // background-color: #5b9df8;
    color: #eff1f5;
    border: none;
    background-color: #313956;
  }
  /deep/.cell {
    text-align: center;
  }
  /deep/.el-table__header-wrapper {
    border-bottom: 1px solid #eceef4 !important;
  }
  /deep/ th {
    border-bottom: none !important;
  }
  /deep/.editDel {
    width: 20px;
  }
  /deep/.el-icon {
    color: #fff;
  }
  /deep/ icon {
    color: #000;
  }
}
/deep/.el-input__inner {
  width: 300px;
}
</style>