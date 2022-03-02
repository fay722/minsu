<template>
  <div class="home-button w">
    <el-button v-for="n in 7" :key="n" color="#7193d8" plain>Default</el-button>
  </div>
</template>

<script>
export default {
  name: 'HomeButton'
}
</script>
<style lang="less" scoped>
.home-button {
  margin: 0;
  padding: 20px 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .el-button {
    width: 122px;
    height: 50px;
    border: solid 0.5px #d8d8d8;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 15%);
  }
}
</style>