import { SCAN_SIGIN_MODE } from './mod-cnsts';

/**
 *
 * @param {*} state
 * @returns
 */
export const isScanSiginMode = (state) => state.siginMode === SCAN_SIGIN_MODE;
