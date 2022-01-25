import { Injectable, Logger } from "@nestjs/common";
import { ProductData } from "src/database/seeder/product.seeder";
import { RoleData } from "src/database/seeder/role.seeder";
import { CreateRoleDto } from "../dto/create-role.dto";
import { RoleService } from "../role.service";
@Injectable()
export class RoleSeederService {
  constructor(private readonly roleService: RoleService) {}


  async seed() {
    await this.roles()
      .then(completed => {
        Logger.log('successfully seeder');
        Promise.resolve(completed);
      })
      .catch(error => {
        Logger.log('Faile Seeding');
        Promise.reject(error);
      });
  }


  async roles() {
    const roles = RoleData;
    for(const role of roles){
        const createRoleDto: CreateRoleDto = {
            role: role.role
        };
        await this.roleService.createRole(createRoleDto)
    }
    return Promise.resolve(true);
  }
}