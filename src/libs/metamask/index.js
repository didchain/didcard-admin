import detectEthereumProvider from '@metamask/detect-provider';

export const CHAIN_NETWORKS = {
  [0x1]: {
    chainId: 0x1,
    network: 'mainnet',
    name: 'Ethereum Main Network',
    disabled: false,
  },
  [0x3]: {
    chainId: 0x3,
    network: 'ropsten',
    name: 'Ropsten Test Network',
    disabled: false,
  },
  [0x4]: {
    chainId: 0x4,
    network: 'rinkeby',
    name: 'Rinkeby Test Network',
    disabled: true,
  },
  [0x5]: {
    chainId: 0x5,
    network: 'goerli',
    name: 'Goerli Test Network',
    disabled: true,
  },
  [0x2a]: {
    chainId: 0x2a,
    network: 'kovan',
    name: 'Kovan Test Network',
    disabled: true,
  },
};
export const CHAINID_MAP_KEY = {
  [0x1]: 'mainnet',
  [0x3]: 'ropsten',
  [0x4]: 'rinkeby',
};

export const detectingMetamaskEnv = async () => {
  try {
    const provider = await detectEthereumProvider({
      mustBeMetaMask: true,
      silent: false,
      timeout: 3000,
    });

    return provider;
  } catch (error) {
    throw error;
  }
};

/**
 * 检查浏览器Metamask插件冲突
 * @returns conflicts
 */
export const checkMultiMetaMaskConflict = () => {
  if (!window.ethereum || !window.ethereum.isMetaMask) return [];
  //
  let conflicts = [];
  if (window.tron) conflicts.push('TronMask');
  return conflicts;
};

export const loginMetamask = async () => {
  const ethInst = window.ethereum;
  // TODO this API maybe not safe,
  const chainId = await ethInst.request({ method: 'eth_chainId' });
  const accounts = await ethInst.request({ method: 'eth_requestAccounts' });

  return {
    chainId,
    accounts: accounts,
  };
};
