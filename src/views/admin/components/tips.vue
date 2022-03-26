<template>
  <div class="tips">
    <el-button class="public" type="primary" round @click="AddTipFormVisible=true">添加</el-button>
    <!-- 表单 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="城市" prop="city" />
      <el-table-column label="天数" prop="days" />
      <el-table-column label="攻略" prop="content" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="输入城市或天数" @change="searchFn" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="delFn(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 添加攻略弹窗 -->
  <el-dialog v-model="AddTipFormVisible" title="添加攻略信息">
    <el-form :model="form">
      <el-form-item label="城市" :label-width="formLabelWidth">
        <elui-china-area-dht :leave="1" @change="onChange"></elui-china-area-dht>
      </el-form-item>
      <el-form-item label="天数" :label-width="formLabelWidth">
        <el-select v-model="formTip.days" placeholder="Please select days">
          <el-option :label="n" :value="n" v-for="n in 10 " :key="n" />
          <!-- <el-option label="Zone No.2" value="beijing" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="攻略" :label-width="formLabelWidth">
        <el-input v-model="formTip.content" :rows="5" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="AddTipFormVisible = false">取消</el-button>
        <el-button type="primary" @click="AddTipFn ">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 删除弹窗 -->
  <el-dialog v-model="delDialogVisible" title="Warning" width="30%">
    <span>您确定删除此条攻略信息？该操作不可逆！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDelFn">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改弹窗 -->
  <el-dialog v-model="editTipFormVisible" title="修改攻略信息">
    <el-form :model="editForm">
      <el-form-item label="城市" :label-width="formLabelWidth">
        {{editForm.city}}
      </el-form-item>
      <el-form-item label="天数" :label-width="formLabelWidth">
        {{editForm.days}} 天
      </el-form-item>
      <el-form-item label="攻略" :label-width="formLabelWidth">
        <el-input v-model="editForm.content" :rows="8" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editTipFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editTipFn">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import { getAllTips, addTip, delTip, editTip, searchTip } from '@/api/admin'
import { ref, reactive, watch } from 'vue'
import { EluiChinaAreaDht } from 'elui-china-area-dht'

import { ElMessage } from 'element-plus'
export default {
  name: 'AdminTips',
  components: {
    EluiChinaAreaDht
  },
  setup () {
    const tableData = ref([])
    getAllTips().then(data => {
      tableData.value = data.data.results
      // console.log(tableData.value);
    })

    // 添加攻略
    const AddTipFormVisible = ref(false)
    const formLabelWidth = '120px'
    const formTip = reactive({
      city: '',
      days: '',
      content: ''
    })
    // 城市
    const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
    function onChange (e) {
      const one = chinaData[e[0]]
      formTip.city = chinaData[e[0]].label
    }
    // 确定添加
    const AddTipFn = () => {
      if (formTip.city !== '' && formTip.days !== '' && formTip.content !== '') {
        addTip(formTip).then(data => {
          if (data.data.status === 0) {
            AddTipFormVisible.value = false
            ElMessage({ message: '添加成功', type: 'success', center: true, })
            getAllTips().then(data => {
              tableData.value = data.data.results
              // console.log(tableData.value);
            })
          } else if (data.data.status === 1) {
            ElMessage({ message: '攻略已添加过了，请勿重复添加！', type: 'warning', center: true, })
          } else {
            return ElMessage({ message: '添加失败', type: 'error', center: true, })
          }
        })
      } else {
        return ElMessage({ message: '请继续填写！！', type: 'error', center: true, })
      }
    }

    // 删除按钮
    const delDialogVisible = ref(false)
    const delIndex = ref('')
    const delFn = (value) => {
      delDialogVisible.value = true
      delIndex.value = value.id
    }
    const confirmDelFn = () => {
      delTip({ id: delIndex.value }).then(data => {
        if (data.data.status === 0) {
          ElMessage({ message: '删除成功', type: 'success', center: true, })
          getAllTips().then(data => {
            tableData.value = data.data.results
            // console.log(tableData.value);
          })
        } else {
          ElMessage({ message: '删除失败！请稍后再试！', type: 'error', center: true, })
        }
        delDialogVisible.value = false
      })
    }

    // 修改
    const editTipFormVisible = ref(false)
    const editForm = ref(null)
    const editIndex = ref('')
    const handleEdit = (value) => {
      editTipFormVisible.value = true
      editForm.value = { ...value }
      editIndex.value = value.id
    }
    const editTipFn = () => {
      editTip({ id: editIndex.value, content: editForm.value.content }).then(data => {
        if (data.data.status === 0) {
          ElMessage({ message: '修改成功', type: 'success', center: true, })
          getAllTips().then(data => {
            tableData.value = data.data.results
            // console.log(tableData.value);
          })
          editTipFormVisible.value = false
        } else {
          ElMessage({ message: '修改失败！请稍后再试！', type: 'error', center: true, })
        }
      })
    }

    // 搜索
    const search = ref('')
    const searchFn = () => {
      searchTip({ search: search.value }).then(data => {
        if (search.value === '') return
        if (data.data.status === 0) {
          tableData.value = data.data.results
          ElMessage({ message: '搜索成功', type: 'success', center: true, })
        } else if (data.data.status === 1) {
          tableData.value = ''
          ElMessage({ message: '无结果', type: 'warning', center: true, })
        } else {
          ElMessage({ message: '搜索失败', type: 'error', center: true, })
        }
      })
    }
    watch(() => search.value, () => {
      if (search.value === '') {
        getAllTips().then(data => {
          tableData.value = data.data.results
          // console.log(tableData.value);
        })
      }
    })

    return { tableData, AddTipFormVisible, formTip, formLabelWidth, chinaData, onChange, AddTipFn, delFn, confirmDelFn, delDialogVisible, handleEdit, editForm, editTipFormVisible, editTipFn, search, searchFn }
  }
}
</script>

<style lang="less" scoped>
.tips {
  padding: 80px 0 0 260px;
  .public {
    // background-color: #5b9df8;
    color: #eff1f5;
    border: none;
    background-color: #313956;
  }
  /deep/.el-table td.el-table__cell div {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
}
/deep/.el-input__inner {
  border: 1px solid #ccc;
}
</style>