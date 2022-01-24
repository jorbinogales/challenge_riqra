import { SupplierEntity } from "src/supplier/entities/supplier.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductEntity } from "../entities/product.entity";


@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity>{

    /* 
        CREATE PRODUCT
    */
   async createProduct(
       createProductDto: CreateProductDto, 
       supplier: SupplierEntity): Promise<ProductEntity>{
       const { name, price } = createProductDto;
       const product = await this.create({
           name,
           price,
           supplier_id: supplier
       })
       return await this.save(product);
   }
}