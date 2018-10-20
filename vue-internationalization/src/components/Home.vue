<template>
  <div class="home">
    <v-header @changeLanguage="changeLanguage"></v-header>
    <div class="menu-wrapper">
        <ul class="menu">
            <li @click="active = 'Home'" :class="active === 'Home' ? 'active' : ''">{{$t("menu.home")}}</li>
            <li @click="active = 'UserCenter'" :class="active === 'UserCenter' ? 'active' : ''">{{$t("menu.userCenter")}}</li>
            <li @click="active = 'Message'" :class="active === 'Message' ? 'active' : ''">{{$t("menu.message")}}</li>
            <li @click="active = 'Setting'" :class="active === 'Setting' ? 'active' : ''">{{$t("menu.setting")}}</li>
            <li @click="active = 'Download'" :class="active === 'Download' ? 'active' : ''">{{$t("menu.download")}}</li>
        </ul>
    </div>
    <user-center v-if="active === 'UserCenter'"></user-center>
    <message v-if="active === 'Message'"></message>
    <setting v-if="active === 'Setting'"></setting>
    <download v-if="active === 'Download'"></download>
    <div v-if="active === 'Home'" class="home-content">
        {{ $t('menu.home') }}-----{{ js }}
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
  computed: {
    js () {
      return this.$t('others.JSExample')
    }
  },
  methods: {
    changeLanguage () {
      const lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
      this.$i18n.locale = lang
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
                margin-left: 10px;
                cursor: pointer;
                text-align: center;
                box-sizing: border-box;
                color: #fff;
                border: 1px solid #6495ED;
                &:hover {
                    border: 1px solid #fff;
                }
                &.active {
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
