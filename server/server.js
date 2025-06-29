import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev')); // → log de todas las peticiones

// Transporter Gmail (contraseña de aplicación)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'miguel.cam.bussines@gmail.com',
    pass: 'vogshexfkmkajiij',
  },
});

// Prueba de conexión al iniciar
transporter.verify((err, success) => {
  if (err) {
    console.error('❌  Error verificando transporter:', err);
  } else {
    console.log('✅  Transporter listo para enviar correos');
  }
});

app.post('/api/reservar', async (req, res) => {
  const { email, service, barber, date, time } = req.body;

  console.log('➡️  POST /api/reservar');
  console.table({ email, service: service?.name, barber, date, time });

  try {
    const info = await transporter.sendMail({
      from: '"Barbería" <miguel.cam.bussines@gmail.com>',
      to: email,
      subject: 'Confirmación de cita',
      html: `
        <h2>¡Tu cita está confirmada!</h2>
        <p><b>Servicio:</b> ${service.name}</p>
        <p><b>Barbero:</b> ${barber}</p>
        <p><b>Fecha:</b> ${date}</p>
        <p><b>Hora:</b> ${time}</p>
      `,
    });

    console.log('📧  Correo enviado → %s', info.messageId);
    res.json({ ok: true });
  } catch (err) {
    console.error('⚠️  Error al enviar correo:', err);
    res.status(500).json({ ok: false, error: 'No se pudo enviar el correo' });
  }
});

app.listen(3001, () => console.log('🛡  API lista en http://localhost:3001'));
