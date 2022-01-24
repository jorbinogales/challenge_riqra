import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from 'src/supplier/entities/supplier.entity';
import { SupplierService } from 'src/supplier/supplier.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductRepository)
    private readonly _productRepository: ProductRepository,
    private readonly _supplierService: SupplierService,
  ){}

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity>{
    const { supplier_id } = createProduct;
    const supplier = await this._supplierService.getById(supplier_id);
    return await this._productRepository.createProduct(createProduct, supplier);
  }

}
