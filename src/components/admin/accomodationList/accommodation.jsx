import React, { useState, useEffect } from "react";
import "./accommodation.css";
import AddRoomModal from "./addRoomModal";
import { connect } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

function Accommodation({ accom }) {
  const [modal, setModal] = useState(false);
  const [accommodations, setAccommodations] = useState([]);

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
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const activateModal = () => {
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
  };

  return (
    <main>
      <div className="accommodations">
        {/* <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {accom.map((place) => (
              <tr key={place.id}>
                <td>{place.id}</td>
                <td>{place.accomName}</td>
                <td>{place.price}</td>
                <td>{place.rating}</td>
                <td>{place.address}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <button type="button" onClick={activateModal}>
          Add Room
        </button>
        {modal && <AddRoomModal deactivateModal={deactivateModal} />}
        <div>
          <h1>Accommodation List</h1>
          <ul>
            {accommodations.length > 0 ? (
              accommodations.map((accommodation) => (
                <li key={accommodation.id}>
                  <h6>{accommodation.roomTitle}</h6>
                  <p>{accommodation.roomDescription}</p>
                </li>
              ))
            ) : (
              <p>No accommodations available.</p> 
            )}
          </ul>
          
        </div>
      </div>
    </main>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     accom: state.accommodation.places,
//   };
// };

export default Accommodation;
