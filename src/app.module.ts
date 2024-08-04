import { Module } from '@nestjs/common';
import { AppController } from '@/controller/app.controller';
import { AppService } from '@/service/app.service';
import { InjectMailer, Mailer, MailerModule } from 'nestjs-mailer';
import { ConfigModule } from '@nestjs/config';
import { configApp } from '@/config/config-app';
import { MailQeueService } from './service/mail-qeue.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configApp],
      envFilePath: ['.env'],
    }),

    MailerModule.forRootAsync({
      useFactory: () => ({
        config: {
          transport: {
            host: configApp().mail.host,
            port: configApp().mail.port,
            auth: {
              user: configApp().mail.auth.user,
              pass: configApp().mail.auth.pass,
            },
          },
          defaults: {
            from: configApp().emailFrom,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MailQeueService],
})
export class AppModule {
  constructor(
    @InjectMailer()
    private readonly mailer: Mailer,
    private readonly mailQeueService: MailQeueService,
  ) {
    const colas = ['recovery', 'forgot_password', 'login', 'register'];
    colas.forEach((item: string) => {
      this.mailQeueService.receiveRabbit({ queue: item, mailer: this.mailer });
    });
  }
}
