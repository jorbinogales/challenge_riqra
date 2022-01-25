import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from '../interface/role.interface';

export class CreateRoleDto{

    @IsEnum(Roles)
    @IsNotEmpty({ message: 'El ROl es requerido' })
    role: Roles;

}