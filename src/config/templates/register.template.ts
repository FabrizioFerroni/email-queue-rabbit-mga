export const registerTemplate = (
  email: string,
  url: string,
  nombre?: string,
): string => {
  return emailRegister(email, url, nombre);
};

const emailRegister = (
  email: string,
  url: string,
  nombre: string | undefined,
): string => {
  const action = 'Registrarse';

  const bodyEmailMGA = `<!doctype html><html><head><meta http-equiv="3D" content-type="Content-Type" content="3D" text="text" html;="html;" charset="3DUTF-8"></head><body style="background-color:#e9ecef"><div class="preheader" style="display:none;max-width:0;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#fff;opacity:0">Un preencabezado es un texto de resumen breve que sigue a la línea de asunto cuando se ve un correo electrónico en la bandeja de entrada.</div><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" bgcolor="#e9ecef"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td align="center" valign="top"><a href="${url}" target="_blank" style="display:inline-block;padding:10px 0"><img src="https://blocks.primeng.org/assets/images/blocks/logos/hyper.svg" alt="Logo Mis Gastos Online" style="width:90px;height:90px"></a></td></tr></table></td></tr><tr><td align="center" bgcolor="#e9ecef"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td align="left" bgcolor="#ffffff" style="padding:36px 24px 0;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;border-top:3px solid #d4dadf"><span style="margin:0;font-size:32px;letter-spacing:-1px;line-height:48px">Hola <span style="font-weight:700">${nombre}</span></span></td></tr></table></td></tr><tr><td align="center" bgcolor="#e9ecef"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td align="left" bgcolor="#ffffff" style="padding:24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px"><p style="margin:0">Presiona el botón de abajo para confirmar tu dirección de correo electrónico. Si no creaste una cuenta con la siguiente dirección <span style="color:#00f;font-size:bold">${email}</span>, Puedes eliminar este correo de forma segura.</p></td></tr><tr><td align="left" bgcolor="#ffffff"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" bgcolor="#ffffff" style="padding:12px"><table border="0" cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#3B852F" style="border-radius:6px"><a href="${url}" target="_blank" style="display:inline-block;padding:16px 36px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;color:#fff;text-decoration:none;border-radius:6px">Confirma tu correo</a></td></tr></table></td></tr></table></td></tr><tr><td align="left" bgcolor="#ffffff" style="padding:24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px"><p style="margin:0">Si eso no funciona, copia y pega el siguiente enlace en tu navegador:</p><p style="margin:0;width:550px"><a href="${url}" style="word-wrap:break-word" target="_blank">${url}</a></p></td></tr><tr><td align="left" bgcolor="#ffffff" style="padding:24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;border-bottom:3px solid #d4dadf"><p style="margin:0">Gracias,<br>Mis Gastos App</p></td></tr></table></td></tr><tr><td align="center" bgcolor="#e9ecef" style="padding:24px"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px"><tr><td align="center" bgcolor="#e9ecef" style="padding:12px 24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#666"><p style="margin:0">Recibiste este correo electrónico porque recibimos una solicitud para ${action} tu cuenta. Si no solicitaste ${action}, puedes eliminar este correo electrónico de forma segura.</p></td></tr><tr><td align="center" bgcolor="#e9ecef" style="padding:12px 24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#666"><p style="margin:0">Recibir este correo electrónico es parte del proceso de confirmación y verificación de tu cuenta en Mis Gastos App. No te preocupes, esto no significa que estás suscrito automáticamente a futuros correos electrónicos de nuestra parte. Simplemente estamos asegurando la autenticidad de tu cuenta. ¡Gracias por unirte a <span style="color:#00f;font-size:bold">Mis Gastos App!</span></p></td></tr></table></td></tr></table></body></html>`;

  return bodyEmailMGA;
};
