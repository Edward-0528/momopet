import { motion } from 'framer-motion';
import { getTimeSlots } from '../../utils/dateHelpers';

export default function TimePicker({ selectedDate, selectedTime, onSelect }) {
  const slots = getTimeSlots(selectedDate);

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif' }}>
      <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#7A4F35' }}>
        Select a Time
      </p>
      <div className="flex flex-wrap gap-2">
        {slots.map(({ time, available }) => {
          const isSelected = selectedTime === time;
          return (
            <motion.button
              key={time}
              whileTap={available ? { scale: 0.93 } : {}}
              onClick={() => available && onSelect(time)}
              disabled={!available}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all duration-150"
              style={{
                backgroundColor: isSelected
                  ? '#C4603A'
                  : !available
                    ? '#F2E4D4'
                    : '#EAD9C5',
                color: isSelected
                  ? '#fff'
                  : !available
                    ? '#D9C4A8'
                    : '#3D2314',
                cursor: !available ? 'not-allowed' : 'pointer',
                boxShadow: isSelected ? '0 4px 12px rgba(196,96,58,0.30)' : 'none',
              }}
              aria-pressed={isSelected}
              aria-disabled={!available}
            >
              {time}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
