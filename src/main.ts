import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('EasyNR10 API')
    .setDescription('API para gerenciamento de Documentos de NR10')
    .setVersion('1.0')
    .addTag('easyNR10')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
void bootstrap();
