import { forwardRef, Inject } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEntity } from 'src/role/entity/role.entity';
import { Roles } from 'src/role/interface/role.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    const roles = this.reflector.get<Roles[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user.user;
    return this.userService.get(user.id).then((user: UserEntity) => {
        let hasPermission = false;
        const role: RoleEntity = user.role_id;
        const hasRole = roles.indexOf(role.role);
        console.log(hasRole);
        if (hasRole != -1) {
            hasPermission = true;
        }
        return user && hasPermission;
    });
  }
}