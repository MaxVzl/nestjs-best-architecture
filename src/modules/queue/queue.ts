import { NestFactory } from '@nestjs/core';
import { QueueModule } from './queue.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(QueueModule);
  console.log('Queue module initialized');
  await app.init();
}
bootstrap();
