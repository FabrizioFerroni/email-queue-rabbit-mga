import { ConfigApp } from '@/config/types/config-app.type';

export const configApp = (): ConfigApp => {
  const enabledEmail = () =>
    process.env.MAIL_ENABLED === 'true' ? true : false;
  return {
    enabledEmailService: enabledEmail(),
    emailFrom: process.env.EMAIL_FROM || '"SGD Sports" <info@api-sgd.cloud>',
    apiPort: process.env.API_PORT || '3000',
    tz: process.env.TZ || 'Europe/Madrid',
    frontHost: process.env.FRONT_HOST,
    hostMethod: process.env.HOST_METHODS,
    hostAllowedHeader: process.env.HOST_ALLOWED_HEADERS,
    hostCredentials: Boolean(process.env.HOST_CREDENTIALS),
    transportFallback: process.env.TRANSPORT_FALLBACK || 'smtp://',
    mail: {
      host: process.env.MAIL_HOST || 'localhost',
      port: +(process.env.MAIL_PORT || '1025'),
      auth: {
        user: process.env.MAIL_USER || 'user',
        pass: process.env.MAIL_PASS || 'pass',
      },
    },
    rabbit: {
      protocol: process.env.RABBITMQ_PROTOCOL || 'amqp',
      host: process.env.RABBITMQ_HOST || 'localhost',
      port: +(process.env.RABBITMQ_PORT || '5672'),
      username: process.env.RABBITMQ_USER || 'guest',
      password: process.env.RABBITMQ_PASS || 'guest',
      vhost: process.env.RABBITMQ_VHOST || '/',
    },
  };
};
