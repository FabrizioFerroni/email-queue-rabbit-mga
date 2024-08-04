import { templateToString } from '@/mails/config.mail';

export const templateToSend = (bodyT: Record<string, unknown>): string => {
  const { queue, app, urlApp, imgApp, name, link, mailApp } = bodyT;
  let template: string;
  switch (queue) {
    case 'register': {
      const body = {
        app,
        urlApp,
        imgApp,
        mailApp,
        name,
        link,
      };
      template = templateToString('register', body);
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

  return template;
};
