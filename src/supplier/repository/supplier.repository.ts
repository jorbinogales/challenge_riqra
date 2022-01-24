import { EntityRepository, Repository } from "typeorm";
import { CreateSupplierDto } from "../dto/create-supplier.dto";
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
}