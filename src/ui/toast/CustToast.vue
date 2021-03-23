<template>
  <div
    v-if="show"
    id="__bp_toast"
    class="CustToast cust-toast"
    :class="'toast-' + typ"
  >
    <div class="toast-icon">
      <div class="icon">
        <img :src="iconSrc" />
      </div>
    </div>
    <div class="toast-content" :class="typ ? 'content-' + typ : ''">
      {{ message }}
    </div>
  </div>
</template>

<script>
import infoIcon from '@/ui/assets/svgs/info.svg';
import successIcon from '@/ui/assets/svgs/success_green.svg';
import failIcon from '@/ui/assets/svgs/failure.svg';
import errorIcon from '@/ui/assets/svgs/error.svg';
import warnIcon from '@/ui/assets/svgs/warning.svg';

export default {
  name: 'CustToast',
  props: {
    // type: {
    //   type: String,
    //   default: 'info',
    // },
  },
  data() {
    return {
      typ: 'info',
      message: '',
      duration: 1500,
      show: true,
      maxWidth: 300,
      icons: {
        infoIcon,
        successIcon,
        failIcon,
        warnIcon,
        errorIcon,
      },
    };
  },

  computed: {
    iconSrc() {
      // const icons = this.icons;
      // console.log('>>>>', this.typ);
      if (this.typ === 'info') {
        return infoIcon;
      }

      if (this.typ === 'warn') {
        return warnIcon;
      }

      if (this.typ === 'success') return successIcon;
      if (this.typ === 'error') return errorIcon;
      if (this.typ === 'fail') return failIcon;
      return infoIcon;
    },
  },
};
</script>
<style scoped>
.cust-toast {
  position: fixed;
  z-index: 99999;
  min-width: calc(100% - 77px);
  max-width: calc(100% - 37px);
  left: 50%;
  top: 50%;
  background: rgb(233, 233, 235);
  padding: 8px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  animation: show-toast 0.2s;
  color: #909399;
  overflow: hidden;
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .cust-toast {
    min-width: calc(100% - 77px);
    max-width: calc(100% - 37px);
  }
}

@media only screen and (min-width: 600px) {
  .cust-toast {
    min-width: calc(70% - 130px);
    max-width: calc(70% - 30px);
  }
}

@media only screen and (min-width: 768px) {
  .cust-toast {
    min-width: calc(50% - 130px);
    max-width: calc(50% - 30px);
  }
}

@media only screen and (min-width: 992px) {
  .cust-toast {
    min-width: calc(40% - 30px);
    max-width: calc(40% - 30px);
  }
}
@keyframes show-toast {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.icon img {
  width: 32px;
  height: 32px;
  margin-top: 3px;
  margin-right: 12px;
}
.cust-toast > div {
  display: flex;
  align-items: center;
}

.toast-icon {
  flex: 0 0 30px;
  justify-content: center;
  align-items: center;
}

div.toast-content {
  /* color: rgba(0, 0, 0, 0.87); */
  word-break: break-all;
  flex: 1 1 auto;
  justify-self: start;
  align-items: center;
}

div.toast-info {
  color: #ffffff;
  background: rgba(3, 155, 229, 0.85);
  /* background: linear-gradient(217deg, #7917d3 0%, #0362c3 100%); */
}

.toast-success {
  color: #ffffff;
  background: rgba(0, 202, 155, 0.75);
}

.toast-warn {
  color: #ff6f26;
  background: rgba(250, 236, 216, 0.85);
}

.toast-error {
  color: #f56c6c;
  background: rgba(255, 255, 255, 0.98);
}

.toast-fail {
  color: #515151;
  background: rgba(246, 246, 246, 0.95);
}
</style>
