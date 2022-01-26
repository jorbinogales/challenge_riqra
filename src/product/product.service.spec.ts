import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';
import { Roles } from './../role/interface/role.interface';
import { RoleEntity } from './../role/entity/role.entity';
import { SupplierEntity } from './../supplier/entities/supplier.entity';
import { UserEntity } from './../user/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ProductRepository } from './repository/product.repository';
import { FiltrosDto } from './dto/filtros.dto';
import { SupplierService } from './../supplier/supplier.service';
import { SupplierRepository } from './../supplier/repository/supplier.repository';



const mockSupplier: SupplierEntity = {
    id: 1,
    name: 'test',
    products: [],
    users: [],
}

const mockRole: RoleEntity = {
  id: 1,
  role: Roles.USER,
}

const mockUser: UserEntity = {
  id: 1,
  email: "test@gmail.com",
  password: "test",
  supplier_id: mockSupplier,
  role_id: mockRole,
}

describe.only('ProductService', () => {
  let productService: ProductService;
  let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    sandbox = sinon.createSandbox();

    const ApiServiceProvider = {
      provide: ProductService,
      useClass: ProductService,
    };
    const ApiSupplierService = {
      provide: SupplierService,
      useClass: SupplierService,
    };

    const module = await Test.createTestingModule({
      providers: [
        ApiServiceProvider,
        ApiSupplierService,
        {
          provide: getRepositoryToken(ProductRepository),
          useValue: sandbox.createStubInstance(ProductRepository),
        },
        {
          provide: getRepositoryToken(SupplierRepository),
          useValue: sandbox.createStubInstance(SupplierRepository),
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('Create a game', async () => {
    const createProductSpy = jest.spyOn(productService, 'createProduct');
    const dto = new CreateProductDto();
    productService.createProduct(dto);
    expect(createProductSpy).toHaveBeenCalledWith(dto);
  });

  it('Get product by Provider', async () => {
    const createProductSpy = jest.spyOn(productService, 'getProductByProvider');
    const dto = new FiltrosDto();
    productService.getProductByProvider(mockUser, dto);
    expect(createProductSpy).toHaveBeenCalledWith(mockUser, dto);
  });

  it('Delete Product', async () => {
    const createProductSpy = jest.spyOn(productService, 'deleteProduct');
    const id  = 1;
    productService.deleteProduct(id);
    expect(createProductSpy).toHaveBeenCalledWith(id);
  });

  it('Update Product', async () => {
    const createProductSpy = jest.spyOn(productService, 'updateProduct');
    const id  = 1;
    const dto = new CreateProductDto();
    productService.updateProduct(id, dto);
    expect(createProductSpy).toHaveBeenCalledWith(id, dto);
  });

  it('Get Product', async () => {
    const createProductSpy = jest.spyOn(productService, 'getProduct');
    const id  = 1;
    productService.getProduct(id);
    expect(createProductSpy).toHaveBeenCalledWith(id);
  });




  afterAll(async () => {
    sandbox.restore();
  });

});
