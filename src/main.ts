import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EasyconfigService } from 'nestjs-easyconfig';
import { env } from 'process';
import { EasyConfiguration } from './configs/easyconfig.service';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: EasyConfiguration = app.get(EasyconfigService);
  const objConfig = configService['envConfig'];

  const port = objConfig.PORT || 5000;

  await app.listen(port);
}
bootstrap();
