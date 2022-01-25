import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly _jwtService: JwtService,
    ) {}


    /*
        HASH PASSWORD UTILS  
    */
    async hashPassword(password: string): Promise<string>{
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    /* 
        COMPARE PASSWORD 
    */
    async comparePassword(newPassword: string, password_hash: string): Promise <any>{
        return await bcrypt.compare(newPassword, password_hash);
    }

    /* 
        CREATE TOKEN SERVICE
    */
    async createToken(user: UserEntity): Promise<any>{
        const payload = {
            user
        };
        return this._jwtService.sign(payload);
    }


}
