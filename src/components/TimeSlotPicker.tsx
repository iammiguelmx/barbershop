import clsx from 'clsx';

interface Props {
  times: string[];
  selected: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSlotPicker({ times, selected, onSelect }: Props) {
  return (
    <div className="overflow-x-auto scrollbar-hide px-4 py-2">
      <div className="flex gap-2">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className={clsx(
              'px-4 py-2 rounded-full border text-sm whitespace-nowrap transition',
              selected === t
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
