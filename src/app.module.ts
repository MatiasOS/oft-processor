import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import alchemyConfig from './config/alchemy.config';
import rpcConfig from './config/rpc.config';
import wallets from './config/wallets.config';
import { ProcessorsModule } from './processors/processors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [alchemyConfig, rpcConfig, wallets],
      isGlobal: true,
      envFilePath: ['.env.development.local'],
    }),
    BullModule.registerQueue({
      name: 'queueName',
      connection: {
        host: process.env.QUEUE_HOST || 'redis',
        port:
          (process.env.QUEUE_PORT && parseInt(process.env.QUEUE_PORT)) || 6379,
      },
    }),
    BullModule.registerFlowProducer({
      name: 'flowProducerName',
      connection: {
        host: process.env.QUEUE_HOST || 'redis',
        port:
          (process.env.QUEUE_PORT && parseInt(process.env.QUEUE_PORT)) || 6379,
      },
    }),
    ProcessorsModule,
  ],
  providers: [],
})
export class AppModule {}
