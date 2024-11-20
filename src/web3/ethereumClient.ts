import hychain from "./chain";
import abi from "./abi";

import { ethers } from 'ethers';
import config from '../utils/config';

declare interface IEthereumClient {
  provider: ethers.JsonRpcProvider | null;
  contract: ethers.Contract | null;
}

class EthereumClient implements IEthereumClient {
  provider: ethers.JsonRpcProvider = null;
  contract: ethers.Contract = null;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      hychain.rpcUrl,
      hychain.chainId
    )


    const contractAddress: string =
      !!process.env.CONTRACT_ADDRESS ? process.env.CONTRACT_ADDRESS as string : config.web3.contractAddress as string;

    if(!ethers.isAddress(contractAddress))
      throw new Error("Invalid contract address");

    this.contract = new ethers.Contract(contractAddress, abi, this.provider);

  }


  async name(): Promise<string> {
    return await this.contract.name();
  }
  async totalSupply(): Promise<number> {
    return await this.contract.totalSupply()
  }

  async tokenJSON(tokenId: number): Promise<string> {
    return await this.contract.tokenJSON(tokenId)
  }
}

export default EthereumClient;