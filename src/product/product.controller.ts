import { hasRoles } from '@app/auth/decorator/role.decorator';
import { GetUser } from '@app/auth/decorator/user.decorator';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@app/auth/guard/role.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/role/interface/role.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FiltrosDto } from './dto/filtros.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  /*
    CREATED PRODUCT
  */
   @Post('')
   @UseGuards(RolesGuard)
   @UseGuards(JwtAuthGuard)
   @hasRoles(Roles.ADMIN)
   async lawyerProfile(
       @Body() createProductDto: CreateProductDto,
   ): Promise<ProductEntity>{
       return await this.productService.createProduct(createProductDto);
   }


  /*
    GET PRODCT BY PROVIDER
  */
   @Get('')
   @UseGuards(RolesGuard)
   @UseGuards(JwtAuthGuard)
   async getProductByProvider(
       @GetUser() user: UserEntity,
       @Body() filtros: FiltrosDto,
   ): Promise<ProductEntity[]>{
       return await this.productService.getProductByProvider(user, filtros);
   }


}
