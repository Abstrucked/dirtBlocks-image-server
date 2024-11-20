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

  async name(): Promise<String> {
    return await this.contract.name();
  }
}

export default EthereumClient;