import { SupplierEntity } from "src/supplier/entities/supplier.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
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

   
    /* 
        UPDATE PRODUCT 
    */
        async updateProduct(
            product: ProductEntity, 
            updateProductDto: UpdateProductDto,
            supplier: SupplierEntity,
            ): Promise<ProductEntity>{
            const { name, price } = updateProductDto;
            product.supplier_id = supplier;
            
            if(name){
                product.name = name
            }
            if(price){
                product.price = price
            }

            return await this.save(product);
    }


    /* 
        DELETE PRODUCT
    */
    async deleteProduct(product: ProductEntity): Promise<ProductEntity>{
            product.deleted_at = new Date();
            return await this.save(product);
    }
}