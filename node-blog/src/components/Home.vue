<template>
  <div class="home">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from '@/components/Common/Header'
import VFooter from '@/components/Common/Footer'
export default {
  created () {
    this.$router.push({
      path: '/Home/Reading'
    })
  },
  components: {
    VHeader,
    VFooter
  }
}
</script>

<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
  }
</style>
