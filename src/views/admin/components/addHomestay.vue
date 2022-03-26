<template>
  <div class="addHomestay">
    <div class="back" @click="goBack"> <i class="iconfont icon-arrow-left-bold"></i> 返回</div>
    <el-form :model="form" label-width="120px" :rules="rules" :ref="ruleFormRef">
      <el-form-item label="名字" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <elui-china-area-dht :leave="1" @change="onChange"></elui-china-area-dht>
      </el-form-item>
      <el-form-item label="位置" prop="position">
        <elui-china-area-dht :leave="3" @change="onChange_2"></elui-china-area-dht>
        <el-input class="address" v-model="address" placeholder="详细地址" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price" onkeyup="value=value.replace(/[^\d]/g,0)" />
      </el-form-item>
      <el-form-item label="设施" prop="details">
        <el-select v-model="detailsArr[0]" class="m-2 details" placeholder="Select">
          <el-option label="1间卧室" value="1间卧室" />
          <el-option label="2间卧室" value="2间卧室" />
          <el-option label="3间卧室" value="3间卧室" />
        </el-select>
        <el-select v-model="detailsArr[1]" class="m-2 details" placeholder="Select">
          <el-option label="1张床" value="1张床" />
          <el-option label="2张床" value="2张床" />
          <el-option label="3张床" value="3张床" />
        </el-select>
        <el-select v-model="detailsArr[2]" class="m-2 details" placeholder="Select">
          <el-option label="可住1人" value="可住1人" />
          <el-option label="可住2人" value="可住2人" />
          <el-option label="可住3人" value="可住3人" />
          <el-option label="可住4人" value="可住4人" />
          <el-option label="可住5人" value="可住5人" />
          <el-option label="可住6人" value="可住6人" />
        </el-select>
      </el-form-item>
      <el-form-item label="详情图">
        <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="Change"
          :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon>
                    <zoom-in />
                  </el-icon>
                </span>
                <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file,fileList)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span> -->
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img class="bigImage" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { reactive, ref, watch, unref } from 'vue'
import { EluiChinaAreaDht } from 'elui-china-area-dht'
import { ElMessage } from 'element-plus'
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'
import { UploadFile } from 'element-plus'
import { addHomestays } from '@/api/admin'
import { defineComponent, getCurrentInstance } from 'vue'
export default {
  name: 'AddHomestay',
  components: {
    EluiChinaAreaDht, Plus, ZoomIn, Download, Delete
  },
  setup (props, { emit }) {
    const goBack = () => {
      emit('goBack', true)
    }
    const detailsArr = ref([])
    const form = reactive({
      title: '',
      city: '',
      position: '',
      type: '',
      price: '',
      details: '',
      mainImage: '',
      image: '',
    })
    watch(detailsArr.value, () => {
      //   console.log('1');
      form.details = detailsArr.value.join(';')
      console.log(form);
    })
    const ruleFormRef = ref('')


    // 城市
    const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat
    function onChange (e) {
      const one = chinaData[e[0]]
      form.city = chinaData[e[0]].label
      console.log(one);
      //   console.log(form);
      //   const two = chinaData[e[1]]
      //   console.log(one, two)
    }
    // 详细地址
    const position = ref([])
    const address = ref('')
    const onChange_2 = (e) => {
      const two = chinaData[e[1]]
      const one = chinaData[e[0]]
      const three = chinaData[e[2]]
      position.value[0] = chinaData[e[0]].label
      position.value[1] = chinaData[e[1]].label
      position.value[2] = chinaData[e[2]].label
      //   console.log(position.value)
    }
    watch(address, () => {
      position.value[3] = address.value
      console.log(position.value);
    })
    watch(position.value, () => {
      //   console.log('00');
      if (position.value.length === 4 && position.value[0] !== '' && position.value[2] !== '' && position.value[3] !== '') {
        form.position = position.value.join(',')
        // console.log('222', form.position);
      }
    })

    // 校验规则
    const rules = reactive({
      title: [{ required: true, message: '此选项必填！', trigger: 'blur' }],
      city: [{ required: true, message: '此选项必填！', trigger: 'blur' }],
      position: [{ required: true, message: '此选项必填！', trigger: 'blur' }],
      type: [{ required: true, message: '此选项必填！', trigger: 'blur' }],
      price: [{ required: true, message: '此选项必填！', trigger: 'blur' }],
      details: [{ required: true, message: '此选项必填！', trigger: 'blur' }],
    })

    // 详情图
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    const handleRemove = (file, fileList) => {
      console.log(file, fileList)
    }

    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.url
      dialogVisible.value = true
    }
    // const onChange = (file, fileList) => {
    //   // var _this = this;
    //   // var event = event || window.event;
    //   // var file = event.target.files[0];
    //   // var reader = new FileReader();
    //   // //转base64
    //   // reader.onload = function (e) {
    //   //   _this.imageUrl = e.target.result //将图片路径赋值给src
    //   // }
    //   // reader.readAsDataURL(file);
    //   console.log('123', file)
    // }
    const { proxy } = getCurrentInstance()

    const imageArr = ref([])
    const Change = (file, fileList) => {
      console.log('file', window.URL.createObjectURL(file.raw));
      imageArr.value = fileList.map(x => { return x.url })
    }

    watch(() => imageArr.value, () => {
      form.image = imageArr.value.join(';')
      form.mainImage = imageArr.value[0]
    })


    // 提交
    const onSubmit = async () => {
      for (var i in form) {
        if (!form[i]) return ElMessage({ message: '请继续填写！', type: 'error', center: true })
      }
      if (form.price <= 1 || form.price > 10000) return ElMessage({ message: '价格不合理!', type: 'error', center: true })
      if (detailsArr.value.length < 3) return ElMessage({ message: '请继续填写！', type: 'error', center: true })
      for (var i in position.value) {
        if (!position.value[i]) return ElMessage({ message: '请继续填写详细信息！', type: 'error', center: true })
      }
      addHomestays(form).then(data => {
        if (data.data.status === 0) {
          ElMessage({ message: '添加成功', type: 'success', center: true })
          emit('goBack', true)
        }
      })
      // console.log('1111', form);
      // console.log('submit!')
    }



    //vue3-javascript


    return { goBack, form, onSubmit, detailsArr, onChange, onChange_2, address, rules, ruleFormRef, handleRemove, handlePictureCardPreview, dialogVisible, disabled, dialogImageUrl, Change }
  }
}
</script>

<style lang="less" scoped>
.addHomestay {
  padding: 80px 0 0 260px;
  .back {
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
  }
  /deep/.el-input__inner {
    width: 350px !important;
    margin-right: 20px !important;
    border: 1px #ccc solid;
  }
  .details {
    width: 200px !important;
    height: 30px;
  }
  .address {
    margin-top: 10px;
  }
  .bigImage {
    width: 700px;
  }
}
</style>