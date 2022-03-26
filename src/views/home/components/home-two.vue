<template>
  <div class="home-two w">
    <HomePanel title="大同高分好评房源" sub-title="来看看这些颇受房客好评的房源吧">
      <!-- 按钮 -->
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in datongInfo.splice(0,8)" :key="item.id" @click="$router.push(`/homestaysInfo/${item.id}`)">
          <img :src=" item.mainImage" alt="">
          <p class="name ellipsis-2">{{item.title}}</p>
          <p class="price">&yen;{{item.price}} / 晚</p>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import { getCityHomestays } from '@/api/homestays'
import { ref } from 'vue'
export default {
  name: 'HomeTow',
  components: { HomePanel },
  setup () {
    const datongInfo = ref([])
    getCityHomestays({ city: '大同市' }).then(data => {
      datongInfo.value = data.data.filter(item => item.status === '0')
      // console.log(datongInfo.value);
    })
    return { datongInfo }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  // justify-content: flex-start;
  flex-wrap: wrap;
  li {
    width: 24%;
    height: 406px;
    margin-top: 8px;
    background: rgb(237, 241, 250);
    // margin-right: 12px;
    .hoverShadow();
    img {
      width: 100%;
      height: 306px;
    }
    .price {
      font-size: 18px;
      padding-left: 12px;
      color: #333;
    }
  }
  .name {
    margin: 12px 0 5px 12px;
    // padding: 12px;
    font-size: 16px;
  }
}
</style>