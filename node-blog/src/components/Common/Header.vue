<template>
  <div class="header">
    <mu-appbar title="NodeBlog">
      <mu-icon-button icon="menu" slot="left"/>
      <mu-flat-button :label="username" slot="right"/>
      <mu-flat-button :label="out" @click="logout" slot="right"/>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: 'ddd',
      out: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.username = localStorage.getItem('username')
      if (this.username) {
        this.out = '注销'
      }
    },
    logout () {
      localStorage.clear()
      this.out = ''
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
