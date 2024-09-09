import React from "react";
import "./roomDisplay.css";
import { useNavigate } from "react-router-dom";

const RoomDisplay = ({ room }) => {
  const navigate = useNavigate();

  const bookingClicked = () => {
    navigate(`/room/${room.id}`);
  };
  return (
    <div className="room-card">
      <div className="room-card-image">
        {room.img ? (
          <img src={room.img} alt={room.roomTitle} />
        ) : (
          "Loading image..."
        )}
      </div>
      <div className="room-card-content">
        <h3>{room.roomTitle}</h3>
        <p>Consists of multiple rooms and a common living area.</p>
        <div className="room-card-price">
          <span>R{room.roomPrice}</span>
          <small>/night</small>
        </div>
        <div className="buttons">
          <button type="button" onClick={bookingClicked}>
            book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDisplay;
