import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { EasyConfiguration } from './configs/easyconfig.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './database/database';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './configs/configuration.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { AuthModule } from '@app/auth';
import { RoleModule } from './role/role.module';
import { MailModule } from './mail/mail.module';

require('dotenv').config();

@Module({
  imports: [
    EasyconfigModule.register({
      path: `environment/.env.${process.env.NODE_ENV}`,
      safe: true,
    }),
    TypeOrmModule.forRootAsync(DatabaseConfiguration),
    ConfigurationModule,
    UserModule,
    RoleModule,
    SupplierModule,
    ProductModule,
    AuthModule,
    MailModule,
  ],
  providers: [EasyConfiguration, Logger],
})
export class SeederModule  {}
