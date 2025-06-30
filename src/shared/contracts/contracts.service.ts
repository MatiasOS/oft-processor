import { Injectable } from '@nestjs/common';
import { AlTokeOFT } from './AlTokeOFT';
import { MerkleDistributor } from './MerkleDistributor';
import { Abi } from 'viem';
import { SupportedContractName } from '../types/contract.types';

export interface Contract {
  contractName: SupportedContractName;
  abi: Abi;
  bytecode: `0x${string}`;
}

@Injectable()
export class ContractsService {
  findOne(name: SupportedContractName): Contract {
    const v = [AlTokeOFT, MerkleDistributor].find(
      ({ contractName }) => contractName === name,
    );

    if (!v) {
      throw new Error(`ContractsService: Contract ${name} not found`);
    }

    return v;
  }
}
