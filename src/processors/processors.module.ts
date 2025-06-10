import { Module } from '@nestjs/common';
import { OftConfigProcessor } from './oftConfig.processor';
import { OftDeployProcessor } from './oftDeploy.processor';

@Module({
  providers: [OftConfigProcessor, OftDeployProcessor],
})
export class ProcessorsModule {}
