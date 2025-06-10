import { SupportedChainId } from '../types/chainId.types';
import { SupportedContractName } from '../types/contract.types';

export class DeployDto {
  chainId: SupportedChainId;
  contractName: SupportedContractName;
  deployArgs: unknown[];
  oftId: number;
  oftPeerId: number;
}
