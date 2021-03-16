import DefaultLayout from '@/layouts/DefaultLayout';
import SinglePageLayout from '@/layouts/SinglePageLayout.vue';

import HomeIndex from '../views/home/Index.vue';
import Signin from '../views/login/Signin.vue';
import DemoIndex from '../views/demos/Index.vue';

//cards
import CardIndex from '../views/cards/Index.vue';
import CardAuthorization from '../views/cards/Authorization.vue';

const cards = {
  path: '/cards',
  component: DefaultLayout,
  children: [
    {
      path: 'index',
      alias: ['/cards'],
      component: CardIndex,
      meta: {
        icon: '',
        title: 'kaipa',
        auth: true,
        roles: ['user', 'admin'],
      },
    },
    {
      path: 'authorized',
      component: CardAuthorization,
      meta: {
        icon: '',
        title: '授权',
        auth: true,
        roles: ['user', 'admin'],
      },
    },
  ],
};

const permission = {
  path: '/permission',
  component: DefaultLayout,
  children: [
    {
      path: 'index',
      alias: ['/permission'],
      component: CardIndex,
      meta: {
        icon: '',
        title: 'kaipa',
        auth: true,
        roles: ['user', 'admin'],
      },
    },
  ],
};

const demo = {
  path: '/demo',
  component: DefaultLayout,
  children: [
    {
      path: 'index',
      alias: ['/demo'],
      component: DemoIndex,
      meta: {
        icon: '',
        title: '首页',
        auth: true,
        roles: ['user', 'admin'],
      },
    },
  ],
};

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'index',
        alias: ['/', '/home'],
        component: HomeIndex,
        //import('../views/home/Index.vue'),
        meta: {
          icon: '',
          title: '首页',
          auth: true,
          roles: ['user', 'admin'],
        },
      },
    ],
  },
  cards,
  permission,
  demo,
  {
    path: '/',
    component: SinglePageLayout,
    children: [
      {
        path: 'signin',
        component: Signin,
        // redirect: '/',
      },
    ],
  },
];

export default routes;
