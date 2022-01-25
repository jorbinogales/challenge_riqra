import { RoleEntity } from "src/role/entity/role.entity";
import { Roles } from "src/role/interface/role.interface";
import { SupplierEntity } from "src/supplier/entities/supplier.entity";
import { EntityRepository, Repository } from "typeorm";
import { LoginUserDto } from "../dto/login-user.dto";
import { UserEntity } from "../entities/user.entity";


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    /* 
        CREATE USER REPOSITORY 
    */
   async createUser(loginUserDto: LoginUserDto, supplier: SupplierEntity, role: RoleEntity): Promise<UserEntity>{
       const { email, password } = loginUserDto;
       const user = this.create({
           email,
           password,
           supplier_id: supplier,
           role_id: role,
       })
       return await this.save(user);
   }
}