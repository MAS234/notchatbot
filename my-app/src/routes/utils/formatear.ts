export const formatDate = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};
