<template>
  <ListTop />
  <PersonalCenter />
</template>

<script>
import ListTop from '@/components/list-top.vue'
import PersonalCenter from './components/personal-center.vue'
export default {
  name: 'PersonalIndex',
  components: { ListTop, PersonalCenter }
}
</script>

<style>
</style>