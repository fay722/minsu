<template>
  <div class="box" v-if="homestay">
    <div class="homestayInfo">
      <span class="city">
        {{homestay.city}} · {{homestay.type}}
      </span>
      <div class="collect">
        <MinsuLike :isLike='isLiking' @click="likeFn" :homeId='homestay.id' @total='getTotal' />{{collectNum}}
      </div>

      <h2 class="title">{{homestay.title}}</h2>
      <div class="position">
        <i class="iconfont icon-map-filling"></i> {{homestay.position}}
      </div>
      <div class="details" v-if="detailsArray.length">
        <span><i class="iconfont icon-24gf-door"></i> {{detailsArray[0]}}</span>
        <span><i class="iconfont icon-chuang"></i> {{detailsArray[1]}}</span>
        <span><i class="iconfont icon-haoyou"></i> {{detailsArray[2]}}</span>
      </div>
      <div class="lable">
        <span class="lable-item">超赞房东</span>
        <span class="lable-item">可开发票</span>
        <span class="lable-item">提供接送机</span>
        <span class="lable-item">行李寄存</span>
        <span class="lable-item">免费停车</span>
      </div>
      <!-- 房东信息 -->
      <div class="landlord">
      </div>
      <div class="otherInfo">
        <div class="info-item">
          <span class="heading">独立房间</span>
          <span class="directions">有自己的单独卧室，与他人共享其他空间</span>
        </div>
        <div class="info-item">
          <span class="heading">超赞房东</span>
          <span class="directions">超赞房东经验丰富、评分很高，致力于为房客提供优质的住宿体验。</span>
        </div>
        <div class="info-item">
          <span class="heading">入住/退房</span>
          <span class="directions">入住时间 下午2:00 - 凌晨00:00、退房时间 中午12:00</span>
        </div>
        <div class="info-item">
          <span class="heading">自助入住</span>
          <span class="directions">通过智能门锁自助入住</span>
        </div>
      </div>
    </div>
    <!--预定信息面板 -->
    <div class="reserve">
      <!-- 价格 -->
      <div class="price">
        <span class="pri"> &yen;{{homestay.price}}</span> / 晚
      </div>
      <!-- 日期 -->
      <div class="date">
        <div>日期</div>
        <div class="block">
          <el-date-picker v-model="value1" type="daterange" range-separator="To" start-placeholder="Start date"
            end-placeholder="End date" :disabled-date="disabledDate" />
        </div>
      </div>
      <!-- 人数 -->
      <div class="people">
        <div>人数</div>
        <el-select v-model="value" class="m-2" placeholder="Select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <!-- 总价 -->
      <div class="total-price">
        <div>总价</div>
        <span>&yen;{{homestay.price}} x {{iDays || 1}}晚</span>
        <span class="total">&yen;{{homestay.price * iDays}}</span>
      </div>
      <!-- 按钮 -->
      <el-button class="btn" type="primary" @click="dialogFormVisible = true">预定</el-button>
    </div>
    <!-- 弹出预定框 -->
    <el-dialog v-model="dialogFormVisible" title="预定信息">
      <el-form :model="form" :rules="rules">
        <!-- 确认预定框 -->
        <el-dialog v-model="innerVisible" width="30%" title="确认预定吗" append-to-body>
          <el-form-item label="总价" :label-width="formLabelWidth">
            &yen;{{homestay.price * iDays}}
          </el-form-item>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="innerVisible = false">取消</el-button>
              <el-button type="primary" @click="okFn">确定</el-button>
            </span>
          </template>
        </el-dialog>
        <el-form-item label="民宿" :label-width="formLabelWidth">
          {{homestay.title}}
        </el-form-item>
        <el-form-item label="入住时间" :label-width="formLabelWidth">
          {{sDate1?sDate1:'未选择'}}
        </el-form-item>
        <el-form-item label="退房时间" :label-width="formLabelWidth">
          {{sDate2?sDate2:'未选择'}}
        </el-form-item>
        <el-form-item label="预定天数" :label-width="formLabelWidth">
          {{iDays?iDays+'天':'未选择'}}
        </el-form-item>
        <el-form-item label="人数" :label-width="formLabelWidth">
          {{value?value:'未选择'}}
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model.number="form.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入住人" :label-width="formLabelWidth">
          <el-input v-model="form.person" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmFn">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue'
