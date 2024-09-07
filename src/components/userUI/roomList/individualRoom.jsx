import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import "./RoomDetailsPage.css";
import BookingForm from "./bookingForm";

function IndividualRoom() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const docRef = doc(db, "accommodationList", roomId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoomDetails(docSnap.data());
        } else {
          console.error("No such room found!");
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (!roomDetails) {
    return <div>Loading...</div>;
  }

  const auth = getAuth();
  const user = auth.currentUser;

  const addToFav = async () => {
    if (user && roomId) {
      const favourite = {
        userId: user.uid,
        roomId,
        timestamp: new Date(),
      };

      try {
        await setDoc(doc(db, "favorites", `${user.uid}_${roomId}`), favourite); 
        console.log("Room added to favorites:", favourite);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    } else {
      console.error("User not authenticated or room ID missing");
    }
  };

  return (
    <div className="room-details-container">
      <div className="room-info">
        <div className="image-gallery">
          <img
            src={roomDetails.img || "https://via.placeholder.com/"}
            alt={roomDetails.roomTitle}
            className="main-image"
          />
        </div>

        <div className="room-description">
          <h2>{roomDetails.roomTitle}</h2>
          <button type="button" onClick={addToFav}>
            Add to Favorites
          </button>
          <p>{roomDetails.roomDescription}</p>
          <div className="amenities">
            <div>
              <i className="icon">wifi</i>{" "}
              {roomDetails.wifi ? "wifi" : "No wifi"}
            </div>
            <div>
              <i className="icon">lock</i> {roomDetails.tv ? "Safe" : "No tv"}
            </div>
          </div>
        </div>
      </div>

      <div className="booking-section">
        <BookingForm
          roomId={roomId}
          roomPrice={roomDetails.roomPrice}
          roomBreakfastFee={roomDetails.breakfastFee}
        />
      </div>
    </div>
  );
}

export default IndividualRoom;
