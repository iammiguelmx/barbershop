interface Props {
  service: {
    name: string;
    price: number;
    duration: number;
  };
  onContinue: () => void;
  disabled?: boolean;
}

export default function SummaryCard({ service, onContinue, disabled }: Props) {
  return (
    <div className="px-4 py-4 mt-6 border-t border-gray-200">
      {/* línea servicio, precio */}
      <div className="flex justify-between text-sm text-gray-700">
        <span>{service.name}</span>
        <span className="font-semibold">${service.price.toFixed(2)}</span>
      </div>

      {/* duración */}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Duración</span>
        <span>{service.duration} min</span>
      </div>

      {/* botón */}
      <button
        onClick={onContinue}
        disabled={disabled}
        className={clsx(
          'mt-4 w-full py-3 rounded-xl text-white font-semibold transition shadow-md',
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-teal-600 hover:bg-teal-700'
        )}
      >
        Continuar
      </button>
    </div>
  );
}

import clsx from 'clsx';
