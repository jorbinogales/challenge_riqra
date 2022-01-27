import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierRepository } from './repository/supplier.repository';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(SupplierRepository)
    private readonly _supplierRepository: SupplierRepository,
  ){}

    /* 
    GET SUPPLIER BY ID
  */
 async getByName(name: string): Promise<SupplierEntity>{
  return await this._supplierRepository.findOne({
    where: {
      name
    }
  })
}


   /* 
    GET SUPPLIER BY ID
  */
 async getById(id: number): Promise<SupplierEntity>{
    const supplier =  await this._supplierRepository.findOne({
      where: {
        id,
        deleted_at: null,
      }
    })
    if(!supplier){
      throw new NotFoundException(`Supplier with ID ${id} Not FOund`);
    }
    return supplier;
  }

  /* 
    GET ALL SUPPLIERS
  */
 async getAll(): Promise<SupplierEntity[]>{
  return await this._supplierRepository.find()
}


  /* 
    STORE CREATE SUPPLIER 
  */
 async createSupplier(createSupplierDto: CreateSupplierDto): Promise<SupplierEntity>{
   return await this._supplierRepository.createSupplier(createSupplierDto);
 }

  /* 
    GET RANDOM SUPPLIER 
  */
 async getRandom(): Promise<SupplierEntity>{
    const suppliers =  await this._supplierRepository.find({
      where: {
        deleted_at: null,
      }
    });
    let randomElement = null;
    if(suppliers){
      randomElement = suppliers[Math.floor(Math.random() * suppliers.length)];
    }
    return randomElement
 }

 /*
 DELETE SUPPLIER
 */
 async delete(id: number): Promise<SupplierEntity>{
   const supplier = await this.getById(id);
   return await this._supplierRepository.deleteSupplier(supplier);
 }

 
  /* 
  UPDATE SUPPLIER 
 */
 async update(id:number, updateSupplierDto: UpdateSupplierDto): Promise<SupplierEntity>{
  const supplier = await this.getById(id);
  return await this._supplierRepository.updateSupplier(supplier, updateSupplierDto);
}




}
