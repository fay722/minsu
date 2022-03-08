<template>
  <div class="list-content" v-infinite-scroll="load" infinite-scroll-immediate="false">
    <RoomItem v-for="n in number" :key="n" />
  </div>
  <ListFinished :finished=isFinished :loading="isLoading" />
</template>

<script>
import RoomItem from './room-item.vue'
import { ref } from 'vue'
import ListFinished from './list-finished.vue'
export default {
  name: 'ListContent',
  components: {
    RoomItem, ListFinished
  },
  setup () {
    let number = ref(12)
    const isFinished = ref(false)
    const isLoading = ref(false)
    const load = () => {
      isLoading.value = true
      console.log('1')
      if (number.value === 32) {
        isLoading.value = false
        isFinished.value = true
        return
      }
      number.value += 4

    }
    return { number, load, isFinished, isLoading }
  }
}
</script>
<style lang="less" scoped>
.list-content {
  width: 1350px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>