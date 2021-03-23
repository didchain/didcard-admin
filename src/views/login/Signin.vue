<template>
  <v-container class="page-container">
    <div class="sigin-box-warp">
      <div class="left-pic">
        <!-- <img :src="leftIcon" alt="" /> -->
        <v-img :src="leftIcon"></v-img>
      </div>

      <div class="sign-form-warp">
        <div v-if="!metamaskEnabled" class="metamask-error-box">
          <div class="tip-title">
            <h4>当前系统登录不可用,请先解决以下问题：</h4>
          </div>
          <div class="error-msg">{{ getErrMessage }}</div>
        </div>
        <v-form v-if="metamaskEnabled" ref="signinForm" class="sign-from">
          <div class="login py-4">
            <label>登录:</label>
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
            Sign In
          </v-btn>
        </v-form>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import pcIcon from '@ui/assets/icons/sign-icon.png';

export default {
  name: 'Signin',
  data() {
    return {
      leftIcon: pcIcon,
      mainAddr: '0x2f94432422ce1C99FaA99171a2a3effb570319B0',
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
/* .left-pic img {
  max-width: 100%;
} */
.sign-form-warp {
  display: flex;
  flex-direction: column;
  flex: 0 1 55%;
  justify-content: center;
  align-items: center;
}
.sign-form-warp form {
  width: 95%;
}

.wallet-address {
  text-align: center;
  word-break: break-all;
}

.metamask-error-box .error-msg {
  color: red;
  margin-top: 1rem;
  font-size: 0.95rem;
}
</style>
