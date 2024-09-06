import React from "react";
import "./roomlidt.css";

function roomcard() {
  const bookingClicked = () => {
    window.location.href = "/room";
  };
  return (
    <div className="roomCard">
      <div className="img">
        {/* <img src="./ds1-1-bed-suite-tower.jpg" alt="" /> */}
      </div>
      <div className="roomInfo">
        <div className="title">Pent House</div>
        <div className="desciption">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
          expedita perferendis et nihil eius accusantium ut tempore voluptas
          nulla odio officiis quos velit, repellat commodi impedit dolorem
          aperiam quo neque.
        </div>
        <div className="roomPrice">R4500</div>
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
