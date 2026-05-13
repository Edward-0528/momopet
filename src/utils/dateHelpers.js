import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
} from 'date-fns';

export { format, isSameDay, isBefore, startOfDay, addMonths, subMonths };

/**
 * Returns an array of day cells for the calendar grid.
 * Pads the start with nulls so Mon = index 0.
 * @param {Date} monthDate - any date within the target month
 * @returns {(Date|null)[]}
 */
export function getCalendarDays(monthDate) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const days = eachDayOfInterval({ start, end });

  // getDay: 0=Sun,1=Mon,...,6=Sat → convert to Mon-first (0=Mon)
  const firstDow = (getDay(start) + 6) % 7;
  const padding = Array(firstDow).fill(null);

  return [...padding, ...days];
}

/**
 * Returns available time slots for a given date.
 * v1: returns static slots with mock booked-out times.
 * @param {Date} _date
 * @returns {{ time: string, available: boolean }[]}
 */
export function getTimeSlots(_date) {
  return [
    { time: '9:00 AM',  available: true },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM',  available: true },
    { time: '2:00 PM',  available: true },
    { time: '3:00 PM',  available: true },
  ];
}

/**
 * Formats a date for display on the receipt.
 * @param {Date} date
 * @returns {string} e.g. "Tuesday, May 19, 2026"
 */
export function formatReceiptDate(date) {
  return format(date, 'EEEE, MMMM d, yyyy');
}
