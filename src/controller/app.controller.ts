import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Health } from '@/types/health.type';
import { MessageQueue } from '@/types/message.type';
import { BadRequestResponse } from '@/types/badrequest.type';
import { MailQeueService } from '@/service/mail-qeue.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailQeueService: MailQeueService,
  ) {}

  @Get()
  getStatus(): Health {
    return this.appService.getAvailability();
  }

  @Post(':exchange/:queue')
  @HttpCode(HttpStatus.OK)
  sendEmailQueue(
    @Body() body: MessageQueue,
    @Param('exchange') exchange: string,
    @Param('queue') queue: string,
  ): { ok: boolean } | BadRequestResponse {
    const { email, subject, url, nombre, lastname, urlApp, mailApp, imgApp } =
      body;
    if (!email || !subject) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'El correo electrónico y el asunto son obligatorios.',
        ok: false,
      };
    }
    try {
      const test = this.mailQeueService.sendEmailQueue({
        message: {
          email: email.toLocaleLowerCase(),
          subject,
          exchange,
          url,
          nombre,
          lastname,
          urlApp,
          mailApp,
          imgApp,
        },
        queue: queue,
        action: queue,
        key: exchange,
      });
      test.then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
      return this.appService.checkEmail(false);
    } finally {
      return this.appService.checkEmail(true);
    }
  }
}
