<template>
  <div class="homestay">
    <ListTop />
    <HomestayImage v-if="result" :homestay='result' />
    <HomestayInfo v-if="result" :homestay='result' />
    <MinsuFooter />
  </div>
</template>

<script>
import ListTop from '@/components/list-top.vue'
import HomestayImage from './components/homestay-image.vue'
import { ref, watch, reactive, provide, nextTick, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getHomestaysInfo } from '@/api/homestays'
import HomestayInfo from './components/homestay-info.vue'
import MinsuFooter from '@/components/minsu-footer.vue'
export default {
  name: 'HomestayIndex',
  components: {
    ListTop, HomestayImage, HomestayInfo, MinsuFooter
  },
  setup () {
    const route = useRoute()
    const id = route.params.id
    // console.log(id);
    const result = ref([])
    getHomestaysInfo({ id: id }).then(data => {
      result.value = data.data[0]
      // console.log(result.value);
    })
    return { result }
  }
}
</script>

<style lang="less" scoped>
/deep/.list-top[data-v-5967f0b6] {
  position: absolute !important;
}
.homestay {
  margin-top: 80px;
  overflow: hidden;
}
</style>