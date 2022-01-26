import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailConfiguration } from 'src/utils/mail/mail.configuration';
import {MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(MailConfiguration),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
