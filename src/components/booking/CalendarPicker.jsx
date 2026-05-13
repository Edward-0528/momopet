import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getCalendarDays,
  format,
  isSameDay,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
} from '../../utils/dateHelpers';

// v1: Mock unavailable dates — odd days of the week (Sun) + some randoms
function isUnavailable(date) {
  const day = date.getDay();
  // Sundays always closed
  if (day === 0) return true;
  // Mock a few specific booked-out dates
  const dateStr = format(date, 'yyyy-MM-dd');
  const booked = ['2026-05-14', '2026-05-20', '2026-05-27', '2026-06-03', '2026-06-10'];
  return booked.includes(dateStr);
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function CalendarPicker({ selectedDate, onSelect }) {
  const [viewMonth, setViewMonth] = useState(new Date());
  const today = startOfDay(new Date());
  const days  = getCalendarDays(viewMonth);

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewMonth((m) => subMonths(m, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EAD9C5] transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} color="#7A4F35" />
        </button>
        <span className="text-sm font-extrabold" style={{ color: '#3D2314' }}>
          {format(viewMonth, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EAD9C5] transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} color="#7A4F35" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-bold py-1"
            style={{ color: '#7A4F35' }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} />;

          const isPast      = isBefore(startOfDay(date), today);
          const unavailable = isUnavailable(date);
          const disabled    = isPast || unavailable;
          const isSelected  = selectedDate && isSameDay(date, selectedDate);
          const isToday     = isSameDay(date, today);

          return (
            <div key={date.toISOString()} className="flex justify-center">
              <motion.button
                whileTap={disabled ? {} : { scale: 0.9 }}
                onClick={() => !disabled && onSelect(date)}
                disabled={disabled}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold relative transition-colors duration-150"
                style={{
                  backgroundColor: isSelected
                    ? '#C4603A'
                    : 'transparent',
                  color: isSelected
                    ? '#fff'
                    : disabled
                      ? '#D9C4A8'
                      : '#3D2314',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
                aria-label={format(date, 'MMMM d, yyyy')}
                aria-pressed={isSelected}
              >
                {/* Today underline dot */}
                {isToday && !isSelected && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#C4603A' }}
                  />
                )}
                {/* Unavailable X */}
                {unavailable && !isPast ? (
                  <span style={{ color: '#F5C6C0', textDecoration: 'line-through' }}>
                    {format(date, 'd')}
                  </span>
                ) : (
                  format(date, 'd')
                )}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 justify-center flex-wrap">
        {[
          { color: '#C4603A', label: 'Selected' },
          { color: '#D9C4A8', label: 'Unavailable' },
          { color: '#F5C6C0', label: 'Booked' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-xs" style={{ color: '#7A4F35' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
