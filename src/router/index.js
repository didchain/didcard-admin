import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some((rec) => rec.meta && rec.meta.auth)) {
    const accessData = await Store.getters['accessData'];
    console.log('>>>>>accessData>>>>>>>>', accessData);

    const needLogin =
      !accessData || !accessData.accessToken || !accessData.accessRole;

    // console.log('>>>>', from, accessData, await Store.getters['auth/navMenus']);
    if (needLogin) {
      console.log('>>>>>accessData>>>>>>>>', accessData);
      //TODO
      next({ path: '/signin' });
      // if (!(await Store.getters['auth/navMenus'])) {
      await Store.dispatch('auth/loadNavMenus', accessData.accessRole);
      // }

      // next();
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
