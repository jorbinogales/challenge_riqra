import { Injectable, Logger } from "@nestjs/common";
import { SupplierData } from "src/database/seeder/supplier.seeder";
import { CreateSupplierDto } from "../dto/create-supplier.dto";
import { SupplierService } from "../supplier.service";
@Injectable()
export class SupplierSeederService {
  constructor(private readonly supplierService: SupplierService) {}


  async seed() {
    await this.suppliers()
      .then(completed => {
        Logger.log('successfully seeder');
        Promise.resolve(completed);
      })
      .catch(error => {
        Logger.log('Faile Seeding');
        Promise.reject(error);
      });
  }


  async suppliers() {
    const suppliers = SupplierData;
    for(const supplier of suppliers){
        const createSupplierDto: CreateSupplierDto = {
            name: supplier.name
        };
        await this.supplierService.createSupplier(createSupplierDto)
    }
    return Promise.resolve(true);
  }


}