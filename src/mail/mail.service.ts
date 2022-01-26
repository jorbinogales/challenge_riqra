import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {

    constructor(private _mailerService: MailerService) {}

    /* 
        SEND WELCOME EMAIL
     */
    async sendWelcome(user: UserEntity) {
        try { 
            const mail = await this._mailerService.sendMail({
                to: user.email,
                subject: 'Bienvenido.',
                template: 'welcome',
                context: {
                    email : user.email,
                }
            });
        } catch (err){
            console.log(err);
        }

        return {
            statusCode: 204,
        }
  }
}
