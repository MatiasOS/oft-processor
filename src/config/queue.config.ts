import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => ({
  host: process.env.QUEUE_HOST as string,
  port: process.env.QUEUE_PORT as string,
}));
