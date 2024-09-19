import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import "./RoomDetailsPage.css";
import BookingForm from "./bookingForm";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import LandscapeRoundedIcon from "@mui/icons-material/LandscapeRounded";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import BalconyRoundedIcon from "@mui/icons-material/BalconyRounded";
import SpatialAudioRoundedIcon from "@mui/icons-material/SpatialAudioRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ForestRoundedIcon from "@mui/icons-material/ForestRounded";
import Footer from "../footer/footer";
import ShareIcon from "@mui/icons-material/Share";

function IndividualRoom() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);

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
    return (
      <div className="loaderCont">
        <div className="loader"></div>
      </div>
    );
  }

  const auth = getAuth();
  const user = auth.currentUser;

  const addToFav = async () => {
    if (user && roomId && roomDetails) {
      const favourite = {
        userId: user.uid,
        roomId,
        timestamp: new Date(),
        ...roomDetails,
      };

      try {
        await setDoc(doc(db, "favorites", `${user.uid}_${roomId}`), favourite);
        // console.log("Room added to favorites:", favourite);
        alert("Room added to your favourite");
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    } else {
      console.error("User not authenticated, room ID, or room details missing");
    }
  };

  const shareRoom = () => {
    const roomUrl = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: roomDetails.roomTitle,
          text: `Check out this room: ${roomDetails.roomTitle}`,
          url: roomUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(roomUrl).then(() => {
        alert("Room link copied to clipboard!");
      });
    }
  };

  const activateLoader = () => {
    setLoading(!loading);
  };

  return (
    <>
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
            <div className="fav">
              <h2>{roomDetails.roomTitle}</h2>
              <div className="buttContainer">
                <button type="button" onClick={addToFav}>
                  <FavoriteRoundedIcon />
                </button>
                <button type="button" onClick={shareRoom}>
                  <ShareIcon />{" "}
                </button>
              </div>
            </div>

            <p>{roomDetails.roomDescription}</p>
            <div className="amenities">
              <div className="iconPair">
                <i className="icon">wifi :</i>{" "}
                {roomDetails.wifi ? <WifiRoundedIcon /> : "No wifi"}
              </div>
              <div className="iconPair">
                <i className="icon">TV :</i>{" "}
                {roomDetails.tv ? <LiveTvRoundedIcon /> : "No tv"}
              </div>
              <div className="iconPair">
                <i className="icon">mountain view</i>{" "}
                {roomDetails.mountainView ? (
                  <LandscapeRoundedIcon />
                ) : (
                  "No mountain view"
                )}
              </div>
              <div className="iconPair">
                <i className="icon">ocean view :</i>{" "}
                {roomDetails.oceanView ? <WavesRoundedIcon /> : "No ocean view"}
              </div>
              <div className="iconPair">
                <i className="icon">air coditioned ;</i>{" "}
                {roomDetails.airConditioned ? (
                  <AirRoundedIcon />
                ) : (
                  "No air condition"
                )}
              </div>
              <div className="iconPair">
                <i className="icon">balcony :</i>{" "}
                {roomDetails.balcony ? <BalconyRoundedIcon /> : "No balcony"}
              </div>
              <div className="iconPair">
                <i className="icon">sound proofed :</i>{" "}
                {roomDetails.soundProofed ? (
                  <SpatialAudioRoundedIcon />
                ) : (
                  "No sound proof"
                )}
              </div>
              <div className="iconPair">
                <i className="icon">room service :</i>{" "}
                {roomDetails.roomService ? (
                  <CleaningServicesRoundedIcon />
                ) : (
                  "No room service"
                )}
              </div>
              <div className="iconPair">
                <i className="icon">city view :</i>{" "}
                {roomDetails.cityView ? (
                  <ApartmentRoundedIcon />
                ) : (
                  "No city view"
                )}
              </div>
              <div className="iconPair">
                <i className="icon">forest view :</i>{" "}
                {roomDetails.forestView ? (
                  <ForestRoundedIcon />
                ) : (
                  "No forest view"
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="booking-section">
          <BookingForm
            roomId={roomId}
            roomPrice={roomDetails.roomPrice}
            roomBreakfastFee={roomDetails.breakfastPrice}
            roomDetails={roomDetails}
            activateLoader={activateLoader}
          />
        </div>
      </div>
      <Footer />
      {loading && (
        <div className="loaderCont">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default IndividualRoom;
