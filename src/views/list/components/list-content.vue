<template>
  <div class="list-content" v-infinite-scroll="load" infinite-scroll-immediate="false">
    <RoomItem v-for="item in homestays" :key="homestays.id" :goods='item' />
  </div>
  <ListFinished :finished=isFinished :loading="isLoading" />
</template>

<script>
import RoomItem from './room-item.vue'
import { ref, watch } from 'vue'
import ListFinished from './list-finished.vue'
import { getHomestays } from '@/api/homestays'
export default {
  name: 'ListContent',
  components: {
    RoomItem, ListFinished
  },
  props: {
    searchResults: {
      type: Array
    }
  },
  setup (props) {
    console.log('1', props.searchResults);
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

    const homestays = ref([])
    getHomestays().then((data) => {
      // console.log(data);
      homestays.value = data.data
      // console.log(homestays.value);
    })

    watch(props.searchResults, () => {
      console.log('1');
      console.log('222', props.searchResults)
    })
    return { number, load, isFinished, isLoading, homestays }
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