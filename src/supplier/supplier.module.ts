import { forwardRef, Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierRepository } from './repository/supplier.repository';
import { SupplierSeederService } from './seeder/supplier.seeder';
import { AuthModule } from '@app/auth';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    AuthModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([SupplierRepository])
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierSeederService],
  exports: [SupplierService],
})
export class SupplierModule {}
