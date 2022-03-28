<template>
  <div class="order">
    <!-- 按钮 -->
    <div class="button">
      <el-button class="public" type="primary" round @click="active(null)" :class="{activeButton:activeIndex===null}">
        全部订单
      </el-button>
      <el-button class="public" type="primary" round @click="active('noShow')"
        :class="{activeButton:activeIndex==='noShow'}">
        未入住订单
      </el-button>
      <el-button class=" public" type="primary" round @click="active('toCheck')"
        :class="{activeButton:activeIndex==='toCheck'}">
        已入住订单
      </el-button>
      <el-button class="public" type="primary" round @click="active('unsubscribe')"
        :class="{activeButton:activeIndex==='unsubscribe'}">
        退订订单
      </el-button>
    </div>
    <!-- 显示列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="订单编号" width="80" />
      <el-table-column prop="formDate" label="订单时间" />
      <el-table-column prop="userId" label="用户id" width="70" />
      <el-table-column prop="userName" label="用户名称" />
      <el-table-column prop="title" label="民宿标题" class="ellipsiss" />
      <el-table-column prop="reserveDate" label="入住时间" />
      <el-table-column prop="checkOutDate" label="退房时间" />
      <el-table-column prop="peoples" label="入住人数" />
      <el-table-column prop="person" label="入住人" />
      <el-table-column prop="tel" label="联系方式" />
      <el-table-column prop="statusText" label="当前状态" />

    </el-table>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { getAllOrder } from '@/api/admin'
export default {
  name: 'AdminOrder',
  setup () {
    // 按钮
    const activeIndex = ref(null)
    const active = (value) => {
      activeIndex.value = value
    }

    // 获取数据
    const tableData = ref([])

    watch(() => activeIndex.value, async () => {
      await getAllOrder().then(data => {
        // console.log(data);
        tableData.value = data.data.results
        console.log(tableData.value);
        tableData.value.forEach(item => {
          if (item.orderStatus === '0') {
            item.statusText = '未入住'
          } else if (item.orderStatus === 1) {
            item.statusText = '已入住'
          } else {
            item.statusText = '已退订'
          }
        })
      })
      if (activeIndex.value === 'noShow') {
        console.log('11');
        tableData.value = tableData.value.filter(item => item.orderStatus === '0')
      } else if (activeIndex.value === 'toCheck') {
        tableData.value = tableData.value.filter(item => item.orderStatus === 1)
      } else if (activeIndex.value === 'unsubscribe') {
        tableData.value = tableData.value.filter(item => item.orderStatus === 2)
      }
    }, { immediate: true })

    return { active, activeIndex, tableData }
  }
}
</script>

<style lang="less" scoped>
.order {
  padding: 80px 0 0 260px;
  .button {
    margin-bottom: 10px;
    .public {
      // background-color: #5b9df8;
      color: #313956;
      border: none;
      background-color: #eff1f5;
    }
    .activeButton {
      color: #eff1f5;
      border: none;
      background-color: #313956;
    }
  }
  /deep/.cell {
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>