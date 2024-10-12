import { Module } from '@nestjs/common';
import { AppController } from '@/controller/app.controller';
import { AppService } from '@/service/app.service';
import { InjectMailer, Mailer, MailerModule } from 'nestjs-mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
  ) {
    const colasString: string =
      this.configService.get<string>('RABBITMQ_COLAS');

    let colas: string[] = [];

    try {
      colas = JSON.parse(colasString);
    } catch (e) {
      console.error('Error parsing colas:', e);
    }

    if (Array.isArray(colas)) {
      colas.forEach((queue: string) => {
        this.mailQeueService.receiveRabbit({
          queue,
          mailer: this.mailer,
        });
      });
    } else {
      console.error('Colas is not an array:', colas);
    }
  }
}
