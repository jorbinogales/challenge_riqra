import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierService } from './../supplier/supplier.service';
import { UserEntity } from './../user/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FiltrosDto } from './dto/filtros.dto';
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


  /* 
  GET PRODUCT BY PROVIDER OR SUPPLIER 
  */
 async getProductByProvider(
   user: UserEntity,
   filtros: FiltrosDto,
   ): Promise<ProductEntity[]>{

  const { name , price } = filtros;


  const product = this._productRepository
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.supplier_id', 'supplier_id')
    .where('supplier_id.id = :supplier_id', {
      supplier_id: user.supplier_id.id
    })
    .andWhere('product.deleted_at IS NULL')
    
    //-----------------------------------------------------
    if (name) {
      product.andWhere('product.name LIKE :name', {
        name: `%${name}%`,
      });
    }
    //----------------------------------------------------------

    //-----------------------------------------------------
    if (price) {
      product.andWhere('product.price LIKE :price', {
        price: `%${price}%`,
      });
    }
    //----------------------------------------------------------
    return await product.getMany();
 }

 /* 
 DELETE PRODUCT 
 */
  async deleteProduct(id:number): Promise<any>{
    const product = await this.getProduct(id);
    return await this._productRepository.deleteProduct(product);
  }

  /* 
 UPDATE PRODUCT 
 */
  async updateProduct(id:number, updateProductDto: UpdateProductDto): Promise<any>{
    const { supplier_id } = updateProductDto;
    const product = await this.getProduct(id);
    let supplier = product.supplier_id;
    if(supplier_id){
       supplier = await this._supplierService.getById(supplier_id)
    }
    return await this._productRepository.updateProduct(product, updateProductDto, supplier);
  }
  
  

  /* 
  GET PRODUCT BY ID
  */
  async getProduct(id:number): Promise<ProductEntity>{
    const product =  await this._productRepository.findOne({
      where: {
        id,
        deleted_at: null,
      }
    })
    if(!product){
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }


}
