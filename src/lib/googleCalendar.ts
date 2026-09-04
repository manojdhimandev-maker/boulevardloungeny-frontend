/**
 * Google Calendar Helper for Boulevard Lounge Reservations
 * Generates direct Google Calendar event URLs pre-filled with guest reservation details.
 */

export type ReservationCalendarData = {
  guestName: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "7:30 PM" or "10:00 PM"
  guestCount: number;
  seatingArea?: string;
  occasion?: string;
  notes?: string;
};

export function createGoogleCalendarUrl(data: ReservationCalendarData): string {
  const { guestName, phone, email, date, time, guestCount, seatingArea, occasion, notes } = data;

  // Convert Date + Time string into start & end Date objects
  const [year, month, day] = date.split('-').map(Number);

  let hours = 19; // Default 7 PM
  let minutes = 30;

  const timeMatch = time.match(/(\d+):(\d+)\s*(PM|AM)/i);
  if (timeMatch) {
    let h = parseInt(timeMatch[1], 10);
    const m = parseInt(timeMatch[2], 10);
    const period = timeMatch[3].toUpperCase();
    if (period === 'PM' && h < 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    hours = h;
    minutes = m;
  }

  // Create start time in UTC format for Google Calendar (YYYYMMDDTHHMMSSZ)
  // Assuming Eastern Time (NY is UTC-4 / UTC-5)
  // We can format local date-time strings: YYYYMMDDTHHMMSS
  const pad = (n: number) => n.toString().padStart(2, '0');

  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

  const formatGCalDate = (d: Date) => {
    return (
      d.getFullYear().toString() +
      pad(d.getMonth() + 1) +
      pad(d.getDate()) +
      'T' +
      pad(d.getHours()) +
      pad(d.getMinutes()) +
      '00'
    );
  };

  const startISO = formatGCalDate(startDate);
  const endISO = formatGCalDate(endDate);

  const title = `Boulevard Lounge Reservation - ${guestName} (${guestCount} Guests)`;
  const location = `Boulevard Lounge, 2636 Hylan Boulevard, Suite 115, Staten Island, NY 10306`;

  const detailsLines = [
    `🥂 RESERVATION DETAILS — BOULEVARD LOUNGE`,
    `Guest Name: ${guestName}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Party Size: ${guestCount} Guests`,
    `Date & Time: ${date} at ${time}`,
    seatingArea ? `Seating Preference: ${seatingArea}` : null,
    occasion ? `Occasion: ${occasion}` : null,
    notes ? `Special Notes: ${notes}` : null,
    `----------------------------------------`,
    `Address: 2636 Hylan Boulevard, Suite 115, Staten Island, NY 10306`,
    `Phone: (718) 290-9375`,
  ]
    .filter(Boolean)
    .join('\n');

  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startISO}/${endISO}&details=${encodeURIComponent(detailsLines)}&location=${encodeURIComponent(location)}`;

  return gCalUrl;
}

export function addToGoogleCalendar(data: ReservationCalendarData) {
  const url = createGoogleCalendarUrl(data);
  window.open(url, '_blank', 'noopener,noreferrer');
}
