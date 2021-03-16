import * as types from './mutation-types';

import { getAuthNavMenus } from '@/router/nav-menus.js';

export const loadNavMenus = async ({ commit }, role) => {
  const menus = getAuthNavMenus(role);
  commit(types.RELOAD_NAV_MENUS, menus);
};
