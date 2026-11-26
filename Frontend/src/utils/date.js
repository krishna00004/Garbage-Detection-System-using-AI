export const formatDateTime = (value) => {
  if (!value) return 'Unknown time';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown time';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

export const relativeTimeFromNow = (value) => {
  if (!value) return 'No timestamp';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'No timestamp';

  const diffMs = date.getTime() - Date.now();
  const formatter = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  const ranges = [
    ['day', 86400000],
    ['hour', 3600000],
    ['minute', 60000]
  ];

  for (const [unit, ms] of ranges) {
    if (Math.abs(diffMs) >= ms || unit === 'minute') {
      return formatter.format(Math.round(diffMs / ms), unit);
    }
  }

  return 'Just now';
};
