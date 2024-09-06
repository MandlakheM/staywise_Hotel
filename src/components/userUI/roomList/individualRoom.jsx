import React from "react";
import "./RoomDetailsPage.css";
import BookingForm from "./bookingForm";

function IndividualRoom() {
  return (
    <div className="room-details-container">
      <div className="room-info">
        <div className="image-gallery">
          <img
            src="https://via.placeholder.com/"
            alt="Room main"
            className="main-image"
          />
          <div className="thumbnail-images">
            <img
              src="https://via.placeholder.com/100x100"
              alt="Thumbnail 1"
              className="thumbnail"
            />
            <img
              src="https://via.placeholder.com/100x100"
              alt="Thumbnail 2"
              className="thumbnail"
            />
            <img
              src="https://via.placeholder.com/100x100"
              alt="Thumbnail 3"
              className="thumbnail"
            />
          </div>
        </div>

        <div className="room-description">
          <h2>Double Deluxe Suite</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ex
            illum, ut at omnis dignissimos eligendi vero ducimus officia aliquid
            officiis vel asperiores, dolorum et voluptas labore a. Perferendis,
            dolorem.
          </p>
          <div className="amenities">
            <div><i className="icon">wifi</i> wifi</div>
            <div><i className="icon">lock</i> safe</div>
            <div><i className="icon">kitchen</i> refrigerator</div>
            <div><i className="icon">shower</i> shower/bath</div>
            <div><i className="icon">house</i> housekeeping</div>
            <div><i className="icon">gym</i> free gym</div>
          </div>
        </div>
      </div>

      <div className="booking-section">
        <BookingForm />
      </div>
    </div>
  );
}

export default IndividualRoom;
