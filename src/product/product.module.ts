import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository/product.repository';
import { ProductSeederService } from './seeder/product.seeder';
import { SupplierModule } from 'src/supplier/supplier.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    UserModule,
    SupplierModule,
    TypeOrmModule.forFeature([ProductRepository])
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductSeederService],
  exports: [ProductService]
})
export class ProductModule {}
