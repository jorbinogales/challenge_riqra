import { JwtAuthGuard } from '@app/auth/guard/jwtAuth.guard';
import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { GetUser } from '@app/auth/decorator/user.decorator';
import { Roles } from 'src/role/interface/role.interface';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService
    ) {}

    /*
    LOGIN USER CONTROLLER 
    */
    @Post('login')
    @UsePipes(ValidationPipe)
    @ApiOperation({ summary: "Authentification User [ALL]" })
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
    @ApiBasicAuth("XYZ")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get Profile Data [ALL]" })
    async profile(
       @GetUser() user: any
    ): Promise<any>{
        return user;
    }
}
