<template>
  <div class="list-sort">
    <div class="sort">
      <a href="javascript:;" :class="{active:sortParams.sortField === null}" @click="changeSort(null)">
        默认排序
      </a>
      <a href="javascript:;" :class="{active:sortParams.sortField === 'shoucang'}" @click="changeSort('shoucang')">
        收藏优先
      </a>
      <a href="javascript:;" @click="changeSort('jiage')">
        价格排序
        <i class="arrow up" :class="{
            active:
              sortParams.sortField === 'jiage' &&
              sortParams.sortMethod == 'asc',
          }" />
        <i class="arrow down" :class="{
            active:
              sortParams.sortField === 'jiage' &&
              sortParams.sortMethod == 'desc',
          }" />
      </a>
      <!-- <a href="javascript:;">
        更多筛选条件
      </a> -->
    </div>
  </div>
</template>
<script>
import { ref, reactive } from 'vue'
export default {
  name: 'ListSort',
  setup (props, { emit }) {

    const sortParams = reactive({
      // sortField====>moren haoping jiage
      // sortMethod====>asc为正序 desc为倒序
      sortField: null,
      sortMethod: null
    })
    const changeSort = (sortField) => {
      if (sortField === 'jiage') {
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
          // 第一次点击，默认是降序
          sortParams.sortMethod = 'desc'
        } else {
          // 其他情况根据当前排序取反
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 如果排序未改变停止逻辑
        if (sortParams.sortField === sortField) { return }
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      // 触发父组件事件
      emit('sort-change', sortParams)
    }

    return { changeSort, sortParams, changeSort }
  }
}
</script>

<style scoped lang='less'>
.list-sort {
  padding-left: 30px;
  margin-top: 90px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 32px;
      line-height: 32px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #484848;
      border-radius: 5px;
      position: relative;
      transition: all 0.3s;
      font-size: 12px;
      &.active {
        background: #455d91;
        border-color: #90b6cc;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: #455d91;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: #455d91;
          }
        }
      }
    }
  }
}
</style>
