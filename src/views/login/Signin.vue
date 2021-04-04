<template>
  <v-container class="page-container">
    <div class="sigin-box-warp">
      <div class="left-pic">
        <!-- <v-img :src="leftIcon"></v-img> -->
        <div class="logo-box">
          <v-img :src="logoIcon" max-height="250" max-width="250"></v-img>
          <!-- <img :src="logoIcon" alt="" width="300" height="300" /> -->
        </div>
        <div class="did-login-sys my-5">
          <h2>XX系统登录</h2>
        </div>
      </div>
      <div class="right-container">
        <div class="margin-box" style="height: 10vh">
          <div v-if="isScanSiginMode" class="remaining-time">
            二维码将在 {{ lefttimes }} 秒后失效.
          </div>
        </div>
        <div class="form-box">
          <v-form
            v-if="!isScanSiginMode"
            ref="extensionForm"
            class="login-form ext-form"
          >
            <div class="login py-4">
              <label>当前区块链网络:</label>
              <span>{{ network.name }}</span>
            </div>
            <div class="wallet-address py-4 px-0">
              {{ selectedAddress }}
            </div>
            <v-btn
              rounded
              block
              color="light-blue darken-1"
              type="primary"
              :disabled="!metamaskEnabled"
              @click="signinHandler"
            >
              MetaMask 插件登录
            </v-btn>
          </v-form>

          <v-form v-if="isScanSiginMode" class="login-form">
            <div class="qrcode-img-wrap">
              <img :src="qrDataUrl" alt="" class="qrcode-box" />
              <div style="font-size: 0.75rem">手机APP扫此二维码登录</div>
              <div v-if="qrinvalid" class="invalid-mask">
                <div class="content">二维码失效,请刷新</div>
              </div>
            </div>
          </v-form>
        </div>
        <div class="footer-box">
          <v-spacer></v-spacer>
          <v-btn
            v-if="isScanSiginMode"
            text
            color="light-blue darken-1"
            type="primary"
            class="mt-4"
            @click="refreshQrcodeHandle"
          >
            刷新二维码
          </v-btn>
          <v-btn
            v-if="!isScanSiginMode"
            text
            color="light-blue darken-1"
            type="primary"
            class="mt-4"
            @click="changedQrcodeLoginHandle"
          >
            使用手机扫码登录
          </v-btn>
          <v-btn
            v-if="isScanSiginMode"
            text
            color="light-blue darken-1"
            type="primary"
            class="mt-4"
            @click="changedMetaMaskLoginHandle"
          >
            使用MetaMask插件登录
          </v-btn>
        </div>
        <div class="error-box">
          <div v-if="!metamaskEnabled" class="tip-title">
            <h4>当前系统登录不可用,请先解决以下问题：</h4>
          </div>
          <div v-if="!metamaskEnabled" class="error-msg">
            {{ getErrMessage }}
          </div>
        </div>
        <div class="margin-box" style="height: 10vh"></div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import pcIcon from '@ui/assets/icons/sign-icon.png';
import logoIcon from '@ui/assets/icons/logo_3rd.png';
import demoQrcode from '@ui/assets/images/qrcode.png';
import {
  SCAN_SIGIN_MODE,
  METAMASK_SIGIN_MODE,
} from '@/store/modules/ui/mod-cnsts.js';

import QRCode from 'qrcode';

const MAX_SECOND = 100;
const timerEnabled = true;
const acc = {
  mainAddress: '0xb2a3542b978119ecff55ed9b6e4af354a8a07a16',
  subAddress: 'BP8tALc4Pr9Dt1AsWd3kMkqN2bbQL8JDibB7mwKrzDBUfK',
  subCipher:
    '2Z5CXECU24THRHPMvSPzz6RYiZzRgWgJMogy8f7oxWzpLUK38S8aaPAL4A2ixK9X2YqBkj3js9gMNqyPodUvggWsynKtBxijnavCevJWQuevDv',
  version: 1,
};

