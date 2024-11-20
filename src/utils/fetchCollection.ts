import EthereumClient from '../web3/ethereumClient';

export default async function fetchCollection(
  eth: EthereumClient,
  ): Promise<string[]> {
  let collection: Array<Promise<string>> = [];
  const supply: number = await eth.totalSupply();
  for(let i: number = 1; i <= supply; i++) {
    collection.push(eth.tokenJSON(i))
  }
  return Promise.all(collection);
}