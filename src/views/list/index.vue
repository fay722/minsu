<template>
  <ListTop @searchResults="getSearchResults" />
  <ListSort />
  <div class="list-content" v-if="searchResults.length ">
    <RoomItem v-for="item in searchResults" :key="searchResults.id" :goods='item' />
  </div>
  <div class="list-content" v-else>
    <h3>无结果</h3>
  </div>
</template>

<script>
import RoomItem from './components/room-item.vue'
import ListTop from '../../components/list-top.vue'
import ListSort from './components/list-sort.vue'
import ListContent from './components/list-content'
import { getHomestays } from '@/api/homestays'
import { ref, watch } from 'vue'
export default {
  name: 'ListIndex',
  components: {
    ListTop, ListSort, ListContent, RoomItem
  },
  props: {
    // searchResults: {
    //   type: Array
    // }
  },
  setup () {
    const searchResults = ref([])
    // console.log(searchResults.value.length);
    const getSearchResults = (value) => {
      searchResults.value = value
    }

    // 内容 
    if (searchResults.value.length === 0) {
      getHomestays().then((data) => {
        // console.log(data);
        searchResults.value = data.data
        // console.log(homestays.value);
      })
    }


    return { getSearchResults, searchResults }
  }
}
</script>

<style lang="less" scoped>
.list-sort {
  padding-left: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.room-list {
  width: 1350px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.list-content {
  width: 1350px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
h3 {
  font-size: 26px;
  margin-top: 30px;
}
</style>