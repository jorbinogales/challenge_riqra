import { Injectable, Logger } from "@nestjs/common";
import { ProductData } from "src/database/seeder/product.seeder";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductService } from "../product.service";
@Injectable()
export class ProductSeederService {
  constructor(private readonly productService: ProductService) {}


  async seed() {
    await this.products()
      .then(completed => {
        Logger.log('successfully seeder');
        Promise.resolve(completed);
      })
      .catch(error => {
        Logger.log('Faile Seeding');
        Promise.reject(error);
      });
  }


  async products() {
    const products = ProductData;
    for(const product of products){
        const createProductDto: CreateProductDto = {
            name: product.name,
            price: product.price,
            supplier_id: product.supplier_id
        };
        await this.productService.createProduct(createProductDto)
    }
    return Promise.resolve(true);
  }
}