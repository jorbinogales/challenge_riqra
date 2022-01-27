import { hasRoles } from '@app/auth/decorator/role.decorator';
import { GetUser } from '@app/auth/decorator/user.decorator';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@app/auth/guard/role.guard';
import { Body, Controller, Get, Post, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/interface/role.interface';
import { UserEntity } from '../user/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FiltrosDto } from './dto/filtros.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  
  constructor(private readonly productService: ProductService) {}

    /*
    GET PRODCT BY PROVIDER
  */
    @Post('')
    @UseGuards(JwtAuthGuard)
    @ApiBasicAuth("XYZ")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get All Product by Supplier [ALL]" })
    async getProductByProvider(
        @GetUser() user: UserEntity,
        @Body() filtros: FiltrosDto,
    ): Promise<ProductEntity[]>{
        return await this.productService.getProductByProvider(user, filtros);
    }

  /*
    CREATED PRODUCT
  */
   @Post('create')
   @UseGuards(RolesGuard)
   @UseGuards(JwtAuthGuard)
   @hasRoles(Roles.ADMIN)
   @ApiBasicAuth("XYZ")
   @ApiBearerAuth()
   @ApiOperation({ summary: "Create Product [ONLY ADMIN]" })
   async create(
       @Body() createProductDto: CreateProductDto,
   ): Promise<ProductEntity>{
       return await this.productService.createProduct(createProductDto);
   }


   /*
    DELETE PRODUCT
  */
    @Delete(':id')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.ADMIN)
    @ApiBasicAuth("XYZ")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete Product [ONLY ADMIN]" })
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
    @ApiBasicAuth("XYZ")
    @ApiBearerAuth()
    @ApiOperation({ summary: "uPDATE Product [ONLY ADMIN]" })
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<ProductEntity>{
        return await this.productService.updateProduct(+id, updateProductDto);
    }



}
