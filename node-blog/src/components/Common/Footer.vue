<template>
  <div class="footer">
    <mu-paper>
      <mu-bottom-nav :value="activeMenu" @change="handleChange">
        <mu-bottom-nav-item value="Reading" title="Reading" icon="home"/>
        <mu-bottom-nav-item value="Writing" title="Writing" icon="edit"/>
        <mu-bottom-nav-item value="About" title="About" icon="info"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeMenu: 'Reading'
    }
  },
  methods: {
    handleChange (val) {
      this.activeMenu = val
      this.$router.push('/Home/' + this.activeMenu)
    }
  }
}
</script>

<style scoped>

</style>
