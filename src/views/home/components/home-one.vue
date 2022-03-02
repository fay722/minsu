<template>
  <div class="home-one w">
    <HomePanel title="新鲜好房" sub-title="品质房源，低至5折">
      <!-- 按钮 -->
      <HomeButton />
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for=" n in 6" :key="n">
          <img src="@/assets/images/01-1.jpeg" alt="">
          <p class="name ellipsis">1233</p>
          <p class="price">&yen;123</p>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeButton from './home-button.vue'
export default {
  name: 'HomeOne',
  components: { HomePanel, HomeButton },
  setup () {
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 33%;
    height: 406px;
    margin-top: 8px;
    background: rgb(237, 241, 250);
    .hoverShadow();
    img {
      width: 100%;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: pink;
    }
  }
}
</style>