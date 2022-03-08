<template>
  <ListTop />
  <ListSort />
  <ListContent />
</template>

<script>
import ListTop from './components/list-top.vue'
import ListSort from './components/list-sort.vue'
import ListContent from './components/list-content'
export default {
  name: 'ListIndex',
  components: {
    ListTop, ListSort, ListContent
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
</style>