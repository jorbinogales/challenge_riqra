
import { AuthService } from '@app/auth';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, switchMap, pipe } from 'rxjs';
import { RoleEntity } from 'src/role/entity/role.entity';
import { Roles } from 'src/role/interface/role.interface';
import { RoleService } from 'src/role/role.service';
import { SupplierEntity } from 'src/supplier/entities/supplier.entity';
import { SupplierService } from 'src/supplier/supplier.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _authService: AuthService,
    private readonly _supplierService: SupplierService,
    private readonly _roleService: RoleService,
  ){}

  
    /*
    LOGIN FOR USER ENTITY
    */
    async login(loginUserDto: LoginUserDto, role: Roles): Promise<any>{
      const { email, password } = loginUserDto;
      const user = await this.fidByEmail(email);
      /* CREATE USER */
      if(!user){
          const supplier = await this._supplierService.getRandom();
          const role_entity = await this._roleService.findByRol(role);
          const user = await this.createUser(loginUserDto, supplier, role_entity);
          const token = await this._authService.createToken(user);
          return {
              statusCode: HttpStatus.ACCEPTED,
              access_token: token,
          }
      }

      /* VALIDATE USER */
      const validate = await this.validateUser(user, password);
      if(validate){
        const token = await this._authService.createToken(user);
          return {
              statusCode: HttpStatus.ACCEPTED,
              access_token: token,
          }
      }
      throw new UnauthorizedException('Oops! wrong password')
  }

  /*
  FIND USER CREDENTIALS FOR LOGIN  
  */
  async fidByEmail(email: string): Promise<UserEntity>{
    return await this._userRepository.findOne({
      where: {
        email: email,
      }
    })
  }

  /* 
    VALIDATE USER 
  */
 async validateUser(user: UserEntity, password): Promise<any>{
    return await this._authService.comparePassword(password, user.password);
 }

  /*
    CREATE USER SERVICE 
  */
 async createUser(loginUserDto: LoginUserDto, supplier: SupplierEntity, role: RoleEntity): Promise<UserEntity>{
    return await this._userRepository.createUser(loginUserDto, supplier, role);
 }

 /* 
 GET USER BY ID
 */
 async get(user_id: number): Promise<UserEntity>{
    return await this._userRepository.findOne({
      where: {
        id: user_id,
      }
    })
  }
}
