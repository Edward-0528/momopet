/**
 * Format a number as a USD currency string.
 * @param {number} amount
 * @param {boolean} showPlus - append '+' for starting prices
 * @returns {string} e.g. "$75.00" or "$75.00+"
 */
export function formatCurrency(amount, showPlus = false) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
  return showPlus ? `${formatted}+` : formatted;
}

/**
 * Format total duration in minutes to a human-readable string.
 * @param {number} totalMins
 * @returns {string} e.g. "1 hr 30 mins" or "45 mins"
 */
export function formatDuration(totalMins) {
  if (totalMins < 60) return `${totalMins} mins`;
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  return `${hrs} hr${hrs > 1 ? 's' : ''} ${mins} mins`;
}
