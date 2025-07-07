const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const subs = []; // en memoria (para pruebas)
webpush.setVapidDetails(
  'mailto:tu@correo.com',
  'BF-h_eMRsU5qhl6Ands6ib9HCcniG7p5mJJ7bewJUtKx3k_qaxrUBtrqVZV9x4zRtUA3s8SWIsUAC6_zSJlPvKw',
  'A2A3tIieKsGh0N23KClM_FIi-4Y8Yp2j9x-itxtiBlc'
);

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subs.push(subscription);
  res.status(201).json({});
});

app.post('/notify', async (req, res) => {
  const { title, message } = req.body;
  const payload = JSON.stringify({ title, body: message });
  try {
    await Promise.all(subs.map(sub => webpush.sendNotification(sub, payload)));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