import moment from 'moment'
import { ElMessage } from 'element-plus'
import { postOrder } from '@/api/order'
import { useRoute } from 'vue-router'
import { getUserInfo } from '@/api/user'
import { getCollectNum, editHomestayStatus } from '@/api/homestays'
import MinsuLike from '@/components/minsu-like'
import { watchCollect } from '@/api/user'
import { useStore } from 'vuex'
import { idGetCity } from '@/api/city'
export default {
  name: 'HomestayInfo',
  components: { MinsuLike },
  props: {
    homestay: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const route = useRoute()

    const detailsArray = ref([])
    const collectNum = ref(0)
    const isLiking = ref(false)
    // 查看用户是否收藏
    const store = useStore()
    watch(props, async () => {
      // //  获取城市
      // await idGetCity({ id: props.homestay.city }).then(data => {
      //   props.homestay.city = data.data.results.city
      // })
      // console.log(props.homestay.city);

      // 查看是否收藏
      if (store.state.user.user.token) {
        // console.log('1');
        watchCollect({ homeId: props.homestay.id }).then((data) => {
          // console.log(data);
          // if (data.data.status === 1) {
          //   return ElMessage({
          //     message: '您未登陆，请先登陆！',
          //     type: 'warning',
          //     center: true,
          //   })
          // }
          if (data.data.status === 2) {
            return isLiking.value = true
          }
        })
      }
      // 收藏数
      await getCollectNum({ homeId: props.homestay.id }).then(data => {
        if (data.data.status === 0) {
          // console.log(data);
          collectNum.value = data.data.result.num
          // console.log(collectNum.value);
        }
      })
      detailsArray.value = props.homestay.details.split(';')
      // console.log(detailsArray.value);
    })
    // 收藏/不收藏
    const likeFn = () => {
      isLiking.value = !isLiking.value
    }
    const getTotal = (value) => {
      collectNum.value = value
    }
    // 订单信息
    const form = reactive({
      formDate: moment(new Date()).format('YYYY-MM-DD'),
      reserveDate: '',
      checkOutDate: '',
      days: '',
      person: '',
      tel: '',
      peoples: ''
    })

    // 获取用户手机号
    getUserInfo().then(data => {
      if (data.data.status === 0) {
        form.tel = data.data.data.tel
      }
    })

    // 日期
    const value1 = ref([])
    // 相差天数 即预定天数
    var iDays = ref('')
    var sDate1 = ref('')
    var sDate2 = ref('')
    watch(() => value1.value, () => {
      // 转格式
      sDate1.value = moment(value1.value[0]).format('YYYY-MM-DD')
      sDate2.value = moment(value1.value[1]).format('YYYY-MM-DD')
      form.reserveDate = sDate1.value
      form.checkOutDate = sDate2.value
      // 相差天数
      iDays.value = moment(sDate2.value).diff(sDate1.value, 'day')
      form.days = iDays.value
      // console.log(iDays.value);
    })
    // 人数
    const value = ref('')
    const options = [
      {
        value: '1人',
        label: '1人',
      },
      {
        value: '2人',
        label: '2人',
      },
      {
        value: '3人',
        label: '3人',
      }
    ]
    form.peoples = value
    // 弹出框
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'

    const rules = reactive({
      tel: [
        { required: true, message: "请输入手机号码", trigger: "blur" },
        { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" }
      ]
    })
    // 内 确认弹出框
    const innerVisible = ref(false)
    const confirmFn = () => {
      if (form.tel === "" || form.formDate === "" || form.reserveDate === "" || form.checkOutDate === "" || form.days === "" || form.person === "") {
        return ElMessage({
          message: '信息不完善！',
          type: 'error',
          center: true,
        })
      }
      dialogFormVisible.value = false
      innerVisible.value = true
    }
    let id = parseInt(route.params.id)
    // console.log(id);
    const okFn = () => {
      innerVisible.value = false
      editHomestayStatus({ id }).then(data => {
        if (data.data.status === 0) {
          postOrder({ homeId: id, ...form }).then(data => {
            if (data.data.status === 0) {
              return ElMessage({
                message: data.data.message,
                type: 'success',
                center: true,
              })
            } else {
              return ElMessage({
                message: '预定失败！',
                type: 'error',
                center: true,
              })
            }
          })
        }
      })

    }

    const disabledDate = (value1) => {
      return value1.getTime() < new Date()
    }

    return { value1, value, options, detailsArray, iDays, dialogFormVisible, formLabelWidth, form, sDate1, sDate2, rules, innerVisible, confirmFn, okFn, collectNum, isLiking, likeFn, getTotal, disabledDate }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  .homestayInfo {
    float: left;
    margin: 20px 80px 0 180px;
    width: 650px;
    // height: 800px;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", "微软雅黑",
      "Microsoft YaHei", "Heiti SC", sans-serif !important;
    //   background-color: #999;
    .city {
      font-size: 16px;
      margin-bottom: 13px;
    }
    .icon-like {
      width: 34px;
      height: 34px;
      position: absolute;
      top: 0;
      right: 10px;
    }
    .title {
      font-size: 32px;
    }
    .collect {
      line-height: 30px;
      float: right;
      color: rgb(199, 83, 83);
    }
    .details {
      margin-top: 13px;
      span {
        margin-right: 15px;
      }
    }
    .position {
      margin-top: 13px;
    }
    .lable {
      margin-top: 13px;
      .lable-item {
        display: inline-block;
        margin-right: 10px;
        height: 26px;
        padding: 8px;
        line-height: 13px;
        font-size: 12px;
        border-radius: 15px;
        background-color: #f4f4f3;
        text-align: center;
        color: #4c4c4e;
      }
    }
    .otherInfo {
      margin-top: 25px;
      font-size: 16px;
      border-top: 1px solid #ccc;
      padding-top: 20px;
      .info-item {
        margin-bottom: 20px;
      }
      .heading {
        color: #484848;
        margin-right: 70px;
      }
      .directions {
        color: #484848;
        opacity: 0.9;
      }
    }
  }
  .reserve {
    float: left;
    margin-top: 25px;
    width: 350px;
    height: 440px;
    border: 1px solid #ccc;
    padding: 35px 25px;
    .price {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      .pri {
        color: #4e5b89;
        font-size: 28px;
        font-weight: 800;
      }
    }
    .date {
      margin-top: 20px;
      /deep/.el-date-editor {
        width: 300px;
      }
    }
    .people {
      margin-top: 20px;
      /deep/ .el-select {
        display: inline;
      }
      /deep/.el-input--suffix .el-input__inner {
        padding-left: 10px;
      }
    }
    .total-price {
      margin-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(224, 224, 224);
      .total {
        float: right;
      }
    }
    .btn {
      margin-top: 20px;
      width: 289px;
      height: 40px;
      background-color: #4e5b89;
      border: none;
    }
  }
  /deep/.el-input__inner {
    width: 45%;
  }
  /deep/.el-dialog__body {
    padding: 0px !important;
  }
  .minsu-like {
    float: right;
    display: inline-block;
    // margin-bottom: 13px;
  }
  /deep/.icon-like {
    display: inline-block;
    width: 30px;
    height: 30px;
  }
}
</style>
