<template>
  <div class="list-top">
    <div class="logo"></div>
    <el-input v-model="input" placeholder="Please input" clearable>
      <template #prefix>
        <el-icon class="iconfont icon-search">
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ListTop',
  setup () {
    const input = ref()
    return { input }
  }
}
</script>

<style lang="less" scoped>
.list-top {
  height: 80px;
  border-bottom: 1px solid #ccc;
  /deep/.el-input {
    margin-top: 18px;
    margin-left: 20px;
    width: 460px;
    .el-input__inner {
      height: 48px;
      box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.1);
      font-size: 22px;
      padding-left: 45px;
    }
  }
  .icon-search:before {
    color: #999;
    position: absolute;
    top: 15px;
    left: 0px;
    font-size: 28px;
  }
}
</style>