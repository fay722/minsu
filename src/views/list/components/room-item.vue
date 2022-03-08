<template>
  <a class="room-item">
    <img src="@/assets/images/4.jpeg" alt="" />
    <MinsuLike @click="liking" :isLike=isLiking />
    <p class="name ellipsis">啦啦啦</p>
    <p class="desc ellipsis">llllllllll</p>
    <p class="price">&yen;123</p>
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
  margin: 5px 8px;
  text-align: center;
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
    color: #90b6cc;
    font-size: 20px;
  }
  /deep/.like-icon {
    position: absolute;
    top: 0;
    right: 10px;
  }
}
</style>
