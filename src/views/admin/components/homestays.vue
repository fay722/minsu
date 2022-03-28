<template>
  <div class="homestays" v-if="addFormVisible">
    <el-button class="public" type="primary" round @click="addFn">添加</el-button>
    <!-- <el-button class="public" type="primary" round>全部删除</el-button> -->
    <el-table :data="homestaysTableData" style="width: 100%">
      <el-table-column label="id" prop="id" width="50px" />
      <el-table-column label="标题" prop="title" class="ellipsis-2" />
      <el-table-column label="城市" prop="city" />
      <el-table-column label="位置" prop="position" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="价格" prop="price" />
      <el-table-column label="设施" prop="details" />
      <el-table-column label="详情图片" prop="image">
        <template #default="scope">
          <el-button size="small" @click="image(scope.row)">详情图</el-button>
        </template>
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

  <!-- 查看图片详情 -->
  <el-dialog v-model="imageVisible" title="图片详情">
    <img v-for="(item,index) in imgArr" :key="index" :src="item" alt="">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="imageVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改 -->
  <el-dialog v-model="editFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.city" autocomplete="off" /> -->
        {{form.city}}
      </el-form-item>
      <el-form-item label="位置" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.position" autocomplete="off" /> -->
        {{form.position}}
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-input v-model="form.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off" onkeyup="value=value.replace(/[^\d]/g,0)" />
      </el-form-item>
      <el-form-item label="设施" :label-width="formLabelWidth">
        <el-input v-model="form.details" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select class="m-2" placeholder="Select" size="small" v-model="form.status">
          <el-option label=0 value=0 />
          <el-option label=1 value=1 />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDelFn">确认</el-button>
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
import { delHomestays, editHomestay } from '@/api/admin'
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

    // 查看详情图
    const imageVisible = ref(false)
    const imgArr = ref([])
    const image = (value) => {
      console.log(value);
      imageVisible.value = true
      imgArr.value = value.image.split(';')
      console.log(imgArr.value);
    }


    // 修改
    const form = ref(null)
    const editFormVisible = ref(false)
    const formLabelWidth = '140px'
    const currentEditIndex = ref(null)
    const handleEdit = (value) => {
      editFormVisible.value = true
      currentEditIndex.value = value.id
      form.value = { ...value }
      console.log(form.value.details);
    }

    const confirmDelFn = () => {
      for (var i in form.value) {
        if (!form.value[i]) return ElMessage({ message: '请继续填写信息！', type: 'error', center: true })
        // if (!form[i]) return console.log(form[i]);

      }
      if (form.price <= 1 || form.price > 10000) return ElMessage({ message: '价格不合理!', type: 'error', center: true })
      let detailsArr = form.value.details.split(';')
      if (detailsArr.length < 3) return ElMessage({ message: '请继续填写！', type: 'error', center: true })
      let position = form.value.position.split(',')
      for (var i in position) {
        if (!position[i]) return ElMessage({ message: '请继续填写详细信息！', type: 'error', center: true })
      }
      editHomestay({ form: form.value, id: currentEditIndex.value }).then(data => {
        if (data.data.status === 0) {
          ElMessage({ message: '修改成功', type: 'success', center: true, })
          getHomestays().then(data => {
            homestaysTableData.value = data.data
          })
          editFormVisible.value = false
        } else {
          ElMessage({ message: '修改失败', type: 'error', center: true, })
        }
      })
    }

    return { homestaysTableData, addFormVisible, addFn, watchMainImage, delouterVisible, delFn, delInfoFn, image, imageVisible, imgArr, handleEdit, editFormVisible, form, formLabelWidth, confirmDelFn }
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