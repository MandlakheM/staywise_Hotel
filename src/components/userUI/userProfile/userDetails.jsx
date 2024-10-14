import React, { useState, useEffect } from "react";
import { auth, db } from "../../../config/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import "./UserProfile.css";
import { signOut } from "firebase/auth";
import { fetchBookings } from "../../../Redux/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import FavoriteRooms from "./favourite";
import RateModal from "./rateModal";
import { span } from "framer-motion/client";

function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  // const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [ratingRoomId, setRatingRoomId] = useState(false);
  const [ratingUserId, setRatingUserId] = useState(false);

  const dispatch = useDispatch();
  const { bookings, status } = useSelector((state) => state.bookings);

  const user = auth.currentUser;
  // console.log(user);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookings(user.uid));
    }

    const fetchData = async () => {
      const favRoomsQuery = query(
        collection(db, "favorites"),
        where("userId", "==", user.uid)
      );
      const favRoomsSnapshot = await getDocs(favRoomsQuery);
      const favRoomsData = favRoomsSnapshot.docs.map((doc) => doc.data());
      setFavoriteRooms(favRoomsData);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      }
    };

    fetchData();
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, userData);
      alert("User profile updated successfully!");
    } catch (error) {
      alert("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
    signOut();
  };

  const handleModal = (id, userId) => {
    setIsRating(!isRating);
    setRatingRoomId(id);
    setRatingUserId(userId);

    // console.log(userID, roomId);
  };

  return (
    <div className="profile-wrapper gutter">
      <div className="profile-container">
        <div className="loginContainer">
          <div className="loginBox">
            {/* <div className="logo">STAYWISE</div> */}
            <form onSubmit={handleSubmit}>
              <div className="profile-avatar left">
                <img
                  src={userData.img || "https://via.placeholder.com/"}
                  alt={userData.firstName}
                  className="main-image"
                />{" "}
              </div>
              <div className="inputGroup">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputGroup">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="inputGroup">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={userData.email}
                  required
                />
              </div>
              <button className="loginBtn" type="submit">
                Edit Profile
              </button>
              <button className="logout" onClick={logOut}>
                Log Out
              </button>
            </form>
          </div>
        </div>

        <div className="favorite-rooms">
          <h3>Favorite Rooms</h3>
          <FavoriteRooms />
          <div className="rooms-container">
            {favoriteRooms.length > 0 ? (
              favoriteRooms.map((favRoom, index) => (
                <div key={index} className="room-item">
                  <img
                    src={favRoom.img || "https://via.placeholder.com/150"}
                    alt={`Favorite Room ${index + 1}`}
                  />
                  <h5>{favRoom.roomTitle || "Room Title"}</h5>
                </div>
              ))
            ) : (
              <p>No favorite rooms yet.</p>
            )}
          </div>
        </div>
        <div className="bookings-section">
          <h3>Your Bookings</h3>
          <div className="bookings-container">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="room-item">
                  <img
                    src={booking.img || "https://via.placeholder.com/150"}
                    alt={`Booking`}
                  />
                  <h5>{booking.roomTitle || "Room Title"}</h5>
                  <p>Check-in: {booking.checkinDate}</p>
                  <p>Checkout: {booking.checkoutDate}</p>
                  <p>
                    Booking status:{" "}
                    {booking.status ? (
                      <span id="confirmed">Confirmed</span>
                    ) : (
                      <span id="pending">pending</span>
                    )}
                  </p>
                  {booking.status ? (
                    <button
                      type="button"
                      className="logout"
                      onClick={() => handleModal(booking.id, user.uid)}
                      // userId={user.uid}
                    >
                      Rate room
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <p>No bookings yet.</p>
            )}
          </div>
        </div>
      </div>

      {isRating && (
        <RateModal
          handleModal={handleModal}
          roomId={ratingRoomId}
          userId={ratingUserId}
        />
      )}

      {/* <div className="notifications">
        <h3>Notifications</h3>
        <div className="notifications-placeholder">
          [Placeholder for notifications]
        </div>
      </div> */}
    </div>
  );
}

export default UserProfile;

{
  /* <div className="bookings-container">
  {bookings.length > 0 ? (
    bookings.map((booking) => (
      <div key={booking.id} className="room-item">
        <img
          src={booking.img || "https://via.placeholder.com/150"}
          alt={`Favorite Room ${index + 1}`}
        />
        <p>{booking.roomTitle || "Room Title"}</p>
        <p>Check-in: {booking.checkinDate}</p>
        <p>Checkout: {booking.checkoutDate}</p>
      </div>
    ))
  ) : (
    <p>No bookings yet.</p>
  )}
</div>; */
}
