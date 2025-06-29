/* eslint-disable tailwindcss/no-custom-classname */
import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import BarberCarousel, { Barber } from '../components/BarberCarousel';
import MonthCalendar from '../components/MonthCalendar';
import TimeSlotPicker from '../components/TimeSlotPicker';
import SummaryCard from '../components/SummaryCard';
import { services } from '../data/services';

dayjs.locale('es');

// ------------ datos demo (barberos) ------------
const barbers: Barber[] = [
  { id: 'any', name: 'Cualquiera', avatar: 'https://i.pravatar.cc/80?u=any' },
  { id: 'gael', name: 'Gael Antonio', avatar: 'https://i.pravatar.cc/80?u=gael' },
  { id: 'jair', name: 'Jair Rincon', avatar: 'https://i.pravatar.cc/80?u=jair' },
  { id: 'erick', name: 'Erick', avatar: 'https://i.pravatar.cc/80?u=erick' },
  { id: 'cesar', name: 'Cesar', avatar: 'https://i.pravatar.cc/80?u=cesar' },
];

export default function MobileBookingPage() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId)!;
  const navigate = useNavigate();

  // ------------ estado ------------
  const [barberId, setBarberId] = useState('any');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  // ------------ genera slots demo ------------
  const slots = useMemo(() => {
    const base = dayjs(date).hour(9).minute(0);
    return Array.from({ length: 20 }, (_, i) =>
      base.add(i * 30, 'minute').format('h:mm a'),
    );
  }, [date]);

  const handleContinue = async () => {
    if (!time) {
      alert('Selecciona un horario');
      return;
    }
    if (!email || !email.includes('@')) {
      alert('Ingresa un correo válido');
      return;
    }

    try {
      const payload = {
        email,
        service,
        barber: barbers.find((b) => b.id === barberId)!.name,
        date: dayjs(date).format('DD MMMM YYYY'),
        time,
      };

      const res = await fetch('http://localhost:3001/api/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('¡Reserva confirmada! Revisa tu correo 📧');
        navigate('/');
      } else {
        alert('Error al enviar correo');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-3 border-b bg-white">
        <button onClick={() => navigate(-1)} className="text-2xl">&larr;</button>
        <h1 className="text-xl font-semibold">Reservar una cita</h1>
      </header>

      {/* Contenido scrollable */}
      <section className="flex-1 overflow-y-auto">
        <BarberCarousel
          barbers={barbers}
          selectedId={barberId}
          onSelect={setBarberId}
        />

        <MonthCalendar date={date} onChange={setDate} />

        <TimeSlotPicker times={slots} selected={time} onSelect={setTime} />

        {/* Campo de correo */}
        <label className="block px-4 mt-4 text-sm font-medium text-gray-700">
          Correo electrónico
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder="cliente@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </section>

      {/* Resumen */}
      <SummaryCard
        service={service}
        onContinue={handleContinue}
        disabled={!time || !email.includes('@')}
      />
    </div>
  );
}
