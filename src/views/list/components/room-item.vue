<template>
  <a class="room-item" @click="$router.push(`/homestaysInfo/${goods.id}`)">
    <img :src="goods.mainImage" alt="" />
    <!-- <MinsuLike @click="liking" :isLike=isLiking /> -->
    <p class="name ellipsis-2">{{goods.title}}</p>
    <p class="desc ellipsis">{{goods.city}} · {{goods.describe}}</p>
    <p class="price">&yen;{{goods.price}} / 晚</p>
  </a>
</template>

<script>
import MinsuLike from '@/components/minsu-like'
import { ref } from 'vue'
export default {
  name: 'RoomItem',
  components: {
    MinsuLike
  },
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    const isLiking = ref(false)
    const liking = () => {
      isLiking.value = !isLiking.value
    }
    return { liking, isLiking }
  }
}
</script>

<style scoped lang='less'>
.room-item {
  display: inline-block;
  position: relative;
  width: 280px;
  //   padding: 20px 30px;
  margin: 8px 10px;
  text-align: center;
  border: 1px solid rgb(245, 243, 243);
  .hoverShadow();
  img {
    width: 100%;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: #4e5b89;
    font-size: 16px;
  }
  /deep/.like-icon {
    position: absolute;
    top: 0;
    right: 10px;
  }
}
</style>
