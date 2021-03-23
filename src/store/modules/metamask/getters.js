import { CHAIN_NETWORKS } from '@lib/metamask';

export const network = (state) => {
  const chainId = state.chainId;
  const nw = CHAIN_NETWORKS[chainId];
  return nw || { chainId, network: '', name: '' };
};
