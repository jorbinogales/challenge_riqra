import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { EasyconfigService } from 'nestjs-easyconfig';
import { env } from 'process';
import { EasyConfiguration } from './configs/easyconfig.service';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService: EasyConfiguration = app.get(EasyconfigService);
  await app.listen(process.env.PORT || 5000);
  
}
bootstrap();
