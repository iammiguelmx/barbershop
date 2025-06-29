import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  date: Date;
  onChange: (d: Date) => void;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function MonthCalendar({ date, onChange }: Props) {
  return (
    <div className="mx-auto text-center">
      <h2 className="text-lg font-semibold mb-2">
        {capitalize(format(date, 'LLLL yyyy', { locale: es }))}
      </h2>

      <Calendar
        locale="es-MX"
        onChange={(val) => onChange(val as Date)}
        value={date}
        minDetail="month"
        showNavigation={false}
        tileDisabled={({ date }) => date < new Date()}
        className="mx-auto"
      />
    </div>
  );
}
