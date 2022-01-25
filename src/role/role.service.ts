
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleEntity } from './entity/role.entity';
import { Roles } from './interface/role.interface';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {


    constructor(
        @InjectRepository(RoleRepository)
        private readonly roleRepository: RoleRepository
    ) {}

    /* 
    CREARE ROLE 
    */
   async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity>{
       return await this.roleRepository.store(createRoleDto);
   }


   /*
    FIND ROW BY NAME 
    */
   async findByRol(role: Roles): Promise<RoleEntity>{
       return await this.roleRepository.findOne({
           where: { 
               role: role
           }
       })
   }
 
}
