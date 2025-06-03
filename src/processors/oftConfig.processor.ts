import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('configQueue')
export class OftConfigProcessor extends WorkerHost {
  constructor(private readonly logger: Logger) {
    super();
  }

  process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(job);
    return new Promise(() => ({ job }));
  }
}
