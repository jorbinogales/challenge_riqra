import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { AuthModule } from '@app/auth';
import { SupplierModule } from 'src/supplier/supplier.module';
import { RoleModule } from 'src/role/role.module';
import { UserSeederService } from './seeder/seeder.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[
    forwardRef(() => AuthModule),
    MailModule,
    SupplierModule,
    RoleModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSeederService],
  exports: [UserService, UserSeederService],
})
export class UserModule {}
