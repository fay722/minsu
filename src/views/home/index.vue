<template>
  <div>
    <!-- 主页导航栏 -->
    <HomeNav />
    <!-- 内容 -->
    <HomeOne />
    <HomeTwo />
  </div>
</template>

<script>
import HomeTop from './components/home-top.vue'
import HomeNav from './components/home-nav.vue'
import HomeOne from './components/home-one.vue'
import HomeButton from './components/home-button.vue'
import HomeTwo from './components/home-two.vue'
import { getPermission } from '@/api/admin'
import { useRouter } from 'vue-router'
export default {
  components: {
    HomeTop, HomeNav, HomeOne, HomeButton, HomeTwo
  },
  setup () {
    const router = useRouter()
    // getPermission().then(data => {
    //   if (data.data.status === 1) {
    //     router.push('/admin')
    //   }
    // })
  }
}
</script>

<style>
</style>