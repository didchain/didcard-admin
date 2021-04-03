<template>
  <v-container class="page-container">
    <div class="sigin-box-warp">
      <div class="left-pic">
        <v-img :src="leftIcon"></v-img>
      </div>
      <div class="right-container">
        <div class="margin-box" style="height: 10vh"></div>
        <div class="form-box">
          <v-form
            v-if="!ctrl.qrcodeLogin"
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

          <v-form v-if="ctrl.qrcodeLogin" class="login-form">
            <div class="qrcode-img-wrap">
              <img :src="qrDataUrl" alt="" class="qrcode-box" />
              <div style="font-size: 0.85rem">手机APP扫此二维码</div>
            </div>
          </v-form>
        </div>
        <div class="footer-box">
          <v-spacer></v-spacer>
          <v-btn
            v-if="ctrl.qrcodeLogin"
            text
            color="light-blue darken-1"
            type="primary"
            class="mt-4"
            @click="refreshQrcodeHandle"
          >
            刷新二维码
          </v-btn>
          <v-btn
            v-if="!ctrl.qrcodeLogin"
            text
            color="light-blue darken-1"
            type="primary"
            class="mt-4"
            @click="changedQrcodeLoginHandle"
          >
            使用手机扫码登录
          </v-btn>
          <v-btn
            v-if="ctrl.qrcodeLogin"
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
import demoQrcode from '@ui/assets/images/qrcode.png';

import QRCode from 'qrcode';

export default {
  name: 'Signin',
  components: {},
  data() {
    return {
      demoQrcode,
      qrcodeText: 'FUTYUgb8/qdmslAmNBfH9/MvII5fzCiCpgTSesVT/6YDRvlV',
      dataUrl: '',
      leftIcon: pcIcon,
      mainAddr: '0x2f94432422ce1C99FaA99171a2a3effb570319B0',
      ctrl: {
        qrcodeLogin: true,
      },
    };
  },
  computed: {
    ...mapGetters('acc', ['ethAddr']),
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
    qrDataUrl() {
      let text = this.dataUrl;
      return text;
    },
  },
  watch: {},
  mounted() {
    this.refreshQrcodeHandle();
  },
  methods: {
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
      this.ctrl.qrcodeLogin = true;
    },
    changedMetaMaskLoginHandle() {
      this.ctrl.qrcodeLogin = false;
    },
    async refreshQrcodeHandle() {
      const acc = {
        crypto: {
          cipher: 'aes-128-ctr',
          cipherparams: { iv: 'fc39147a23bcd89b0497edbede9ddd5d' },
          ciphertext:
            '3daa6f35d44f3134cb536b83c90151cfc35929f13556ab3164a4dad5034594c0',
          kdf: 'scrypt',
          kdfparams: {
            dklen: 32,
            n: 262144,
            p: 1,
            r: 8,
            salt:
              '4aee47dcae2d89c7b29536d802062c776e43fcf6706dfe12cf1f9e6f9e41456c',
          },
          mac:
            'fb857198146846e7ce03f7ad41a5e3939a9c7f03d08fc0b3509022b6743a553f',
        },
        mainAddress: '0xb2a3542b978119ecff55ed9b6e4af354a8a07a16',
        subAddress: 'BP8tALc4Pr9Dt1AsWd3kMkqN2bbQL8JDibB7mwKrzDBUfK',
        subCipher:
          '2Z5CXECU24THRHPMvSPzz6RYiZzRgWgJMogy8f7oxWzpLUK38S8aaPAL4A2ixK9X2YqBkj3js9gMNqyPodUvggWsynKtBxijnavCevJWQuevDv',
        version: 1,
      };
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
      let data = await QRCode.toDataURL(text);
      console.log('data>>>>>', data);
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
    createQrcode(text) {},
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

.right-container .footer-box :last-child {
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
</style>
