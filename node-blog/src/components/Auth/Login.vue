<template>
  <div class="login">
    <v-header></v-header>
    <div class="content">
      <div class="info">
        <mu-text-field hintText="请输入用户名" v-model="username"/><br/>
        <mu-text-field hintText="请输入密码" type="password" v-model="password"/><br/>
        <span v-if="errMsg" class="error">{{errMsg}}</span>
      </div>
      <mu-raised-button label="登录" class="demo-raised-button" primary @click="doLogin"/><br>
      <mu-flat-button label="没有账号？立即注册" class="demo-flat-button" primary @click="toRegister"/>
    </div>
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
      errMsg: ''
    }
  },
  methods: {
    doLogin () {
      if (!this.username || !this.password) {
        this.errMsg = '请填写完整信息再尝试！'
        return
      }
      const params = {
        username: this.username,
        password: this.password
      }
      blogApi.login(params).then((res) => {
        if (res.data.result === 0) {
          this.errMsg = '信息错误，登录失败'
        } else {
          localStorage.setItem('username', res.data.username)
          this.$router.push('/home')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    toRegister () {
      this.$router.push('/Register')
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
  .login {
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
