<template>
  <div class="home-one w">
    <HomePanel title="新鲜好房" sub-title="品质房源，低至5折">
      <!-- 按钮 -->
      <div class="home-button w">
        <el-button v-for="(item,index) in cityArr" :key="index" color="#7193d8" plain @click="citySearch(item)">{{item}}
        </el-button>
      </div>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for=" (item,index) in homestays.splice(0,6)" :key="index"
          @click="$router.push(`/homestaysInfo/${item.id}`)">
          <img :src="item.mainImage" alt="">
          <p class="name ellipsis-2">{{item.title}}</p>
          <p class="price ">&yen;{{item.price}} / 晚</p>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeButton from './home-button.vue'
import { getHomestays, getCityHomestays } from '@/api/homestays'
import { ref } from 'vue'
export default {
  name: 'HomeOne',
  components: { HomePanel, HomeButton },
  setup () {
    const homestays = ref([])
    getHomestays().then((data) => {
      // console.log(data);
      homestays.value = data.data.filter(item => item.status === '0')
      console.log(homestays.value);

    })
    const cityArr = ['丽江市', '重庆市', '成都市', '厦门市', '长沙市', '大理市', '三亚市']
    const currentIndex = 0

    const citySearch = (city) => {
      getCityHomestays({ city }).then((data) => {
        console.log(data);
        homestays.value = data.data.filter(item => item.status === '0')
        // console.log(homestays.value);
      })
    }
    return { homestays, cityArr, currentIndex, citySearch }
  }
}
</script>

<style scoped lang="less">
/deep/.home-button {
  margin: 0;
  padding: 20px 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  .el-button {
    width: 122px;
    height: 50px;
    border: solid 0.5px #d8d8d8;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 15%);
  }
}

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
    .name {
      width: 396px;
      height: 60px;
      font-size: 18px;
      padding: 12px 20px;
      // text-align: center;
    }
    .price {
      padding: 5px 20px;
      color: #000;
      font-size: 16px;
      // font-weight: 600;
    }
  }
}
</style>