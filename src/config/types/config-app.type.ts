export type ConfigApp = {
  enabledEmailService: boolean;
  emailFrom: string;
  apiPort: string;
  transportFallback: string;
  mail: MailConfig;
  rabbit: RabbitConfig;
  tz: string;
  frontHost: string | string[];
  hostMethod: string | string[];
  hostAllowedHeader: string | string[];
  hostCredentials: boolean;
};

type RabbitConfig = {
  protocol: string;
  host: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
  colas: string[];
};

type MailConfig = {
  host: string;
  port: number;
  auth: Auth;
};

type Auth = {
  user: string;
  pass: string;
};
