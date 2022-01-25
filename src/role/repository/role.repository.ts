
import { UserEntity } from "src/user/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateRoleDto } from "../dto/create-role.dto";
import { RoleEntity } from "../entity/role.entity";
import { Roles } from "../interface/role.interface";

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity>{
    /* STORE */
    async store(createRoleDto: CreateRoleDto): Promise<any>{
        const { role } = createRoleDto
        const roles = this.create({
            role: role
        })
        const resp = await this.save(roles);
        return resp;
    }
}