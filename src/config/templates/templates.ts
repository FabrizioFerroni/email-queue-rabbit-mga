import { templateToString } from '@/mails/config.mail';

export const templateToSend = (bodyT: Record<string, unknown>): string => {
  const { queue, app, urlApp, imgApp, name, link, mailApp, lastname, email } =
    bodyT;

  const year = new Date().getFullYear();

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
        year,
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
        year,
      };
      template = templateToString('login', body);
      break;
    }

    case 'recovery': {
      const body = { app, urlApp, imgApp, mailApp, name, link, year };
      template = templateToString('recovery', body);
      break;
    }

    case 'forgot_password': {
      const body = { app, urlApp, imgApp, mailApp, name, link, year };
      template = templateToString('forgot_password', body);
      break;
    }
  }

  return template;
};
