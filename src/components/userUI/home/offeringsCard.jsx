import React from "react";
import './offeringCard.css'

function offeringsCard(props) {
  return (
    <div>
      <div className="offeringCard">
        <div className="cardImage">
            <img src={props.image} alt="" />
        </div>
        <h4>{props.heading}</h4>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default offeringsCard;
