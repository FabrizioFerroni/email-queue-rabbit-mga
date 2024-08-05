import { Mailer } from 'nestjs-mailer';

export type MessageQueue = {
  email: string;
  subject: string;
  exchange: string;
  urlApp: string;
  mailApp: string;
  imgApp: string;
  url?: string;
  nombre?: string;
  body?: Record<string, string>;
};

export type MessageRabbit = {
  queue: string;
  payload: {
    message: MessageQueue;
    data: unknown;
    statusCode: number;
    ok: boolean;
  };
  mailer: Mailer;
};
