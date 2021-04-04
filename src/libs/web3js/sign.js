import Web3 from 'web3';
import bs58 from 'bs58';
import { detectingMetamaskEnv } from '../metamask';

export const web3Inst = async () => {
  const provider = await detectingMetamaskEnv();
  if (!provider) throw new Error('No MetaMask provider.');
  return new Web3(provider);
};

/**
 *
 * @param {String} token
 * @param {String} address
 * @returns Object {sig,token,address}
 */
export const signToken = async (token, address) => {
  const web3js = await web3Inst();
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  if (!accounts || !accounts.length) throw new Error('no account');
  if (address && accounts[0] !== address)
    throw new Error('sign address not give address.');

  const signResult = await web3js.eth.personal.sign(token, address);
  const sig = bs58.encode(await Web3.utils.hexToBytes(signResult));

  return {
    sig: sig,
    token: token,
    address: address,
  };
};

export const sign4Login = async ({ authUrl, randomToken, did }, address) => {
  const web3js = await web3Inst();
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  if (!accounts || !accounts.length) throw new Error('no account');
  if (address && accounts[0] !== address)
    throw new Error('sign address not give address.');
  const content = {
    auth_url: authUrl,
    random_token: randomToken,
    did: did,
  };
  const serializeContent = JSON.stringify(content);
  const signResult = await web3js.eth.personal.sign(serializeContent, address);
  const sig = bs58.encode(await Web3.utils.hexToBytes(signResult));

  return {
    content: content,
    sig,
  };
};
