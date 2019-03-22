<template>
  <div class="about" :style="{minHeight: minHeight + 'px'}">
    <span>占位置专用~</span>
  </div>
</template>

<script>
import setMinHeight from '@/common/js/util.js'
export default {
  data () {
    return {
      minHeight: 0
    }
  },
  mounted () {
    setMinHeight(this, 104)
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/style/variable.less');
  .about {
    font-size: @font-size;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
