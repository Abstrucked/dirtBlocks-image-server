import EthereumClient from '../web3/ethereumClient';
import {saveItem, basePath, fileList} from './files';

export default async function fetchCollection(
  eth: EthereumClient,
  ): Promise<string[]> {
  const path = await basePath(eth)
  let collection: Array<string> = [];
  const supply: number = await eth.totalSupply();
  const files: string[] = fileList(path)
  console.log("folder =>\n", files)
  for(let i: number = 1; i <= supply; i++) {
    const filePath = [path, `${i}.json`].join('/')
    if(!files.includes(`${i}.json`)) {

      saveItem(filePath, await eth.tokenJSON(i))
    }
  }
  return collection
}