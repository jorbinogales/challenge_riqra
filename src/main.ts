import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { env } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Riqra Challenge Documentation')
    .setDescription('Documentation Backend About Challenge Riqra')
    .setVersion('1.0')
    .addTag('RIQRA CHALLENGE BACKEND')
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "XYZ")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);  
  await app.listen(process.env.PORT || 5000);
  
}
bootstrap();
