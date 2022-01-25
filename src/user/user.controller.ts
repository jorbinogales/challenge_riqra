import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { GetUser } from '@app/auth/decorator/user.decorator';
import { Roles } from 'src/role/interface/role.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService
    ) {}

    /*
    LOGIN USER CONTROLLER 
    */
    @Post('login')
    async login(
        @Body() loginUserDto: LoginUserDto
    ): Promise<any>{
        return await this._userService.login(loginUserDto, Roles.USER)
    }

    /*
    GET PROFILE DATA USER 
    */
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async profile(
       @GetUser() user: any
    ): Promise<any>{
        return user;
    }
}
