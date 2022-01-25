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
  console.log(objConfig);
  const port_number = objConfig.PORT || 80;
  console.log(port_number);
  await app.listen(port_number, "0.0.0.0", function() {
    console.log("Listening on Port 5000");
  });
}
bootstrap();
