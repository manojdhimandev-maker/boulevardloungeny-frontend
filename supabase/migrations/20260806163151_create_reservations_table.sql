/*
# Create reservation requests table

1. New Tables
- `reservations` stores reservation requests submitted through the public website.
- `id` uniquely identifies each request.
- `guest_name`, `phone`, `email` identify the guest.
- `reservation_date`, `reservation_time`, `guest_count` capture the requested booking.
- `notes` stores optional occasion or seating details.
- `status` tracks whether the lounge has confirmed the request.
- `created_at` records when the request was received.

2. Security
- Row level security is enabled.
- Public visitors can submit reservation requests and view/update/delete requests for this single-tenant venue workflow.
- No account or sign-in is required for guests.

3. Important Notes
- This table stores requests, not guaranteed bookings; the lounge should confirm availability by phone or text.
- Existing reservation data is preserved if this migration is safely re-run.
*/

CREATE TABLE IF NOT EXISTS public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  phone text NOT NULL,
  email text,
  reservation_date date NOT NULL,
  reservation_time text NOT NULL,
  guest_count integer NOT NULL CHECK (guest_count BETWEEN 1 AND 20),
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view reservations" ON public.reservations;
CREATE POLICY "Public can view reservations" ON public.reservations
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can submit reservations" ON public.reservations;
CREATE POLICY "Public can submit reservations" ON public.reservations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Public can update reservations" ON public.reservations;
CREATE POLICY "Public can update reservations" ON public.reservations
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public can delete reservations" ON public.reservations;
CREATE POLICY "Public can delete reservations" ON public.reservations
  FOR DELETE TO anon, authenticated USING (true);
