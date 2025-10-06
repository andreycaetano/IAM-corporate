import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const url = process.env.RABBITMQ_URL;
  const queue = process.env.RABBITMQ_QUEUE;
  if (!url || !queue) {
    throw new Error('RABBITMQ_URL e RABBITMQ_QUEUE devem estar definidos');
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
void bootstrap();
