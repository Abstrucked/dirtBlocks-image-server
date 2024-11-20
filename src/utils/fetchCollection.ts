import EthereumClient from '../web3/ethereumClient';
import {saveItem, basePath} from './files';

export default async function fetchCollection(
  eth: EthereumClient,
  ): Promise<string[]> {
  const path = await basePath(eth)
  let collection: Array<string> = [];
  const supply: number = await eth.totalSupply();
  for(let i: number = 1; i <= supply; i++) {
    saveItem([path, `${i}.json`].join('/'), await eth.tokenJSON(i))
  }
  return collection
}