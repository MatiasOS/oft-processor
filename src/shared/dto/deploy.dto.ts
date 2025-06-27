import { SupportedChainId } from '../types/chainId.types';
import { SupportedContractName } from '../types/contract.types';

export class DeployDto {
  chainId: SupportedChainId;
  contractName: SupportedContractName;
  oftId: number;
  oftPeerId: number;
  endpointV2Address: `0x${string}`;
  name: string;
  symbol: string;
  initialSupply: string;
}
