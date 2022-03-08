<template>
  <div class="minsu-like">
    <img src="@/assets/images/icon/aixin1.png" class="icon-like" alt="" v-if="isLike">
    <img src="@/assets/images/icon/aixin2.png" class="icon-like" alt="" v-else>
  </div>
</template>

<script>
export default {
  name: 'MinsuLike',
  props: {
    isLike: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.icon-like {
  width: 34px;
  height: 34px;
  position: absolute;
  top: 0;
  right: 10px;
}
</style>