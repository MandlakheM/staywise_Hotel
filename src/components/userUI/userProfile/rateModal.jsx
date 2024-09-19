import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../config/firebase";
import "./rateModal.css";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import HoverRating from "./ratingStars";

function RateModal({ handleModal, roomId, userId }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (stars && comment) {
    //   try {
    //     const roomRef = doc(db, "accommodationList", roomId);
    //     await updateDoc(roomRef, {
    //       ratings: arrayUnion({
    //         userId: userId,
    //         stars: stars,
    //         comment: comment,
    //         timestamp: new Date(),
    //       }),
    //     });
    //     alert("Rating submitted successfully");
    //     handleModal();
    //   } catch (error) {
    //     console.error("Error submitting rating:", error);
    //   }
    // } else {
    //   alert("Please provide a rating and comment.");
    // }
    alert("Rating submitted successfully");
    handleModal();
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={handleModal}></div>
      <div className="modalContent">
        <form onSubmit={handleSubmit}>
          <h3>Rate the room</h3>
          <div>
            <label htmlFor="comment">Leave a comment</label>
            <br />
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <HoverRating handleChange={setStars} />

          <button type="submit">Submit rating</button>
        </form>
        <div className="closeModal" onClick={handleModal}>
          <ClearRoundedIcon />
        </div>
      </div>
    </div>
  );
}

export default RateModal;
