<template>
  <div class="home">
    <v-header></v-header>
    <div class="menu-wrapper">
        <ul class="menu">
            <li @click="active = 'Home'">首页</li>
            <li @click="active = 'UserCenter'">个人中心</li>
            <li @click="active = 'Message'">消息</li>
            <li @click="active = 'Setting'">设置</li>
            <li @click="active = 'Download'">下载</li>
        </ul>
    </div>
    <user-center v-if="active === 'UserCenter'"></user-center>
    <message v-if="active === 'Message'"></message>
    <setting v-if="active === 'Setting'"></setting>
    <download v-if="active === 'Download'"></download>
    <div v-if="active === 'Home'" class="home-content">
        home
    </div>
  </div>
</template>

<script>
import VHeader from '@/components/Common/Header'
import Download from '@/components/Download/Download'
import Message from '@/components/Message/Message'
import Setting from '@/components/Setting/Setting'
import UserCenter from '@/components/UserCenter/UserCenter'
export default {
  data () {
    return {
      active: 'Home'
    }
  },
  components: {
    VHeader,
    Download,
    Message,
    Setting,
    UserCenter
  }
}
</script>

<style lang="less">
.home {
    width: 100%;
    .menu-wrapper {
        position: relative;
        width: 100%;
        height: 40px;
        background: #6495ED;
        .menu {
            position: absolute;
            left: 50%;
            top:0px;
            transform: translate(-50%, 0);
            li {
                float: left;
                height: 30px;
                width: 100px;
                font-size: 18px;
                line-height: 30px;
                list-style: none;
                cursor: pointer;
                text-align: center;
                box-sizing: border-box;
                color: #fff;
                border: 1px solid #6495ED;
                &:hover {
                    border: 1px solid #fff;
                }
            }
        }
    }
    .home-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        font-size: 24px;
    }
}
</style>
