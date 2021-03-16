export function validMetaMaskEnv() {
  const { ethereum } = window;
  return ethereum && ethereum.isMetaMask;
}
