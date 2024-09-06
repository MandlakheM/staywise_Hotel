import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
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

  return (
    <div className="room-details-container">
      <div className="room-info">
        <div className="image-gallery">
          <img
            src={roomDetails.img || "https://via.placeholder.com/"}
            alt={roomDetails.roomTitle}
            className="main-image"
          />
          {/* <div className="thumbnail-images">
            {roomDetails.img?.map((image, index) => (
              <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
            ))}
          </div> */}
        </div>

        <div className="room-description">
          <h2>{roomDetails.roomTitle}</h2>
          <p>{roomDetails.roomDescription}</p>
          <div className="amenities">
            <div><i className="icon">wifi</i> {roomDetails.wifi ? "wifi" : "No wifi"}</div>
            <div><i className="icon">lock</i> {roomDetails.tv ? "Safe" : "No tv"}</div>
            {/* <div><i className="icon">kitchen</i> {roomDetails.amenities?.refrigerator ? "Refrigerator" : "No refrigerator"}</div> */}
          </div>
        </div>
      </div>

      <div className="booking-section">
        {/* <Calender/> */}
        <BookingForm roomId={roomId} roomPrice={roomDetails.roomPrice} roomBreakfastFee={roomDetails.breakfastFee} />

        {/* <BookingForm roomPrice={roomDetails.roomPrice} roomBreakfastFee={roomDetails.breakfastPrice}/> */}
      </div>
    </div>
  );
}

export default IndividualRoom;
