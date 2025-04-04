import React, { useState, useEffect } from "react";
import "./addRoom.css";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { db, storage } from "../../../config/firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

function AddRoomModal({ deactivateModal, currentAccommodation }) {
  const [room, setRoom] = useState({
    roomTitle: currentAccommodation?.roomTitle || "",
    roomDescription: currentAccommodation?.roomDescription || "",
    address: currentAccommodation?.address || "",
    roomService: currentAccommodation?.roomService || false,
    balcony: currentAccommodation?.balcony || false,
    cityView: currentAccommodation?.cityView || false,
    forestView: currentAccommodation?.forestView || false,
    airConditioned: currentAccommodation?.airConditioned || false,
    tv: currentAccommodation?.tv || false,
    wifi: currentAccommodation?.wifi || false,
    oceanView: currentAccommodation?.oceanView || false,
    mountainView: currentAccommodation?.mountainView || false,
    soundProofed: currentAccommodation?.soundProofed || false,
    roomPrice: currentAccommodation?.roomPrice || "",
    breakfastPrice: currentAccommodation?.breakfastPrice || "",
    bedCount: currentAccommodation?.bedCount || "",
    kingBed: currentAccommodation?.kingBed || "",
    guestCount: currentAccommodation?.guestCount || "",
    queenBed: currentAccommodation?.queenBed || "",
    bathroomCount: currentAccommodation?.bathroomCount || "",
  });
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);

  //   const dispatch = useDispatch();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      // console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setRoom((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setRoom({
      ...room,
      [name]: type === "checkbox" ? checked : value,
    });
    // console.log(room);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch(createAccommodation(room));

    try {
      if (currentAccommodation) {
        // Updating an existing accommodation
        const accommodationRef = doc(
          db,
          "accommodationList",
          currentAccommodation.id
        );
        await setDoc(accommodationRef, { ...room }, { merge: true });
      } else {
        // Creating a new accommodation
        await addDoc(collection(db, "accommodationList"), {
          ...room,
          timeStamp: serverTimestamp(),
        });
      }
      deactivateModal();
    } catch (error) {
      alert("Failed to add room. Please try again.");
    }
  };

  return (
    <div>
      <div className="modal">
        <div className="overlay" onClick={deactivateModal}></div>
        <div className="modalContent">
          <h3>Add a room</h3>
          <p>Add details about the room in your hotel</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="roomTitle">Room Title</label>
              <br />
              <br />
              <input
                type="text"
                value={room.roomTitle}
                name="roomTitle"
                id="roomTitle"
                onChange={handleChange}
              />
            </div>

            <div>
              <br />
              <label htmlFor="roomDescription">Room Desciption</label>
              <p>Is there anything special about this room?</p>
              <input
                type="text"
                name="roomDescription"
                id="roomDescription"
                value={room.roomDescription}
                onChange={handleChange}
              />
            </div>

            <div>
              <br />
              <label htmlFor="address">Room Address</label>
              <p>Where is the room located?</p>
              <input
                type="text"
                name="address"
                id="address"
                value={room.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Choose Room Amenities (Optional) </label>
              <div className="checkboxes">
                <label htmlFor="roomService">24hrs room services</label>
                <input
                  type="checkbox"
                  name="roomService"
                  id="roomService"
                  value={room.roomService}
                  onChange={handleChange}
                />
              </div>
              <div className="checkboxes">
                <label htmlFor="balcony">balcony</label>

                <input
                  type="checkbox"
                  name="balcony"
                  id="balcony"
                  value={room.balcony}
                  onChange={handleChange}
                />
              </div>
              <div className="checkboxes">
                <label htmlFor="cityView">city view</label>

                <input
                  type="checkbox"
                  name="cityView"
                  id="cityView"
                  value={room.cityView}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="checkboxes">
                <label htmlFor="forestView">forest view</label>

                <input
                  type="checkbox"
                  name="forestView"
                  id="forestView"
                  value={room.forestView}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="checkboxes">
                <label htmlFor="airConditioned">air conditioned</label>

                <input
                  type="checkbox"
                  name="airConditioned"
                  id="airConditioned"
                  value={room.airConditioned}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="checkboxes">
                <label htmlFor="tv">TV</label>

                <input
                  type="checkbox"
                  name="tv"
                  id="tv"
                  value={room.tv}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="checkboxes">
                <label htmlFor="wifi">free Wifi</label>

                <input
                  type="checkbox"
                  name="wifi"
                  id="wifi"
                  value={room.wifi}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="checkboxes">
                <label htmlFor="oceanView">ocean view</label>

                <input
                  type="checkbox"
                  name="oceanView"
                  id="oceanView"
                  value={room.oceanView}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="checkboxes">
                <label htmlFor="mountainView">mountain view</label>

                <input
                  type="checkbox"
                  name="mountainView"
                  id="mountainView"
                  value={room.mountainView}
                  onChange={handleChange}
                />
              </div>{" "}
              <div className="checkboxes">
                <label htmlFor="soundProofed">sound proofed</label>

                <input
                  type="checkbox"
                  name="soundProofed"
                  id="soundProofed"
                  value={room.soundProofed}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="file">
                Upload image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            <div>
              <label htmlFor="roomPrice">Room Price</label>
              <p>what's the price for staying in this room for 24hrs?</p>
              <input
                type="text"
                name="roomPrice"
                id="roomPrice"
                value={room.roomPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="breakfastPrice">Breakfast Price (Optional)</label>
              <p>If you offer breakfast, what is the price?</p>
              <input
                type="number"
                name="breakfastPrice"
                id="breakfastPrice"
                value={room.breakfastPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="bedCount">Bed Count</label>
              <p>How many beds are available in this room?</p>
              <input
                type="number"
                name="bedCount"
                id="bedCount"
                value={room.bedCount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="kingBed">King Beds (Optional)</label>
              <p>How many king size beds are available in this room?</p>

              <input
                type="number"
                name="kingBed"
                id="kingBed"
                value={room.kingBed}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="guestCount">Guest count</label>
              <p>How many guests are allowed?</p>
              <input
                type="number"
                name="guestCount"
                id="guestCount"
                value={room.guestCount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="queenBed">Queen Beds (Optional)</label>
              <p>How many queen sized beds are available in this room?</p>

              <input
                type="number"
                name="queenBed"
                id="queenBed"
                value={room.queenBed}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="bathroomCount">Bathroom Count </label>
              <p>how many bathrooms are in this room?</p>
              <input
                type="number"
                name="bathroomCount"
                id="bathroomCount"
                value={room.bathroomCount}
                onChange={handleChange}
              />
            </div>

            <button type="submit">
              {currentAccommodation
                ? "Update Accommodation"
                : "Create Accommodation"}
            </button>
            <div className="closeModal">
              <button type="button" onClick={deactivateModal}></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// const dispatchToProps = (dispatch) => {
//   return {
//     createAccom: (room) => dispatch(createAccom(room)),
//   };
// };

export default AddRoomModal;
