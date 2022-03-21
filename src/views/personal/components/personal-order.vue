<template>
  <div class="personal-order">
    <ul v-if="isOk">
      <li class="order-item" v-for="item in info" @click="openOrder(item.orderId)">
        <div class="position">{{item.city}}</div>
        <div class="title ellipsis-2 ">{{item.title}}</div>
        <div class="days"> {{item.reserveDate}} to {{item.checkOutDate}}</div>
        <div class="tip" @click.stop="getTipFn(item.homeId,item.days,item.orderId)">推荐攻略</div>
      </li>
    </ul>
  </div>
  <!-- 订单详情弹层 -->
  <el-dialog v-model="dialogFormVisible" title="订单详情" v-if="info">
    <el-form>
      <el-form-item label="城市" :label-width="formLabelWidth">
        {{currentInfo.city}}
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        {{currentInfo.position}}
      </el-form-item>
      <el-form-item label="民宿" :label-width="formLabelWidth">
        {{currentInfo.title}}
      </el-form-item>
      <el-form-item label="订单时间" :label-width="formLabelWidth">
        {{currentInfo.formDate}}
      </el-form-item>
      <el-form-item label="入住时间" :label-width="formLabelWidth">
        {{currentInfo.reserveDate}}
      </el-form-item>
      <el-form-item label="退房时间" :label-width="formLabelWidth">
        {{currentInfo.checkOutDate}}
      </el-form-item>
      <el-form-item label="入住天数" :label-width="formLabelWidth">
        {{currentInfo.days}}天
      </el-form-item>
      <el-form-item label="入住人" :label-width="formLabelWidth">
        {{currentInfo.person}}
      </el-form-item>
      <el-form-item label="联系手机" :label-width="formLabelWidth">
        {{currentInfo.tel}}
      </el-form-item>
      <el-form-item label="总价" :label-width="formLabelWidth">
        &yen;{{currentInfo.price *currentInfo.days }}
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        {{currentInfo.status==='0'?'未入住':'已入住'}}
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="getTipFn(currentInfo.homeId, currentInfo.days, currentInfo.orderId)">攻略</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 攻略弹层 -->
  <el-dialog v-model="isTips" title="推荐攻略">
    <el-form>
      <el-form-item v-if="tip" v-html=" tip.content">
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" v-else>
        还未生成攻略
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="tipToOrder(oId)">订单详情</el-button>
        <el-button type="primary" @click="isTips = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { getOrder } from '@/api/order'
import { reactive, ref } from 'vue'
import { getTip } from '@/api/tips'
export default {
  name: "PersonalOrder",
  setup () {
    const isOk = ref(false)
    const info = ref([])
    getOrder().then(data => {
      isOk.value = true
      info.value = data.data.info
      //   console.log(info.value);
    })

    // 弹层
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const currentIndex = ref('')
    const currentInfo = ref([])
    const openOrder = (orderId) => {
      console.log('openOrderFn')
      dialogFormVisible.value = true
      //   console.log(orderId)
      currentIndex.value = info.value.findIndex(item => item.orderId === orderId)
      currentInfo.value = info.value[currentIndex.value]
      console.log('index', currentInfo.value);
    }

    // 攻略
    const isTips = ref(false)

    const orderToTip = () => {
      dialogFormVisible.value = false
      isTips.value = true

    }
    const tipToOrder = (orderId) => {
      console.log('orderId', orderId);
      isTips.value = false
      dialogFormVisible.value = true
      openOrder(orderId)
    }
    // 获取攻略
    const tip = ref([])
    const oId = ref(null)
    const getTipFn = (homeId, days, orderId) => {
      dialogFormVisible.value = false
      console.log('1');
      console.log(homeId, days)
      isTips.value = true
      oId.value = orderId
      getTip({ homeId, days }).then(data => {
        // console.log('tip', data);
        tip.value = data.data.result
        // tip.value.orderId = orderId
        console.log('tip', tip.value);
        console.log(oId.value);
      })
    }

    return { isOk, info, dialogFormVisible, formLabelWidth, openOrder, currentInfo, isTips, orderToTip, tipToOrder, getTipFn, tip, oId }
  }
}
</script>

<style lang="less" scoped>
.personal-order {
  .order-item {
    display: inline-block;
    margin-right: 25px;
    padding: 15px;
    width: 200px;
    height: 150px;
    border-radius: 20px;
    background-color: rgba(238, 234, 234, 0.308);
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
    .position {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
    }
    .title {
      font-size: 20px;
    }
    .days {
      font-size: 12px;
      margin-bottom: 10px;
    }
    .tip {
      color: #4e5b89;
      cursor: pointer;
    }
  }
}
/deep/.el-form-item__label {
  padding-right: 30px;
  font-weight: 600;
}
</style>