import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import nodemailer from 'nodemailer';
import { createEvent } from 'ics';
import { writeFileSync, unlinkSync } from 'fs';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

// Transporter Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'miguel.cam.bussines@gmail.com',
    pass: 'vogshexfkmkajiij',
  },
});

// Verificar conexión
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ Error verificando transporter:', err);
  } else {
    console.log('✅ Transporter listo para enviar correos');
  }
});

// POST /api/reservar
app.post('/api/reservar', async (req, res) => {
  const { email, service, barber, date, time } = req.body;
  console.log('➡️  POST /api/reservar');
  console.table({ email, service: service?.name, barber, date, time });

  try {
    // Parsear fecha y hora
    const [day, monthText, year] = date.split(' ');
    const [hourRaw, minuteRaw] = time.replace(' pm', '').replace(' am', '').split(':');
    let hour = parseInt(hourRaw);
    const minute = parseInt(minuteRaw);
    const monthMap = {
      enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
      julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12
    };
    const month = monthMap[monthText.toLowerCase()] || 1;
    if (time.includes('pm') && hour < 12) hour += 12;

    // Crear evento ICS
    const event = {
      start: [parseInt(year), month, parseInt(day), hour, minute],
      duration: { hours: 0, minutes: 30 },
      title: `${service.name} con ${barber}`,
      description: 'Tu cita en Barbería ha sido confirmada.',
      location: 'Guanajuato 29, Centro, 37600 Dolores Hidalgo, Guanajuato',
      status: 'CONFIRMED',
      organizer: { name: 'Barbería', email: 'miguel.cam.bussines@gmail.com' }
    };

    createEvent(event, async (err, value) => {
      if (err) {
        console.error('❌ Error creando archivo ICS:', err);
        return res.status(500).json({ ok: false, error: 'Error al generar el evento ICS' });
      }

      const filePath = './cita.ics';
      writeFileSync(filePath, value);

      // Enviar correo
      const info = await transporter.sendMail({
        from: '"Barbería" <miguel.cam.bussines@gmail.com>',
        to: email,
        subject: 'Confirmación de cita',
        html: `
          <div style="max-width:600px;margin:30px auto;padding:25px;border-radius:12px;font-family:Arial,sans-serif;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.1);color:#333;">
            <h1 style="color:#2c3e50;">¡Tu cita está confirmada!</h1>
            <div style="margin:20px 0;font-size:16px;">
              <p><b>🛠 Servicio:</b> ${service.name}</p>
              <p><b>💈 Barbero:</b> ${barber}</p>
              <p><b>📅 Fecha:</b> ${date}</p>
              <p><b>🕛 Hora:</b> ${time}</p>
              <p><b>📍 Dirección:</b> Guanajuato 29, Centro, 37600 Dolores Hidalgo, Guanajuato</p>
            </div>
            <p>📎 Puedes agregar esta cita a tu calendario usando el archivo adjunto (.ics)</p>
            <div style="margin-top:30px;font-size:12px;color:#777;">
              Este correo fue enviado por <b>Barbería</b> | Gracias por elegirnos
            </div>
          </div>
        `,
        attachments: [
          {
            filename: 'cita.ics',
            content: value,
            contentType: 'text/calendar'
          }
        ]
      });

      console.log('📧 Correo enviado → %s', info.messageId);
      unlinkSync(filePath); // Limpieza del archivo temporal
      res.json({ ok: true });
    });

  } catch (err) {
    console.error('⚠️ Error al enviar correo:', err);
    res.status(500).json({ ok: false, error: 'No se pudo enviar el correo' });
  }
});

app.listen(3001, () => console.log('🛡  API lista en http://localhost:3001'));
