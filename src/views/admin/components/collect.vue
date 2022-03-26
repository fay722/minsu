<template>
  <div class="collect">
    <el-table :data="collectInfo" style="width: 100%">
      <el-table-column label="民宿编号" prop="id" width="150" />
      <el-table-column label="民宿标题" prop="title" width="550" />
      <el-table-column label="收藏数量" prop="nums"> </el-table-column>
      <el-table-column align="right">
        <!-- <template #header>
          <el-input v-model="search" size="small" placeholder="输入民宿编号或标题" @change="searchFn" />
        </template> -->
        <template #default="scope">
          <el-button size="small" @click="userCollect(scope.row)">用户详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="dialogTableVisible" title="收藏此民宿的用户列表">
    <el-table :data="gridData" center>
      <el-table-column property="id" label="id" />
      <el-table-column property="userName" label="userName" />
      <el-table-column property="tel" label="tel" />
    </el-table>
  </el-dialog>
</template>

<script>
import { getHomestays } from '@/api/homestays'
import { getMyAllCollect, getCollectUser } from '@/api/collect'
import { reactive, ref, watch } from 'vue'
export default {
  name: 'collect',
  setup () {
    const collectInfo = ref([])
    getHomestays().then(data => {
      collectInfo.value = data.data
    })
    watch(() => collectInfo.value, () => {
      //   console.log(collectInfo.value);
    }, { immediate: true })
    const haveNum = ref([])
    getMyAllCollect().then(data => {
      //   console.log('111', data);
      haveNum.value = data.data.results
      if (data.data.status === 0) {
        // console.log(collectInfo.value)
        // console.log(haveNum.value);
        collectInfo.value.forEach(item => {
          item.nums = 0
          haveNum.value.forEach(i => {
            if (i.id === item.id) {
              item.nums = i.nums
              //   console.log(item);
            }
          })
        })
      }
    })
    // 获取民宿收藏用户
    const gridData = ref([])
    const dialogTableVisible = ref(false)
    const currentIndex = ref('')
    const userCollect = (value) => {
      dialogTableVisible.value = true
      currentIndex.value = value.id
      getCollectUser({ id: currentIndex.value }).then(data => {
        if (data.data.status === 0) {
          gridData.value = data.data.results
          console.log(gridData.value);
        }
      })
    }

    return { collectInfo, userCollect, dialogTableVisible, gridData }
  }
}
</script>
<style lang="less" scoped>
.collect {
  padding: 80px 0 0 260px;
  /deep/.el-table .el-table__cell {
    text-align: center;
  }
}
</style>