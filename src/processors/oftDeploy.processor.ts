import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Oft } from 'src/entities/oft.entity';
import { OftPeer } from 'src/entities/oftPeers.entity';
import { ChainService } from 'src/shared/chain/chain.service';
import { DeployDto } from 'src/shared/dto/deploy.dto';
import { Repository } from 'typeorm';

@Processor('deployQueue')
export class OftDeployProcessor extends WorkerHost {
  constructor(
    private readonly chainService: ChainService,
    @InjectRepository(Oft)
    private readonly oftsRepository: Repository<Oft>,
    @InjectRepository(OftPeer)
    private readonly peersRepository: Repository<OftPeer>,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { chainId, contractName, deployArgs, oftPeerId } =
      job.data as DeployDto;

    const txHash = await this.chainService.deploy({
      chainId,
      contractName,
      deployArgs,
    });

    await this.peersRepository.update(
      { id: oftPeerId },
      { deployTxHash: txHash },
    );

    return {};
  }
}
