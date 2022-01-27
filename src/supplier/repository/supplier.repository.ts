import { EntityRepository, Repository } from "typeorm";
import { CreateSupplierDto } from "../dto/create-supplier.dto";
import { UpdateSupplierDto } from "../dto/update-supplier.dto";
import { SupplierEntity } from "../entities/supplier.entity";


@EntityRepository(SupplierEntity)
export class SupplierRepository extends Repository<SupplierEntity>{

    /* 
    CREATE SUPPLIER 
    */
    async createSupplier(createSupplierDto: CreateSupplierDto): Promise<SupplierEntity>{
        const { name } = createSupplierDto;
        const supplier = this.create({
            name
        })
        return await this.save(supplier);
    }


    /* 
    DELETE SUPPLIER 
    */
   async deleteSupplier(supplier: SupplierEntity): Promise<SupplierEntity>{
       supplier.deleted_at = new Date();
       return await this.save(supplier);
   }

   
 /* 
  UPDATE SUPPLIRE 
*/
  async updateSupplier(
    supplier: SupplierEntity, 
    updateSupplierDto: UpdateSupplierDto,
    ): Promise<SupplierEntity>{
    const { name } = updateSupplierDto;
    supplier.name = name;
    return await this.save(supplier);
  }
}