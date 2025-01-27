export function formatDateToSpanishLocal(dateString: string): string  {
  if (!dateString) {
    return 'Fecha inválida';
  }

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Lima',
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Fecha inválida';
  }
}
