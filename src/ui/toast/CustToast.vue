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
import infoIcon from '@/ui/assets/svgs/info_circle.svg';
import successIcon from '@/ui/assets/svgs/success.svg';
import failIcon from '@/ui/assets/svgs/fail_circle.svg';
import warnIcon from '@/ui/assets/svgs/warn_circle.svg';

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
      if (this.typ === 'error') return failIcon;
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
  width: 20px;
  height: 20px;
  margin-top: 3px;
  margin-right: 4px;
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
  flex: 1 1 auto;
  justify-self: start;
  align-items: center;
}

div.toast-info {
  color: white;
  background: linear-gradient(217deg, #7917d3 0%, #0362c3 100%);
}

.toast-success {
  color: rgba(0, 202, 155, 1);
  background: rgba(0, 202, 155, 0.3);
}

.toast-warn {
  color: #e6a23c;
  background: rgb(250, 236, 216);
}

.toast-error {
  color: #f56c6c;
  background: rgb(253, 226, 226);
}

.toast-tips {
  color: #515151;
  background: rgb(246, 246, 246);
}
</style>
