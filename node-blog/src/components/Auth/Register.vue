<template>
  <div class="register">
    <v-header></v-header>
    <div class="content">
      <div class="info">
        <mu-text-field hintText="请输入用户名" v-model="username"/><br/>
        <mu-text-field hintText="请输入密码" type="password" v-model="password"/><br/>
        <mu-text-field hintText="请再次输入密码" type="password" v-model="confirmPass"/><br/>
      </div>
      <mu-raised-button label="注册" class="demo-raised-button" primary @click="doRegister"/><br>
      <mu-flat-button label="返回登录" class="demo-flat-button" primary @click="toLogin"/>
      <span v-if="errMsg" class="error">{{errMsg}}</span>
    </div>
    <mu-dialog :open="dialog" title="结果提示" @close="close">
      {{message}}
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="close" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
import VHeader from '@/components/Common/Header'
import blogApi from '@/api/blog-api.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      confirmPass: '',
      dialog: false,
      message: '',
      errMsg: ''
    }
  },
  methods: {
    doRegister () {
      if (!this.username || !this.confirmPass || !this.password || this.confirmPass !== this.password) {
        this.errMsg = '信息不准确，请重新填写！'
        return
      }
      const params = {
        username: this.username,
        password: this.password
      }
      blogApi.register(params).then((res) => {
        if (res.status === 200) {
          this.message = '注册成功'
          this.dialog = true
        }
      }).catch((err) => {
        this.errMsg = '注册失败'
        console.log(err)
      })
    },
    toLogin () {
      this.$router.push('/Login')
    },
    close () {
      this.dialog = false
      this.toLogin()
    }
  },
  components: {
    VHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../assets/style/variable.less');
  .register {
    width: 100%;
    height: 100%;
  }
  .content {
    padding-top: 2.5rem;
    text-align: center;
    .mu-text-field-input {
      background: #fff;
    }
    .error {
      font-size: @font-size;
      color: red;
    }
    button {
      font-size: 0.4rem;
    }
  }
</style>
