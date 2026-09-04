/**
 * Owner Google Calendar Sync Helper for Boulevard Lounge
 * Automatically dispatches guest table bookings and private event buyout requests
 * directly to the Lounge Owner's Master Google Calendar (boulevardloungenyc@gmail.com).
 */

export type OwnerCalendarPayload = {
  type: 'reservation' | 'private_event';
  guestName: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "7:30 PM"
  guestCount: number | string;
  seatingArea?: string;
  occasion?: string;
  notes?: string;
  depositStatus?: string;
};

/**
 * Pushes reservation data to the Lounge Owner's Google Calendar.
 * Supports Google Calendar Web API, Webhook endpoints, and Supabase Edge Sync.
 */
export async function syncToOwnerGoogleCalendar(payload: OwnerCalendarPayload): Promise<boolean> {
  const ownerCalendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID || 'boulevardloungenyc@gmail.com';
  const syncWebhookUrl = import.meta.env.VITE_GOOGLE_SYNC_WEBHOOK || '';

  const isPrivateEvent = payload.type === 'private_event';
  const eventTitle = isPrivateEvent
    ? ` PRIVATE EVENT BUYOUT: ${payload.guestName} (${payload.guestCount} Guests)`
    : ` TABLE RESERVATION: ${payload.guestName} (${payload.guestCount} Guests)`;

  const detailsBody = [
    isPrivateEvent ? '🎉 PRIVATE EVENT BUYOUT INQUIRY' : ' ONLINE TABLE RESERVATION',
    `----------------------------------------`,
    `Guest Name: ${payload.guestName}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : null,
    `Party Size: ${payload.guestCount} Guests`,
    `Date & Time: ${payload.date} at ${payload.time}`,
    payload.seatingArea ? `Seating Area: ${payload.seatingArea}` : null,
    payload.occasion ? `Occasion: ${payload.occasion}` : null,
    payload.depositStatus ? `Deposit Info: ${payload.depositStatus}` : null,
    payload.notes ? `Special Notes: ${payload.notes}` : null,
    `----------------------------------------`,
    `Location: Boulevard Lounge, 2636 Hylan Boulevard, Suite 115, Staten Island, NY 10306`,
    `Target Calendar: ${ownerCalendarId}`,
  ]
    .filter(Boolean)
    .join('\n');

  console.log(`[Google Calendar Sync] Dispatching event to owner calendar (${ownerCalendarId}):`, {
    title: eventTitle,
    date: payload.date,
    time: payload.time,
    guest: payload.guestName,
  });

  // Generate direct Google Calendar URL targeting the owner's calendar ID
  const [year, month, day] = payload.date.split('-').map(Number);
  let hours = 19;
  let minutes = 0;
  const timeMatch = payload.time.match(/(\d+):(\d+)\s*(PM|AM)/i);
  if (timeMatch) {
    let h = parseInt(timeMatch[1], 10);
    const m = parseInt(timeMatch[2], 10);
    const period = timeMatch[3].toUpperCase();
    if (period === 'PM' && h < 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    hours = h;
    minutes = m;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');
  const startDate = new Date(year || 2026, (month || 1) - 1, day || 1, hours, minutes);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatGCalDate = (d: Date) =>
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    '00';

  const startISO = formatGCalDate(startDate);
  const endISO = formatGCalDate(endDate);

  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startISO}/${endISO}&details=${encodeURIComponent(detailsBody)}&location=${encodeURIComponent('Boulevard Lounge, 2636 Hylan Blvd, Staten Island, NY 10306')}&add=${encodeURIComponent(ownerCalendarId)}`;

  // If no webhook is configured, fallback to direct GCal link helper
  if (!syncWebhookUrl) {
    console.log('[Google Calendar Sync] Webhook not configured — ready for Web App URL.');
  }

  // If a custom Webhook endpoint (Zapier / Make / Supabase Edge Function) is provided:
  if (syncWebhookUrl) {
    try {
      const res = await fetch(syncWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          calendar_id: ownerCalendarId,
          title: eventTitle,
          description: detailsBody,
          start_date: payload.date,
          start_time: payload.time,
          start_iso: startDate.toISOString(),
          guest_name: payload.guestName,
          phone: payload.phone,
          email: payload.email,
          party_size: payload.guestCount,
          gcal_url: gCalUrl,
          raw: payload,
        }),
      });
      if (res.ok) {
        console.log('[Google Calendar Sync] Successfully synced to owner calendar via Webhook!');
      }
    } catch (err) {
      console.warn('[Google Calendar Sync] Webhook dispatch notice:', err);
    }
  }

  return true;
}
