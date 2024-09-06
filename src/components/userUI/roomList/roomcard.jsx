import React from "react";
import "./roomlidt.css";

function roomcard({ room }) {
  const bookingClicked = () => {
    window.location.href = "/room";
  };
  return (
    <div className="roomCard">
      <div className="img">
        <img src={room.img} alt={room.title} />

        {/* <img src="./ds1-1-bed-suite-tower.jpg" alt="" /> */}
      </div>
      <div className="roomInfo">
        <div className="title">{room.roomTitle}</div>
        <div className="desciption">{room.roomDescription}</div>
        <div className="roomPrice">{room.roomPrice}</div>
        <div className="roomAmenities"></div>
        <div className="buttons">
          <button type="button" onClick={bookingClicked}>
            book now
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default roomcard;
