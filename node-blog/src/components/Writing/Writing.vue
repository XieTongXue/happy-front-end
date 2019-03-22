<template>
  <div class="writing" :style="{minHeight: minHeight + 'px'}">
    <div class="content">
      <div class="input">
        <span>标题：</span>
        <mu-text-field v-model="title" hintText="最多不超过10个字符" :errorText="inputErrorText" @textOverflow="handleInputOverflow" :maxLength="10"/><br/>
        <span>内容：</span>
        <mu-text-field v-model="content" hintText="不允许超过100个字符" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="100"/><br/>
        <span v-if="errMsg" class="error">{{errMsg}}</span>
      </div>
      <mu-raised-button label="发表" @click="publish" class="demo-raised-button" primary/>
      <mu-dialog :open="dialog" title="结果提示" @close="close">
        {{message}}
        <mu-flat-button slot="actions" @click="close" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="close" label="确定"/>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
import setMinHeight from '@/common/js/util.js'
import blogApi from '@/api/blog-api.js'
export default {
  data () {
    return {
      title: '',
      content: '',
      minHeight: 0,
      inputErrorText: '',
      multiLineInputErrorText: '',
      dialog: false,
      message: '',
      errMsg: ''
    }
  },
  mounted () {
    setMinHeight(this, 104)
  },
  methods: {
    publish () {
      if (!this.title || !this.content) {
        this.errMsg = '请先填写完整信息哦'
        return
      }
      const blog = {
        title: this.title,
        content: this.content
      }
      blogApi.setBlog(blog).then((res) => {
        if (res.status === 200) {
          this.message = '发表成功'
          this.dialog = true
        }
      }).catch((err) => {
        this.errMsg = '发表失败'
        console.log(err)
      })
    },
    close () {
      this.dialog = false
      this.$router.push('/Home/Reading')
    },
    handleInputOverflow (isOverflow) {
      this.inputErrorText = isOverflow ? '已经超出字数限制！！！！' : ''
    },
    handleMultiLineOverflow (isOverflow) {
      this.multiLineInputErrorText = isOverflow ? '已经超出字数限制！！！！' : ''
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../assets/style/variable.less');
  .writing {
    font-family: @font-family;
    font-size: @font-size;
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .input {
        span {
          display: block;
          width: 100%;
          text-align: left;
          font-size: @font-size;
          color: #7e57c2;
          font-weight: normal;
        }
        .error {
          color: red;
          font-size: @font-size;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
</style>
