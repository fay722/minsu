<template>
  <div class="personal-collect">
    <ul v-if="collectInfo">
      <li class="order-item" v-for="item in collectInfo" @click="$router.push(`/homestaysInfo/${item.id}`)">
        <div class="position ellipsis">{{item.position}}</div>
        <div class="title ellipsis-2 ">{{item.title}}</div>
        <div class="details">{{item.type}}</div>
        <div class="price">&yen;{{item.price}} / 晚</div>
      </li>
    </ul>
    <div class="text" v-else>您还没有收藏民宿哦</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getMyAllCollect } from '@/api/collect'
export default {
  name: 'PersonalCollect',
  setup () {
    const collectInfo = ref([])
    getMyAllCollect().then(data => {
      collectInfo.value = data.data.result
      console.log(collectInfo.value);
    })
    return { collectInfo }
  }
}
</script>

<style lang="less" scoped>
.personal-collect {
  .order-item {
    display: inline-block;
    margin-right: 25px;
    padding: 15px;
    width: 200px;
    height: 150px;
    border-radius: 20px;
    background-color: rgba(238, 234, 234, 0.308);
    margin-bottom: 5px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
    .position {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
    }
    .title {
      font-size: 20px;
    }
    .details {
      margin-top: 5px;
      font-size: 12px;
    }
    .price {
      margin-top: 10px;
    }
  }
  .text {
    text-align: center;
    font-size: 24px;
  }
}
</style>