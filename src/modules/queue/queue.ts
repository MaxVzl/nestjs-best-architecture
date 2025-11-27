import { NestFactory } from '@nestjs/core';
import { QueueModule } from './queue.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(QueueModule);
  await app.init();
}
bootstrap();
