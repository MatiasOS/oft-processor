import { Module } from '@nestjs/common';
import { OftConfigProcessor } from './oftConfig.processor';
import { OftDeployProcessor } from './oftDeploy.processor';

@Module({
  imports: [OftConfigProcessor, OftDeployProcessor],
  exports: [OftConfigProcessor, OftDeployProcessor],
})
export class ProcessorsModule {}
