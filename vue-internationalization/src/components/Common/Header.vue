<template>
  <div class="header">
    <div class="language" @click="changeLanguage">切换语言</div>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage () {
      alert('暂未开发')
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    position: relative;
    width: 100%;
    height: 40px;
    background: #6495ED;
    .language {
      position: absolute;
      top: 0;
      right: 30px;
      width: 120x;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      box-sizing: border-box;
      border: 1px solid #6495ED;
      &:hover {
       border: 1px solid #fff;
      }
    }
  }
</style>
