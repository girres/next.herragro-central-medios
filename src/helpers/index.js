export const dateFormat = (date = new Date()) => {
  return new Intl.DateTimeFormat('es', {
    timeZone: 'America/Bogota',
    calendar: 'gregory',
    numberingSystem: 'latn',
    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: true,
  }).format(date);
};
