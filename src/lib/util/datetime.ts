export function formatDateText(date: string): string {
  return formatDateTextFromDate(new Date(date));
}

export function formatDateTextFromDate(date: Date): string {
  // Using en-GB formatting for English day-of-week and month names.
  const weekday = date.toLocaleDateString(
      'en-GB',
      {
        timeZone: 'Europe/Oslo',
        weekday: 'long',
      }
  );
  const day = date.toLocaleDateString(
      'en-GB',
      {
        timeZone: 'Europe/Oslo',
        day: 'numeric',
        month: 'long',
      },
  );
  return `${weekday}, ${day}`;
}

export function formatTimeText(date: Date): string {
  return date.toLocaleTimeString(
      'en-GB',
      {
        timeStyle: 'short',
        timeZone: 'Europe/Oslo',
      }
  );
}
