<template>
  <div class="minsu-like">
    <img src="@/assets/images/icon/aixin1.png" class="icon-like" alt="" v-if="isLike">
    <img src="@/assets/images/icon/aixin2.png" class="icon-like" alt="" v-else>
  </div>
</template>

<script>
import { watch } from 'vue'
import { getcollectHomestay, cancelCollect, watchCollect } from '@/api/user'
import { ElMessage } from 'element-plus'
import { getCollectNum } from '@/api/homestays'
export default {
  name: 'MinsuLike',
  props: {
    isLike: {
      type: Boolean,
      default: false
    },
    homeId: {
      type: Number
    },
  },
  setup (props, { emit }) {
    watch(() => props.isLike, async () => {
      // console.log(props.isLike)
      // console.log(props.homeId);
      if (props.isLike) {
        // 收藏
        // watchCollect(props.homeId).then(data => {
        //   // return console.log(data);
        // })
        await getcollectHomestay({ homeId: props.homeId }).then(data => {
          if (data.data.status === 0) {
            return ElMessage({ message: '收藏成功！', type: 'success', center: true, })
          }
        })
      } else {
        await cancelCollect({
          homeId: props.homeId
        }).then(data => {
          console.log(data);
        })
      }
      getCollectNum({ homeId: props.homeId }).then(data => {
        // console.log('total', data.data.result.num);
        emit('total', data.data.result.num)
      })
    })
  }
}
</script>

<style lang="less" scoped>
</style>