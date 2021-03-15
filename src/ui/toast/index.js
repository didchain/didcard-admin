import vue from 'vue';

import CustomToast from './CustToast';

const ToastConstructor = vue.extend(CustomToast);
/**
 *
 * @param {string} message
 * @param {string} type [normal(default),message,success,signed,fail,warn]
 * @param {number} duration
 */
function showToast(message, type = 'info', duration = 3000) {
  const _toast = new ToastConstructor({
    data() {
      return {
        show: true,
        typ: type,
        message: message,
        duration: duration,
      };
    },
  });

  let $vm = _toast.$mount().$el;
  document.body.appendChild($vm);

  setTimeout(() => {
    _toast.show = false;
  }, duration);
}

showToast.install = (Vue) => {
  Vue.prototype.$toast = showToast;
};

export default showToast;
