import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
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
    return await this._supplierRepository.findOne({
      where: {
        id
      }
    })
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
    const suppliers =  await this._supplierRepository.find({});
    const randomElement = suppliers[Math.floor(Math.random() * suppliers.length)];
    return randomElement
 }


}
