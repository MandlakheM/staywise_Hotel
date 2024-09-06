import React, { useState } from "react";
// import "./BookingForm.css"; // Import the CSS file

function BookingForm() {
  const [guests, setGuests] = useState(1);
  const pricePerNight = 850;
  const nights = 5;
  const breakfastFee = 350;
  const serviceFee = 747;
  
  const totalBeforeTaxes = (pricePerNight * nights) + breakfastFee + serviceFee;

  return (
    <div className="booking-container">
      <h2>R{pricePerNight} ZAR <span>night</span></h2>
      
      <div className="date-section">
        <div className="date-box">
          <label>Check-in</label>
          <input type="date"  />
        </div>
        <div className="date-box">
          <label>Checkout</label>
          <input type="date" />
        </div>
      </div>

      <div className="guests-section">
        <label>Guests</label>
        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
          <option value={1}>1 guest</option>
          <option value={2}>2 guests</option>
          <option value={3}>3 guests</option>
          <option value={4}>4 guests</option>
        </select>
      </div>

      <button className="reserve-button">Reserve</button>
      <p>You won't be charged yet</p>

      <div className="price-breakdown">
        <p>R{pricePerNight} ZAR x {nights} nights<span>R{pricePerNight * nights} ZAR</span></p>
        <p>Breakfast fee<span>R{breakfastFee} ZAR</span></p>
        <p>Sservice fee<span>R{serviceFee}</span></p>
        <hr />
        <p>Total<span>R{totalBeforeTaxes} ZAR</span></p>
      </div>
    </div>
  );
}

export default BookingForm;
