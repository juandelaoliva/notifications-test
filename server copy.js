const webpush = require('web-push');
const subscription = require('./subscription.json'); // pega aquí tu JSON de suscripción
webpush.setVapidDetails(
  'mailto:tu@correo.com',
  'BF-h_eMRsU5qhl6Ands6ib9HCcniG7p5mJJ7bewJUtKx3k_qaxrUBtrqVZV9x4zRtUA3s8SWIsUAC6_zSJlPvKw',
  'A2A3tIieKsGh0N23KClM_FIi-4Y8Yp2j9x-itxtiBlc'
);
webpush.sendNotification(subscription, JSON.stringify({
  title: 'Test',
  body: 'Funciona desde Codespace'
}))
.then(()=>console.log('Enviada'))
.catch(console.error);
