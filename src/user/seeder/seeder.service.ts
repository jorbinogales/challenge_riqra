import { Injectable, Logger } from "@nestjs/common";
import { ProductData } from "src/database/seeder/product.seeder";
import { AdminData } from "src/database/seeder/user.seeder";
import { Roles } from "src/role/interface/role.interface";
import { LoginUserDto } from "../dto/login-user.dto";
import { UserService } from "../user.service";
@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}


  async seed() {
    await this.admin()
      .then(completed => {
        Logger.log('successfully seeder');
        Promise.resolve(completed);
      })
      .catch(error => {
        Logger.log('Faile Seeding');
        Promise.reject(error);
      });
  }


  async admin() {
    const admins = AdminData;
    for(const admin of admins){
        const loginUserDto: LoginUserDto = {
            email: admin.email,
            password: admin.password,
        };
        await this.userService.login(loginUserDto, Roles.ADMIN)
    }
    return Promise.resolve(true);
  }
}