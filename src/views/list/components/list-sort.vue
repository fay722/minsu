<template>
  <div class="list-sort">
    <div class="sort">
      <a href="javascript:;" :class="{active:active==='moren'}" @click="active='moren'">
        默认排序
      </a>
      <a href="javascript:;" :class="{active:active==='haoping'}" @click="active='haoping'">
        好评优先
      </a>
      <a href="javascript:;" :class="{active:active==='jiage'}" @click="active='jiage'">
        价格排序
        <i class="arrow up" />
        <i class="arrow down" />
      </a>
      <a href="javascript:;">
        更多筛选条件
      </a>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'ListSort',
  setup () {
    const active = ref('moren')
    return { active }
  }
}
</script>

<style scoped lang='less'>
.list-sort {
  margin-top: 80px;
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
            border-bottom-color: #90b6cc;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #90b6cc;
          &.active {
            border-top-color: #90b6cc;
          }
        }
      }
    }
  }
}
</style>
