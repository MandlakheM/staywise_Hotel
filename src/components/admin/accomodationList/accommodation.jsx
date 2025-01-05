import React, { useState, useEffect } from "react";
import AddRoomModal from "./addRoomModal";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../../config/firebase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./accommodation.css";

function Accommodation() {
  const [modal, setModal] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "accommodationList");
        const snapshot = await getDocs(colRef);
        const accommodationList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("Fetched Data:", accommodationList);
        setAccommodations(accommodationList);
        console.log(accommodations);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, [modal]);

  const activateModal = () => {
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
  };

  const handleUpdate = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setModal(true);
  };

  const handleDelete = async (accommodationId) => {
    await deleteDoc(doc(db, "accommodationList", accommodationId));
  };

  return (
    <main>
      <div className="accommodations gutter">
        <button type="button" onClick={activateModal}>
          Add Room
        </button>
        {modal && (
          <AddRoomModal
            deactivateModal={deactivateModal}
            currentAccommodation={selectedAccommodation}
          />
        )}
        <div className="">
          <h1>Accommodation List</h1>
          <div className="accommodationCards">
            {accommodations.length > 0 ? (
              accommodations.map((accommodation) => (
                <div key={accommodation.id}>
                  <Card
                    sx={{ width: 300, marginBottom: "20px", height: 400}}
                    key={accommodation.id}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={accommodation.img}
                      title={accommodation.roomTitle}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {accommodation.roomTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* {accommodation.roomDescription} */}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {accommodation.roomPrice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Guests: {accommodation.numberOfGuests}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Address: {accommodation.address}
                      </Typography>
                    </CardContent>
                    <div className="cardActions">
                      <CardActions>
                        <Button onClick={() => handleUpdate(accommodation)}>
                          Update
                        </Button>
                        <Button onClick={() => handleDelete(accommodation.id)}>
                          Delete
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <p>No accommodations available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Accommodation;
