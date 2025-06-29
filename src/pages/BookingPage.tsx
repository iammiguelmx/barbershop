import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { SlotInfo } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { services } from '../data/services';

// ―――― localizador seguro con date-fns ――――
const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek, // usa startOfWeek de date-fns (lunes para 'es')
  getDay,      // usa getDay de date-fns
  locales,
});


export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === serviceId);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    alert(
      `Reservado ${service?.name} el ${format(slotInfo.start, 'PPPPp', {
        locale: es,
      })}`,
    );
    navigate('/'); // volver o redirigir al checkout
  };

  if (!service) return <p>Servicio no encontrado</p>;

  // Helpers para min/max como objetos Date (no números)
  const today = new Date();
  const minHour = new Date(today.setHours(9, 0, 0, 0));
  const maxHour = new Date(today.setHours(19, 0, 0, 0));

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Reserva — {service.name}</h1>

      <Calendar
        localizer={localizer}
        defaultView="week"
        selectable
        step={30}
        timeslots={1}
        defaultDate={new Date()}
        min={minHour}
        max={maxHour}
        events={[]}          /* aquí cargarás tus reservas */
        onSelectSlot={handleSelectSlot}
        style={{ height: '70vh' }}
      />
    </main>
  );
}
