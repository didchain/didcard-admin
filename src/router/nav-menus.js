const DID_CARDS_MGR = [
  {
    path: '/cards/index',
    title: '用户管理',
    i18n: 'cardsManager',
    sort: 1,
    icon: 'mdi-id-card',
    children: [
      {
        path: '/cards/index',
        title: '开卡',
        i18n: 'cardsManager',
        sort: 1,
        icon: 'mdi-credit-card-scan-outline',
        roles: ['admin'],
      },
      {
        path: '/cards/authorized',
        title: '卡片授权',
        i18n: 'cardsAuhtorize',
        sort: 2,
        icon: 'mdi-two-factor-authentication',
        roles: ['admin', 'user'],
      },
    ],
  },
];

const DID_2FA_MGR = [
  {
    path: '/permission',
    title: '权限',
    icon: 'mdi-focus-field',
    sort: 2,
    i18n: 'permissionManager',
    children: [
      {
        path: '/permission/index',
        title: '权限条目',
        i18n: 'cardsManager',
        sort: 1,
        icon: 'mdi-file-tree',
        roles: ['admin'],
      },
    ],
  },
];

const DEMO = [
  {
    path: '/demo/index',
    title: 'Demo',
    icon: 'mdi-vuetify',
    sort: 3,
    i18n: 'demo',
    roles: ['admin', 'user'],
  },
];

const All_MENUS = [...DID_CARDS_MGR, ...DID_2FA_MGR, ...DEMO];

function sortMenus(all = []) {
  return all.sort(compareMenu).map((g) => {
    if (g.children && g.children.length > 1) {
      g.children.sort(compareMenu);
    }

    return g;
  });
}

function compareMenu(a, b) {
  const asort = a.sort || 0;
  const bsort = b.sort || 0;
  if (asort > bsort) {
    return 1;
  } else if (asort < bsort) {
    return -1;
  } else {
    return 0;
  }
}

export const getAuthNavMenus = (role = 'user') => {
  let all = JSON.parse(JSON.stringify(sortMenus(All_MENUS)));
  // filter sub
  all = all.map((g) => {
    if (g.children) {
      g.children = g.children.filter((m) => m.roles && m.roles.includes(role));
    }

    return g;
  });

  all = all.filter((g) => (g.children && g.children.length > 0) || !g.children);

  return all;
};

export default All_MENUS;
