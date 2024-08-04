import { registerTemplate } from '@/config/templates/register.template';
import { MessageQueue, MessageRabbit } from '@/types/message.type';
import { SendQueue } from '@/types/send-qeue';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp from 'amqp-connection-manager';

@Injectable()
export class MailQeueService {
  connect = {};
  constructor(private readonly configService: ConfigService) {
    this.connect = {
      protocol: this.configService.get<string>('RABBITMQ_PROTOCOL'),
      host: this.configService.get<string>('RABBITMQ_HOST'),
      port: this.configService.get<number>('RABBITMQ_PORT'),
      username: this.configService.get<string>('RABBITMQ_USER'),
      password: this.configService.get<string>('RABBITMQ_PASS'),
      vhost: this.configService.get<string>('RABBITMQ_VHOST'),
    };
  }

  async sendQueue({
    message,
    queue: cola,
    key = null,
  }: SendQueue<MessageQueue>) {
    let connection;
    try {
      connection = await amqp.connect(this.connect);
      const channel = await connection.createChannel();
      const sent = channel.publish(
        cola,
        key,
        Buffer.from(JSON.stringify(message)),
      );

      sent
        ? console.log(`Sent message to "${key}" exchange`, message)
        : console.log(`Fails sending message to "${key}" exchange`, message);
    } catch (err) {
      console.error(err);
    }
  }

  async sendEmailQueue({
    message,
    queue: routing,
    key: exchange,
  }: SendQueue<MessageQueue>) {
    let connection;
    try {
      connection = await amqp.connect(this.connect);
      const channel = await connection.createChannel();
      // await channel.assertExchange(exchange, 'direct');

      const sent = channel.publish(
        exchange,
        routing,
        Buffer.from(JSON.stringify(message)),
        {
          // persistent: true,
        },
      );

      sent
        ? console.log(`Sent message to "${exchange}" exchange`, message)
        : console.log(
            `Fails sending message to "${exchange}" exchange`,
            message,
          );
    } catch (err) {
      console.error(err);
    }
  }

  async receiveRabbit({ queue, mailer }: Partial<MessageRabbit>) {
    let connection;
    try {
      console.log(`try ${queue}`);
      connection = await amqp.connect(this.connect);
      const channel = await connection.createChannel();
      await channel.consume(
        queue,
        (message) => {
          if (message) {
            console.log(
              " [x] Received '%s'",
              JSON.parse(message.content.toString()),
            );
            const { email, subject, url, nombre }: MessageQueue = JSON.parse(
              message.content,
            );

            let template;

            switch (queue) {
              case 'register': {
                template = registerTemplate(email, url, nombre);
                break;
              }

              case 'login': {
                template = '';
                break;
              }

              case 'recovery': {
                template = '';
                break;
              }

              case 'forgot_password': {
                template = '';
                break;
              }
            }

            mailer.sendMail({
              from: this.configService.get<string>('EMAIL_FROM'),
              to: email,
              subject: subject,
              html: template,
            });
          }
        },
        { noAck: true, exclusive: true },
      );

      console.log(`Waiting for messages for ${queue}`);
    } catch (err) {
      console.error(err);
    }
  }
}
