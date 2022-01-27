import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto{

    @IsEmail()
    @IsNotEmpty({ message: 'El correo es requerido' })
    @ApiProperty({ type: "string", description: "email", default: "admin@riqra.com"})
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @ApiProperty({ type: "string", description: "password", default: "password"})
    password: string;

}