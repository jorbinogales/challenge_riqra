import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto{

    @IsString()
    @IsNotEmpty({ message: 'El correo es requerido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    password: string;

}