export default {
  name: 'Signin',
  components: {},
  data() {
    return {
      logoIcon,
      demoQrcode,
      qrcodeText: 'FUTYUgb8/qdmslAmNBfH9/MvII5fzCiCpgTSesVT/6YDRvlV',
      dataUrl: '',
      leftIcon: pcIcon,
      checkTimer: null,
      qrcodeTimer: null,
      checkLocked: false,
      timeCounter: -1,
      mocker: 1,
      mainAddr: '0x2f94432422ce1C99FaA99171ada3effb570319B0',
      ctrl: {
        qrcodeLogin: true,
      },
    };
  },
  computed: {
    ...mapGetters('acc', ['ethAddr']),
    ...mapGetters('ui', ['isScanSiginMode']),
    ...mapGetters('metamask', [
      'selectedAddress',
      'network',
      'metamaskEnabled',
      'metamaskError',
      'conflicts',
    ]),
    getErrMessage() {
      if (this.metamaskEnabled) return '';

      const msgs = [];
      !!this.metamaskError && msgs.push(this.metamaskError);
      let conflictsMsg =
        this.conflicts.length > 0
          ? `存在与MetaMask冲突的插件[${this.conflicts.join(',')}]`
          : '';
      conflictsMsg && msgs.push(conflictsMsg);

      return msgs.length > 0 ? msgs.join(',') : '';
    },
    qrinvalid() {
      let invalid = false;
      if (!timerEnabled) return false;
      if (!this.isScanSiginMode) return false;

      return this.timeCounter <= 0;
    },
    qrDataUrl() {
      let text = this.dataUrl;
      return text;
    },
    lefttimes() {
      if (this.timeCounter > MAX_SECOND || this.timeCounter < 0) return 0;
      return this.timeCounter;
    },
  },
  watch: {},
  mounted() {
    this.refreshQrcodeHandle();
  },
  beforeDestroy() {
    this.destoryTimers();
  },
  methods: {
    destoryTimers() {
      this.checkTimer && clearInterval(this.checkTimer);
      (this.timeCounter = -1) &&
        this.qrcodeTimer &&
        clearInterval(this.qrcodeTimer);
    },
    startQrcodeTimer() {
      this.qrcodeTimer && this.clearQrcodeTimer();
      const that = this;
      this.timeCounter = MAX_SECOND;
      this.qrcodeTimer = setInterval(() => {
        that.timeCounter = that.timeCounter - 1;
        console.log('>>>>>>>>>>>>>>>>>', that.timeCounter);
        if (that.timeCounter <= 0) {
          that.clearQrcodeTimer();
        }
      }, 1000);
    },
    clearQrcodeTimer() {
      (this.timeCounter = -1) &&
        this.qrcodeTimer &&
        clearInterval(this.qrcodeTimer);
    },
    startCheckTimer() {
      if (!this.checkTimer) {
        const that = this;
        this.checkTimer = setInterval(async () => {
          that.mocker = that.mocker + 1;
          // TODO api request
          console.log('checkTimer log:', that.mocker);
          if (that.mocker > 20) {
            console.log('>>>>>>that.mocker >>>>>>>>>>>', that.mocker);
            clearInterval(that.checkTimer);
            // const res = await that.$store.dispatch('login2Fa', data);
            // if (res) await that.$router.replace({ path: '/' });
            const authState = {
              did: '9197735hsgd',
              accessToken: '12345646',
              username: 'scanUser',
              role: 'admin',
            };
            const saveResp = await this.$store.dispatch(
              'siginSaveState',
              authState,
            );
            if (saveResp) await that.$router.replace({ path: '/' });
            // await that.routerAuthHome(data);
          }
        }, 1000);
      }
    },
    clearCheckTimer() {
      this.checkTimer && clearInterval(this.checkTimer);
    },
    async signinHandler() {
      try {
        const data = await this.$store.dispatch('login');
        console.log(data);
        if (data) await this.$router.replace({ path: '/' });
      } catch (e) {
        console.log(e);
        this.$toast(e.message, 'warn', 8000);
      }
    },
    async changedQrcodeLoginHandle() {
      this.startQrcodeTimer();
      this.startCheckTimer();
      this.$store.dispatch('ui/setSigninMode', SCAN_SIGIN_MODE);
    },
    changedMetaMaskLoginHandle() {
      // this.ctrl.qrcodeLogin = false;
      this.destoryTimers();
      this.$store.dispatch('ui/setSigninMode', METAMASK_SIGIN_MODE);
    },
    async refreshQrcodeHandle() {
      const text = JSON.stringify(acc) + new Date().getTime();

      this.qrcodeText = text;
      const opts = {
        errorCorrectionLevel: 'M',
        margin: 1,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      };
      this.clearQrcodeTimer();
      let data = await QRCode.toDataURL(text);
      // console.log('data>>>>>', data);
      this.startQrcodeTimer();
      this.startCheckTimer();
      this.dataUrl = data;
    },
    generateQrcode(text) {
      let that = this;
      const opts = {
        width: 132,
        height: 132,
        text: text,
      };
      let qr = new QRCode('qrcodeBox', opts);
    },
    /**
     * @deprecated
     * 处理登录store & route
     */
    async routerAuthHome({ did = '', accessToken, role, username }) {
      const authState = {
        did,
        accessToken,
        username,
        role,
      };
      const saveResp = await this.$store.dispatch('siginSaveState', authState);
      if (saveResp) {
        await this.$router.replace({ path: '/' });
      }
    },
  },
};
</script>
<style>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.sigin-box-warp {
  height: 65vh;
  width: 55vw;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* padding: 50px 150px 33px 95px; */
  /* padding: 50px 75px; */
}

.left-pic {
  display: flex;
  flex-direction: column;
  flex: 0 0 35%;
  justify-content: center;
  align-items: center;
  will-change: transform;
  transform: perspective(300px) rotateX(0deg) rotateY(0deg);
}

.right-container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
}

.right-container .margin-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 24px;
}

.margin-box .remaining-time {
  align-self: flex-end;
  font-weight: 300;
  font-size: 0.65rem;
  color: #4158d0;
}

.right-container .form-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
}

.form-box form.login-form {
  width: 80%;
  flex: 0 1 auto;
  justify-content: left;
}

.login-form .qrcode-img-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.qrcode-img-wrap > img {
  width: 256px;
  height: 256px;
}

.right-container .footer-box {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.right-container .footer-box button:last-child {
  margin-right: 24px;
}

.right-container .error-box {
  width: 100%;
  flex: 0 0 auto;
  /* border: 1px solid #dff990; */
  text-align: center;
  word-break: break-all;
  padding: 12px 0px;
}

.error-box .tip-title,
.error-box .error-msg {
  font-size: 0.85rem;
  word-break: break-all;
  color: red;
}

.invalid-mask {
  width: 256px;
  height: 280px;
  position: fixed;
  float: left;
  background: rgba(246, 246, 246, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.invalid-mask .content {
  font-weight: 600;
  font-size: 1.15rem;
  color: #4158d0;
}
</style>
