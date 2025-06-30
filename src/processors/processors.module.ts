import { Module } from '@nestjs/common';
import { OftConfigProcessor } from './oftConfig.processor';
import { OftDeployProcessor } from './oftDeploy.processor';
import { ChainService } from 'src/shared/chain/chain.service';
import { ConfigService } from '@nestjs/config';
import { ContractsService } from 'src/shared/contracts/contracts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oft } from 'src/entities/oft.entity';
import { OftPeer } from 'src/entities/oftPeers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oft, OftPeer])],
  providers: [
    ChainService,
    ConfigService,
    ContractsService,
    OftConfigProcessor,
    OftDeployProcessor,
  ],
})
export class ProcessorsModule {}
