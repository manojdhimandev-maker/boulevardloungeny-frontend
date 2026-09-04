import React, { useState } from 'react';
import type { PageId } from './Navbar';
import { checkDepositRequirement } from '@/data/reservationConfig';

type HeroReservationWidgetProps = {
  onNavigate: (page: PageId) => void;
};

export const HeroReservationWidget: React.FC<HeroReservationWidgetProps> = ({ onNavigate }) => {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('7:30 PM');

  const depositInfo = checkDepositRequirement(date, guests);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('reservations');
  };

  return (
    <div className="reserve-box hero-reserve-box-positioned animate-scale-in">
      <h2 className="res-card-title">RESERVE YOUR EVENING</h2>
      <form className="res-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">DATE</label>
          <input
            type="date"
            className="form-input"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">GUESTS</label>
            <div className="guest-counter">
              <button
                type="button"
                className="counter-btn"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
              >
                -
              </button>
              <span className="counter-val">
                {guests} Guests
              </span>
              <button
                type="button"
                className="counter-btn"
                onClick={() => setGuests((g) => Math.min(12, g + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">TIME</label>
            <select
              className="form-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="6:00 PM">6:00 PM</option>
              <option value="7:30 PM">7:30 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:30 PM">10:30 PM</option>
              <option value="12:00 AM">12:00 AM</option>
            </select>
          </div>
        </div>

        <div className="deposit-info">
          <div className="deposit-text">
            <span className="deposit-title">
              {depositInfo.isRequired ? 'DEPOSIT TO CONFIRM' : 'RESERVATION POLICY'}
            </span>
            <span className="deposit-amount">
              {depositInfo.isRequired ? `$${depositInfo.amount} Table Hold` : 'No Deposit Required'}
            </span>
          </div>
          <div className="deposit-badge">
            {depositInfo.isRequired ? (
              <>
                Refundable<br />On arrival
              </>
            ) : (
              <>
                Instant<br />Free Booking
              </>
            )}
          </div>
        </div>

        <button type="submit" className="btn-gold btn-submit-res">
          SECURE RESERVATION
        </button>
      </form>
    </div>
  );
};

export default HeroReservationWidget;
