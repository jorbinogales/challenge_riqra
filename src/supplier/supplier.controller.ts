import { hasRoles } from '@app/auth/decorator/role.decorator';
import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { RolesGuard } from '@app/auth/guard/role.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/interface/role.interface';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierService } from './supplier.service';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  
  /*
    CREATED SUPPLIER
  */
    @Post('')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.ADMIN)
    @ApiBasicAuth("XYZ")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Post Supplier [ONLY ADMIN]" })
    async create(
        @Body() createSupplierDto: CreateSupplierDto,
    ): Promise<SupplierEntity>{
        return await this.supplierService.createSupplier(createSupplierDto);
    }
 
 
   /*
     GET ALL SUPPLIERS
   */
    @Get('')
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @hasRoles(Roles.ADMIN)
    @ApiBasicAuth("XYZ")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get All Suppliers [ONLY ADMIN]" })
    async getAll(): Promise<SupplierEntity[]>{
        return await this.supplierService.getAll();
    }


    /*
     GET SUPPLIER BY ID
   */
     @Get(':id')
     @UseGuards(RolesGuard)
     @UseGuards(JwtAuthGuard)
     @hasRoles(Roles.ADMIN)
     @ApiBasicAuth("XYZ")
     @ApiBearerAuth()
     @ApiOperation({ summary: "Get ony supplier [ONLY ADMIN]" })
     async getById(
       @Param('id') id: string,
     ): Promise<SupplierEntity>{
         return await this.supplierService.getById(+id);
     }
 
 
    /*
     DELETE SUPPLIER
   */
     @Delete(':id')
     @UseGuards(RolesGuard)
     @UseGuards(JwtAuthGuard)
     @hasRoles(Roles.ADMIN)
     @ApiBasicAuth("XYZ")
     @ApiBearerAuth()
     @ApiOperation({ summary: "Delete Supplier [ONLY ADMIN]" })
     async deleteProduct(
         @Param('id') id: string
     ): Promise<SupplierEntity>{
         return await this.supplierService.delete(+id);
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
     @ApiOperation({ summary: "Update Supplier [ONLY ADMIN]" })
     async updateProduct(
         @Param('id') id: string,
         @Body() updateSupplierDto: UpdateSupplierDto,
     ): Promise<SupplierEntity>{
         return await this.supplierService.update(+id,updateSupplierDto);
     }
 
 
}
