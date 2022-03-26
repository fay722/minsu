<template>
  <div class="homestays" v-if="addFormVisible">
    <el-button class="public" type="primary" round @click="addFn">添加</el-button>
    <!-- <el-button class="public" type="primary" round>全部删除</el-button> -->
    <el-table :data="homestaysTableData" style="width: 100%">
      <el-table-column label="id" prop="id" width="50px" />
      <el-table-column label="名字" prop="title" class="ellipsis-2" />
      <el-table-column label="城市" prop="city" />
      <el-table-column label="位置" prop="position" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="价格" prop="price" />
      <el-table-column label="设施" prop="details" />
      <el-table-column label="详情图片" prop="image">
        <el-button size="small" @click="handleEdit()">详情图</el-button>
      </el-table-column>
      <el-table-column label="状态" prop="status" />

      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="搜索内容" @change="searchFn" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="delFn(scope.row)">Del</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <addHomestay @goBack="addFn" v-else />
  <!-- 删除 -->
  <el-dialog v-model="delouterVisible" title="Warning" width="30%" center>
    <span>您确认要删除此条民宿信息数据吗?此操作不可逆！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="delouterVisible = false">取消</el-button>
        <el-button type="primary" @click="delInfoFn">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import { getHomestays } from '@/api/homestays'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import addHomestay from './addHomestay.vue'
import { ElMessage } from 'element-plus'
import { delHomestays } from '@/api/admin'
export default {
  name: 'AdminHomestays',
  components: {
    addHomestay
  },
  setup () {
    const homestaysTableData = ref([])
    getHomestays().then(data => {
      // console.log(data);
      homestaysTableData.value = data.data
      // console.log(homestaysTableData.value);
    })

    // 看主图
    const watchMainImage = (id) => {
      console.log(id);

      // console.log(homestaysTableData.value);
    }

    const router = useRouter()
    // 添加
    const addFormVisible = ref(true)
    const newHomestay = reactive({

    })
    const addFn = () => {
      addFormVisible.value = !addFormVisible.value
      getHomestays().then(data => {
        // console.log(data);
        homestaysTableData.value = data.data
        // console.log(homestaysTableData.value);
      })
    }

    // 删除
    const delouterVisible = ref(false)
    const currentIndex = ref('')
    const delFn = (value) => {
      currentIndex.value = value.id
      delouterVisible.value = true
    }
    const delInfoFn = () => {
      delHomestays({ id: currentIndex.value }).then(data => {
        if (data.data.status === 0) {
          delouterVisible.value = false
          getHomestays().then(data => {
            // console.log(data);
            homestaysTableData.value = data.data
            // console.log(homestaysTableData.value);
          })
          ElMessage({
            message: '删除成功',
            type: 'success',
            center: true,
          })
        } else {
          ElMessage({
            message: '删除失败',
            type: 'error',
            center: true,
          })
        }
      })
    }

    return { homestaysTableData, addFormVisible, addFn, watchMainImage, delouterVisible, delFn, delInfoFn }
  }

}
</script>

<style lang="less" scoped>
.homestays {
  padding: 80px 0 0 260px;
  .public {
    // background-color: #5b9df8;
    color: #eff1f5;
    border: none;
    background-color: #313956;
  }
  /deep/.el-table .el-table__cell {
    text-align: center;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>