import { NestFactory } from '@nestjs/core';
import { QueuesModule } from './queues.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(QueuesModule);
  await app.init();
}
bootstrap();
