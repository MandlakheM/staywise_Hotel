import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import "./BookingForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeBooking } from "../../../Redux/booking/bookingSlice";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function BookingForm({
  roomId,
  roomPrice,
  roomBreakfastFee,
  roomDetails,
  activateLoader,
}) {
  const [guests, setGuests] = useState(1);
  const [continueBooking, setContinueBooking] = useState(false);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    postalCode: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const pricePerNight = Number(roomPrice);
  const nights = Math.ceil(
    (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24)
  );
  const breakfastFee = Number(roomBreakfastFee);
  const stayPrice = pricePerNight * nights;
  const totalBeforeTaxes = stayPrice + breakfastFee;
  // console.log(totalBeforeTaxes);
  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          alert("User document not found.");
        }
      }
    };

    fetchData();
  }, [user]);

  // const reserve = () => {
  //   if (user && roomId) {
  //     const bookingData = {
  //       userId: user.uid,
  //       roomId,
  //       guests,
  //       checkinDate,
  //       checkoutDate,
  //       totalAmount: totalBeforeTaxes,
  //       // userDetails: { ...userDetails },
  //       timestamp: new Date(),
  //       ...roomDetails,
  //     };
  //     dispatch(makeBooking(bookingData));
  //     // alert("Booking successful!");
  //     setContinueBooking(false);
  //     navigate("/userDetails");
  //   } else {
  //     alert("You must be logged in to make a booking.");
  //   }
  // };

  const onToken = async (token) => {
    try {
      // if (loading) return;

      if (!user) {
        alert("You must be logged in to make a booking.");
        navigate("/");
        return;
      }

      activateLoader();

      if (user && roomId) {
        const bookingData = {
          userId: user.uid,
          roomId,
          guests,
          checkinDate,
          checkoutDate,
          totalAmount: totalBeforeTaxes,
          token,
          timestamp: new Date(),
          ...roomDetails,
        };

        const bookingsCollectionRef = collection(db, "bookings");

        // await addDoc(bookingsCollectionRef, bookingData);

        dispatch(makeBooking(bookingData));

        alert("Booking and payment successful!");
        setContinueBooking(false);

        if (userData && userData.email) {
          try {
            await axios.post("http://localhost:3030/api/send", {
              from: "staywisehotels@gmail.com",
              to: userData.email,
              subject: "Booking Confirmation",
              message: `Dear customer, your booking for ${roomDetails.roomTitle} has been made and is awaiting approval.`,
            });

            alert("Confirmation email sent!");
          } catch (err) {
            alert("Error sending email: " + err.message);
          }
        } else {
          alert("User email not found.");
        }

        navigate("/userDetails");
      } else {
        alert("Room not found.");
      }
    } catch (error) {
      console.error("Error processing booking:", error);
      alert("There was an error processing your booking.");
    } finally {
      activateLoader();
    }
  };

  return (
    <>
      <div className="booking-container">
        <h2>
          R{pricePerNight} <span>per night</span>
        </h2>

        <div className="date-section">
          <div className="date-box">
            <label>Check-in</label>
            <input
              type="date"
              onChange={(e) => setCheckinDate(e.target.value)}
            />
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
          onClick={() => setContinueBooking(!continueBooking)}
        >
          Reserve
        </button>

        {continueBooking && (
          <>
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
              {/* <input
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
            /> */}
              <StripeCheckout
                token={onToken}
                stripeKey="pk_test_51PvyjyEfeDWghDPt7VoSfmQMd8KyIBfZLxW6FSI3aaH974SQGLN3CL4MOdZ5YhFyiYR9WU9weKc3A0rh9s9skIYf00b8hDIMOe"
              />
              {/* <button className="payment-button" onClick={reserve}>
              Make Payment
            </button> */}
            </div>
          </>
        )}

        <p>You won't be charged yet</p>

        <div className="price-breakdown">
          <p>
            R{pricePerNight} x {nights} nights
            <span>R{pricePerNight * nights}</span>
          </p>
          <p>
            Breakfast fee<span>R{breakfastFee || "0"}</span>
          </p>
          <hr />
          <p>
            Total<span>R{totalBeforeTaxes}</span>
          </p>
        </div>
        {/* {loading && (
        <div className="loaderCont">
          <div className="loader"></div>
        </div>
      )} */}
      </div>
    </>
  );
}

export default BookingForm;
