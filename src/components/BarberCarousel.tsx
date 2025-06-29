import { useState } from 'react';
import clsx from 'clsx';
import { Check, User2 } from 'lucide-react';

/* ---------- tipos ---------- */
export type Barber = {
  id: string;
  name: string;
  avatar?: string;
};

interface Props {
  barbers: Barber[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function BarberCarousel({
  barbers,
  selectedId,
  onSelect,
}: Props) {
  const [errorIds, setErrorIds] = useState<Record<string, boolean>>({});

  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-hide">
      {barbers.map((b) => {
        const isSelected = selectedId === b.id;

        return (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className="flex-shrink-0 flex flex-col items-center focus:outline-none bg-transparent border-none"
          >
            {/* ---------- wrapper circular ---------- */}
            <div
              className={clsx(
                'relative w-16 h-16 rounded-full overflow-hidden ring-2 transition',
                isSelected ? 'ring-teal-500' : 'ring-transparent'
              )}
            >
              {/* avatar o placeholder */}
              {errorIds[b.id] || !b.avatar ? (
                <User2 className="w-full h-full text-gray-400" />
              ) : (
                <img
                  src={b.avatar}
                  alt={b.name}
                  className="w-full h-full object-cover"
                  onError={() => setErrorIds((p) => ({ ...p, [b.id]: true }))}
                />
              )}

              {/* ✔︎ palomita si está seleccionado */}
              {isSelected && (
                <span className="absolute -bottom-0.5 -right-0.5 bg-teal-500 p-1 rounded-full shadow-sm">
                  <Check size={12} className="text-white" />
                </span>
              )}
            </div>

            {/* nombre */}
            <span
              className={clsx(
                'mt-1 text-xs font-medium w-16 text-center truncate',
                isSelected ? 'text-teal-600' : 'text-gray-600'
              )}
            >
              {b.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
