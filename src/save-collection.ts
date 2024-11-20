import fetchCollection from "./utils/fetchCollection"
import {createDir, basePath} from "./utils/files"
import EthereumClient from './web3/ethereumClient';

export default async function saveCollection() {
  console.log("fetching and saving items")
  const isEnv: boolean = !!process.env.CONTRACT_ADDRESS
  console.log(
    isEnv ? "Using env variables" : "Using hard coded values");
  const eth: EthereumClient = new EthereumClient()
  const path = await basePath(eth)
  createDir(path);
  await fetchCollection(eth)

  console.log("done")
}


Promise.all([saveCollection()]).then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  })