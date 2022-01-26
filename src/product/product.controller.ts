import { hasRoles } from '@app/auth/decorator/role.decorator';
import { GetUser } from '@app/auth/decorator/user.decorator';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@app/auth/guard/role.guard';
import { Body, Controller, Get, Post, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { Roles } from '../role/interface/role.interface';
import { UserEntity } from '../user/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FiltrosDto } from './dto/filtros.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
   @UseGuards(JwtAuthGuard)
   async getProductByProvider(
       @GetUser() user: UserEntity,
       @Body() filtros: FiltrosDto,
   ): Promise<ProductEntity[]>{
       return await this.productService.getProductByProvider(user, filtros);
   }


   /*
    DELETE PRODUCT
  */
    @Delete(':id')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.ADMIN)
    async deleteProduct(
        @Param('id') id: string
    ): Promise<ProductEntity>{
        return await this.productService.deleteProduct(+id);
    }



  /*
    UPDATE PRODUCT
  */
    @Patch(':id')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.ADMIN)
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<ProductEntity>{
        return await this.productService.updateProduct(+id, updateProductDto);
    }



}
