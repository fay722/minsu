<template>
  <div class="personal-order-0">
    <ul v-if="isOk">
      <li class="order-item" v-for="item in newInfo" @click="openOrder(item.orderId)">
        <div class="position">{{item.city}}</div>
        <div class="title ellipsis-2 ">{{item.title}}</div>
        <div class="days"> {{item.reserveDate}} to {{item.checkOutDate}}</div>
        <div class="tip" @click.stop="getTipFn(item.city,item.days,item.orderId)">推荐攻略</div>
      </li>
    </ul>
    <div v-else class="noneText">您还有没订单！</div>
  </div>
  <!-- 订单详情弹层 -->
  <el-dialog v-model="dialogFormVisible" title="订单详情" v-if="info">
    <el-dialog v-model="innerVisible" title="Warning" width="30%" append-to-body>
      <span>你确定退订该房间吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="innerVisible = false">取消</el-button>
          <el-button type="primary" @click="tuiding">确定</el-button>
        </span>
      </template>
    </el-dialog>
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
        {{statusText}}
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-if="currentStatus==='0'" @click="unsubscribe(currentInfo.homeId,currentInfo.orderId)">退订
        </el-button>
        <el-button @click="getTipFn(currentInfo.city, currentInfo.days, currentInfo.orderId)">攻略</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 攻略弹层 -->
  <el-dialog v-model="isTips" title="推荐攻略">
    <el-form>
      <el-form-item v-if="isShow" v-html="tip.content">
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" v-else>
        {{message}}
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
import { getOrder, orderStatus2, orderStatus1 } from '@/api/order'
import { reactive, ref, watch } from 'vue'
import { getTip } from '@/api/tips'
import { ElMessage } from 'element-plus'
import { editTuidingStatus } from '@/api/homestays'
export default {
  name: "PersonalOrder",
  props: {
    activeIndex: {
      type: String
    }
  },
  setup (props) {


    const isOk = ref(false)
    const info = ref([])
    // getOrder().then(data => {
    //   info.value = data.data.info
    //   if (info.value.length > 0) isOk.value = true
    //   // console.log(info.value.filter(item => item.orderStatus === '0'));
    // })

    const newInfo = ref([])
    watch(() => props.activeIndex, (newVal) => {
      getOrder().then(data => {
        newInfo.value = []
        info.value = data.data.info
        if (info.value.length > 0) {
          isOk.value = true
          // console.log(info.value.filter(item => item.orderStatus === '0'));
          if (props.activeIndex === '1-0') {
            console.log('111---000');
            newInfo.value = info.value.filter(item => item.orderStatus === '0')
            console.log(newInfo.value);
          }
          if (props.activeIndex === '1-1') {
            console.log('1111-111');
            newInfo.value = info.value.filter(item => item.orderStatus === 1)
          }
          if (props.activeIndex === '1-2') {
            console.log('1111 - 222');
            newInfo.value = info.value.filter(item => item.orderStatus === 2)
          }
        }
      })


    }, { immediate: true })

    // 弹层
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const currentIndex = ref('')
    const currentInfo = ref([])
    const currentStatus = ref('')
    const statusText = ref('')
    const openOrder = (orderId) => {

      currentStatus.value = ''
      // console.log('openOrderFn')
      dialogFormVisible.value = true
      //   console.log(orderId)
      currentIndex.value = newInfo.value.findIndex(item => item.orderId === orderId)
      currentInfo.value = newInfo.value[currentIndex.value]
      currentStatus.value = currentInfo.value.orderStatus
      // console.log(currentStatus.value);

      // 对比时间
      let now = new Date() //当前时间
      let orderStartTime = new Date(currentInfo.value.reserveDate.replace(/-/g, "/"))
      console.log(now.getTime(), orderStartTime.getTime());
      if (currentStatus.value.orderStatus !== (2 || '2')) {
        if (now.getTime() > orderStartTime.getTime()) {
          // 已入住 to1
          // 当前时间比指定时间大
          orderStatus1(orderId).then(data => {
            console.log(data);
          })
          console.log('当前时间比指定时间大');
        } else {
          // 当前时间比指定时间小
          // 未入住 to2
          console.log('当前时间比指定时间小');
        }
      }


      if (currentStatus.value === '0') {
        statusText.value = '未入住'
      } else if (currentStatus.value === (1 || '1')) {
        statusText.value = '已入住'
      } else {
        statusText.value = '已退订'
      }
      console.log('11', currentInfo.value);
      // console.log('index', currentInfo.value);
    }


    // 攻略
    const isShow = ref(false)
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
    const message = ref('')
    const getTipFn = (city, days, orderId) => {
      isShow.value = false
      dialogFormVisible.value = false
      console.log('1');
      console.log(city, days)
      isTips.value = true
      oId.value = orderId
      getTip({ city, days }).then(data => {
        console.log('1111', tip.value.length);
        if (data.data.status === 3) {
          return message.value = data.data.message
        }
        if (data.data.status === 1) {
          console.log('44');
          console.log(data.data.message);
          return message.value = data.data.message
        }
        isShow.value = true
        tip.value = data.data.result
        // tip.value.orderId = orderId
        console.log('tip', tip.value);
        console.log(oId.value);
      })
    }

    // 退订
    const tuidingmingsuId = ref('')
    const tuidingdingdanId = ref('')
    const innerVisible = ref(false)
    const unsubscribe = (homeId, orderId) => {
      // console.log(id);
      tuidingmingsuId.value = homeId
      tuidingdingdanId.value = orderId
      innerVisible.value = true;
    }
    const tuiding = () => {
      innerVisible.value = false
      dialogFormVisible.value = false
      editTuidingStatus({ id: tuidingmingsuId.value }).then(data => {
        if (data.data.status === 0) {
          orderStatus2({ id: tuidingdingdanId.value }).then(data => {
            if (data.data.status === 0) {
              ElMessage({
                message: '退订成功',
                type: 'success',
                center: true,
              })
            }
          })

        }
      })
    }
    // 显示哪个

    return { newInfo, isOk, info, dialogFormVisible, formLabelWidth, openOrder, currentInfo, isTips, orderToTip, tipToOrder, getTipFn, tip, oId, message, isShow, unsubscribe, innerVisible, tuiding, statusText, currentStatus }
  }
}
</script>

<style lang="less" scoped>
.personal-order-0 {
  .order-item {
    display: inline-block;
    margin-right: 25px;
    padding: 15px;
    width: 200px;
    height: 150px;
    border-radius: 20px;
    background-color: rgba(238, 234, 234, 0.308);
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
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
  .noneText {
    font-size: 24px;
    text-align: center;
  }
}
/deep/.el-form-item__label {
  padding-right: 30px;
  font-weight: 600;
}
</style>