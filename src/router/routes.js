import DefaultLayout from '@/layouts/DefaultLayout';

import HomeIndex from '../views/home/Index.vue';

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
          auth: true,
          roles: ['user', 'admin'],
        },
      },
    ],
  },
];

export default routes;
