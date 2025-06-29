import { Link } from 'react-router-dom';
import type { Service } from '../data/services';

import clsx from 'clsx';

type Props = { service: Service };

export default function ServiceCard({ service }: Props) {
  return (
    <Link
      to={`/book/${service.id}`}
      className={clsx(
        'block rounded-2xl shadow-md hover:shadow-xl transition p-4 bg-white'
      )}
    >
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-semibold">{service.name}</h3>
      <p className="text-sm text-gray-500">{service.duration} min · ${service.price}</p>
      <button
        className="mt-3 w-full py-2 bg-indigo-600 text-white rounded-lg font-medium"
      >
        Reservar
      </button>
    </Link>
  );
}
