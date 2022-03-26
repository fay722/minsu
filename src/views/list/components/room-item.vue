<template>
  <a class="room-item" @click="$router.push(`/homestaysInfo/${goods.id}`)">
    <img :src="goods.mainImage" alt="" />
    <!-- <MinsuLike @click.stop="liking(goods.id)" :isLike=isLiking :homeId=homeId /> -->
    <p class="name ellipsis-2">{{goods.title}}</p>
    <p class="desc ellipsis">{{goods.city}} · {{goods.type}}</p>
    <p class="price">&yen;{{goods.price}} / 晚</p>
  </a>
</template>

<script>
import MinsuLike from '@/components/minsu-like'
import { ref, watch } from 'vue'
import { watchCollect } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
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
  setup (props) {
    const store = useStore()
    const homeId = ref(null)
    const isLiking = ref(false)
    const liking = (id) => {
      if (!store.state.user.user.token) {
        return ElMessage({
          message: '您未登陆，请先登陆！',
          type: 'warning',
          center: true,
        })
      }
      homeId.value = id
      isLiking.value = !isLiking.value
    }
    // console.log(store.state.user.user.token);
    if (store.state.user.user.token) {
      // console.log('1');
      watchCollect({ homeId: props.goods.id }).then((data) => {
        // console.log(data);
        // if (data.data.status === 1) {
        //   return ElMessage({
        //     message: '您未登陆，请先登陆！',
        //     type: 'warning',
        //     center: true,
        //   })
        // }
        if (data.data.status === 2) {
          return isLiking.value = true
        }
      })
    }


    return { liking, isLiking, homeId }
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
/deep/.icon-like {
  width: 34px;
  height: 34px;
  position: absolute;
  top: 0;
  right: 10px;
}
</style>
