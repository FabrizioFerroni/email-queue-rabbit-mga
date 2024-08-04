import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configApp } from './config/config-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const hostCors = configApp().frontHost;
  const hostMethods = configApp().hostMethod;
  const hostallowedHeaders = configApp().hostAllowedHeader;
  const hostCredentials = configApp().hostCredentials;
  const apiPort = configApp().apiPort;
  const tz = configApp().tz;

  app.enableCors({
    origin: hostCors,
    credentials: hostCredentials,
    methods: hostMethods,
    allowedHeaders: hostallowedHeaders,
  });

  app.use((req, res, next) => {
    req.timezone = tz;
    res.removeHeader('X-Powered-By');
    next();
  });

  app.setGlobalPrefix('email');

  await app.listen(apiPort);
}
bootstrap();
