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
export default {
  components: {
    HomeTop, HomeNav, HomeOne, HomeButton, HomeTwo
  }
}
</script>

<style>
</style>