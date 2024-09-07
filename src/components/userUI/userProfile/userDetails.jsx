import React, { useState, useEffect } from "react";
import { auth, db } from "../../../config/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "./UserProfile.css";
import { signOut } from "firebase/auth";

function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  // console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          }

          const favRoomsQuery = query(
            collection(db, "favorites"),
            where("userId", "==", user.uid)
          );
          const favRoomsSnapshot = await getDocs(favRoomsQuery);
          const favRoomsData = favRoomsSnapshot.docs.map((doc) => doc.data());
          setFavoriteRooms(favRoomsData);

          const bookingsQuery = query(
            collection(db, "bookings"),
            where("userId", "==", user.uid)
          );
          const bookingsSnapshot = await getDocs(bookingsQuery);
          const bookingsData = bookingsSnapshot.docs.map((doc) => doc.data());
          setBookings(bookingsData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
    signOut();
  };
  return (
    <div className="profile-wrapper gutter">
      <button onClick={logOut}>Log Out</button>

      <div className="profile-container">
        <div className="profile-section">
          <div className="profile-avatar">
            <span>👤</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={userData.firstName}
                onChange={handleChange}
              />
            </label>
            <label>
              Surname
              <input
                type="text"
                name="surname"
                value={userData.lastName}
                onChange={handleChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Edit Profile</button>
          </form>
        </div>

        <div className="favorite-rooms">
          <h3>Favorite Rooms</h3>
          <div className="rooms-container">
            {favoriteRooms.length > 0 ? (
              favoriteRooms.map((favRoom, index) => (
                <div key={index} className="room-item">
                  <img
                    src={favRoom.img || "https://via.placeholder.com/150"}
                    alt={`Favorite Room ${index + 1}`}
                  />
                  <p>{favRoom.roomTitle || "Room Title"}</p>
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
              bookings.map((booking, index) => (
                <div key={index} className="booking-item">
                  <p>{`Booking for ${booking.roomTitle || "Room"} on ${
                    booking.checkinDate
                  }`}</p>
                  <p>{`Status: ${booking.status || "Pending"}`}</p>
                </div>
              ))
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="notifications">
        <h3>Notifications</h3>
        <div className="notifications-placeholder">
          [Placeholder for notifications]
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
