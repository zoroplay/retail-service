import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from './retail/retail.pb';
import { JsonLoggerService } from 'json-logger-service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
        package: protobufPackage,
        protoPath: join(__dirname, '../proto/retail.proto'),
      },
    },
  );
  app.useLogger(
    new JsonLoggerService(
      `Retail service on ${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
    ),
  );
  await app.listen();
}
bootstrap();
