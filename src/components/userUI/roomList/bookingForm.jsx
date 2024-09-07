import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import './BookingForm.css'

function BookingForm({ roomId, roomPrice, roomBreakfastFee }) {
  const [guests, setGuests] = useState(1);
  const [continueBooking, setContinueBooking] = useState(false);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    postalCode: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const pricePerNight = roomPrice;
  const nights = Math.ceil(
    (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24)
  );
  const breakfastFee = roomBreakfastFee;
  const totalBeforeTaxes = pricePerNight * nights + breakfastFee;

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const reserve = async () => {
    if (user && roomId) {
      try {
        const bookingData = {
          userId: user.uid,
          roomId,
          guests,
          checkinDate,
          checkoutDate,
          totalAmount: totalBeforeTaxes,
          userDetails: { ...userDetails },
          timestamp: new Date(),
        };

        await addDoc(collection(db, "bookings"), bookingData);

        alert("Booking successful!");
        setContinueBooking(false);
      } catch (error) {
        console.error("Error making booking:", error);
      }
    } else {
      alert("You must be logged in to make a booking.");
    }
  };

  return (
    <div className="booking-container">
      <h2>
        R{pricePerNight} <span>per night</span>
      </h2>

      <div className="date-section">
        <div className="date-box">
          <label>Check-in</label>
          <input type="date" onChange={(e) => setCheckinDate(e.target.value)} />
        </div>
        <div className="date-box">
          <label>Checkout</label>
          <input
            type="date"
            onChange={(e) => setCheckoutDate(e.target.value)}
          />
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

      <button
        className="reserve-button"
        onClick={() => setContinueBooking(true)}
      >
        Reserve
      </button>

      {continueBooking && (
        <div className="payment-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="expirationDate"
            placeholder="Expiration Date"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            onChange={handleInputChange}
          />

          <button className="payment-button" onClick={reserve}>
            Make Payment
          </button>
        </div>
      )}

      <p>You won't be charged yet</p>

      <div className="price-breakdown">
        <p>
          R{pricePerNight} x {nights} nights
          <span>R{pricePerNight * nights}</span>
        </p>
        <p>
          Breakfast fee<span>R{breakfastFee}</span>
        </p>
        <hr />
        <p>
          Total<span>R{totalBeforeTaxes}</span>
        </p>
      </div>
    </div>
  );
}

export default BookingForm;
