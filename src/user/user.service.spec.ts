import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';
import { Roles } from './../role/interface/role.interface';
import { RoleEntity } from './../role/entity/role.entity';
import { SupplierEntity } from './../supplier/entities/supplier.entity';
import { UserEntity } from './../user/entities/user.entity';
import { SupplierService } from './../supplier/supplier.service';
import { SupplierRepository } from './../supplier/repository/supplier.repository';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { MailService } from 'src/mail/mail.service';
import { RoleService } from 'src/role/role.service';
import { RoleRepository } from 'src/role/repository/role.repository';
import { AuthModule, AuthService } from '@app/auth';
import { MailerModule, MailerService, MAILER_OPTIONS } from '@nestjs-modules/mailer';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailConfiguration } from 'src/utils/mail/mail.configuration';
import { options } from 'joi';
import { JwtOptions } from '@app/auth/jwt/jwtOptions';



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

describe.only('UserService', () => {
  let userService: UserService;
  let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    sandbox = sinon.createSandbox();

    const ApiServiceProvider = {
      provide: UserService,
      useClass: UserService,
    };
    const ApiSupplierService = {
      provide: SupplierService,
      useClass: SupplierService,
    };
    const ApiMailService = {
        provide: MailService,
        useClass: MailService,
    };
    const ApiRoleService = {
        provide: RoleService,
        useClass: RoleService,
    };
    const ApiAuthService = {
        provide: AuthService,
        useClass: AuthService,
    };


    const module = await Test.createTestingModule({
     imports:[ 
      JwtModule.registerAsync(JwtOptions),
        MailerModule.forRootAsync(MailConfiguration),
     ],
      providers: [
        ApiServiceProvider,
        ApiSupplierService,
        ApiMailService,
        ApiRoleService,
        ApiAuthService,
        {
            name: MAILER_OPTIONS,
            provide: MAILER_OPTIONS,
            useValue: options
        },
        
        {
          provide: getRepositoryToken(UserRepository),
          useValue: sandbox.createStubInstance(UserRepository),
        },
        {
          provide: getRepositoryToken(SupplierRepository),
          useValue: sandbox.createStubInstance(SupplierRepository),
        },
        {
            provide: getRepositoryToken(RoleRepository),
            useValue: sandbox.createStubInstance(RoleRepository),
          },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('Login User', async () => {
    const createProductSpy = jest.spyOn(userService, 'login');
    const dto = new LoginUserDto();
    userService.login(dto, Roles.USER);
    expect(createProductSpy).toHaveBeenCalledWith(dto, Roles.USER);
  });

  it('Find By ID', async () => {
    const createProductSpy = jest.spyOn(userService, 'findByEmail');
    const email = 'test@gmail.com'; 
    userService.findByEmail(email);
    expect(createProductSpy).toHaveBeenCalledWith(email);
  });

  it('Validate User', async () => {
    const createProductSpy = jest.spyOn(userService, 'validateUser');
    const passwrod  = 'test';
    userService.validateUser(mockUser,passwrod);
    expect(createProductSpy).toHaveBeenCalledWith(mockUser,passwrod);
  });

  it('Create user', async () => {
    const createProductSpy = jest.spyOn(userService, 'createUser');
    const dto = new LoginUserDto();
    userService.createUser(dto, mockSupplier, mockRole);
    expect(createProductSpy).toHaveBeenCalledWith(dto, mockSupplier, mockRole);
  });

  it('Get User', async () => {
    const createProductSpy = jest.spyOn(userService, 'get');
    const id  = 1;
    userService.get(id);
    expect(createProductSpy).toHaveBeenCalledWith(id);
  });

  afterAll(async () => {
    sandbox.restore();
  });

});
