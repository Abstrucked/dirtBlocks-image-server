import hychain from "./chain";
import abi from "./abi";

import { ethers } from 'ethers';

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
    if(!process.env.CONTRACT_ADDRESS) {
      throw new Error("Missing contract address, check your environment");
    }
    this.contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, this.provider);
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