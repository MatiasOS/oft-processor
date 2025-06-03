import { Logger } from '@nestjs/common';

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('deployQueue')
export class OftDeployProcessor extends WorkerHost {
  constructor(private readonly logger: Logger) {
    super();
  }

  process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(job);
    return new Promise(() => ({ job }));
  }
}
