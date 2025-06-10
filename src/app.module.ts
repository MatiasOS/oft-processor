import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import rpcConfig from './config/rpc.config';
import wallets from './config/wallets.config';
import queue from './config/queue.config';
import { ProcessorsModule } from './processors/processors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oft } from './entities/oft.entity';
import { OftPeer } from './entities/oftPeers.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [rpcConfig, wallets, queue],
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue(
      {
        name: 'deployQueue',
      },
      {
        name: 'configQueue',
      },
    ),
    ProcessorsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_CONNECTION_STRING,
      entities: [Oft, OftPeer],
      synchronize: false,
      migrations: ['dist/db/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
