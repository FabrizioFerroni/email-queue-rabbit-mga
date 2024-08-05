import { templateToString } from '@/mails/config.mail';

export const templateToSend = (bodyT: Record<string, unknown>): string => {
  const { queue, app, urlApp, imgApp, name, link, mailApp, lastname, email } =
    bodyT;

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
      const body = {
        app,
        urlApp,
        imgApp,
        mailApp,
        name,
        link,
        lastname: lastname,
        email,
      };
      template = templateToString('login', body);
      break;
    }

    case 'recovery': {
      const body = { app, urlApp, imgApp, mailApp, name, link };
      template = templateToString('recovery', body);
      break;
    }

    case 'forgot_password': {
      const body = { app, urlApp, imgApp, mailApp, name, link };
      template = templateToString('forgot_password', body);
      break;
    }
  }

  return template;
};
