import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('configQueue')
export class OftConfigProcessor extends WorkerHost {
  process(job: Job<any, any, string>): Promise<any> {
    return new Promise(() => ({ job }));
  }
}
