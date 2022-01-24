
import { AuthService } from '@app/auth';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, switchMap, pipe } from 'rxjs';
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
  ){}

  
    /*
    LOGIN FOR USER ENTITY
    */
    async login(loginUserDto: LoginUserDto): Promise<any>{
      const { email, password } = loginUserDto;
      const user = await this.fidByEmail(email);
      /* CREATE USER */
      if(!user){
          const supplier = await this._supplierService.getRandom();
          const user = await this.createUser(loginUserDto, supplier);
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
 async createUser(loginUserDto: LoginUserDto, supplier: SupplierEntity): Promise<UserEntity>{
    return await this._userRepository.createUser(loginUserDto, supplier)
 }

}
