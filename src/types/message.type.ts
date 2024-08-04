import { Mailer } from 'nestjs-mailer';

export type MessageQueue = {
  email: string;
  subject: string;
  exchange: string;
  url?: string;
  nombre?: string;
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
