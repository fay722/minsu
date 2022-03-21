<template>
  <div class="homestay-image" v-loading="!imageArr.length">
    <div class="box-image" v-if="imageArr.length">
      <div class="main-image">
        <img class="img" :src=imageArr[0] alt="">
      </div>
      <div class="secondary-image">
        <div class="image-left">
          <div class="left-top">
            <img class="img" :src=imageArr[1] alt="">
          </div>
          <div class="left-bottom">
            <img class="img" :src=imageArr[2] alt="">
          </div>
        </div>
        <div class="image-right">
          <div class="right-top">
            <img class="img" :src=imageArr[3] alt="">
          </div>
          <div class="right-bottom">
            <img class="img" :src=imageArr[4] alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue'
export default {
  name: 'HomestayImage',
  props: {
    homestay: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const imageArr = ref([])
    watch(props, () => {
      imageArr.value = props.homestay.image.split(';')
    })
    return { imageArr }
  }
}
</script>
<style lang="less" scoped>
.homestay-image {
  .box-image {
    height: 480px;
    background-color: #000;
    display: flex;
    .main-image {
      flex: 1;
      // height: 100%;
      background-color: #ccc;
      border: 1px solid #000;
    }
    .secondary-image {
      flex: 1;
      // background-color: pink;
      display: flex;
      .image-left {
        flex: 1;
        color: blue;
        display: flex;
        flex-direction: column;
        .left-top {
          flex: 1;
          // background-color: red;
        }
        .left-bottom {
          flex: 1;
          // background-color: #999;
        }
      }
      .image-right {
        flex: 1;
        // background-color: yellow;
        display: flex;
        flex-direction: column;
        .right-top {
          flex: 1;
          // background-color: rgb(119, 77, 77);
        }
        .right-bottom {
          flex: 1;
          // background-color: rgb(89, 180, 196);
        }
      }
    }
    .img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>