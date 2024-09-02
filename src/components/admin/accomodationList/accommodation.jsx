import React from "react";
import { useState } from "react";
import "./accommodation.css";
import AddRoomModal from "./addRoomModal";
import { connect } from "react-redux";

function Accommodation({ accom }) {
  const [modal, setModal] = useState(false);

  console.log(accom);

  const activateModal = () => {
    setModal(true);
  };

  const deactivateModal = () => {
    setModal(false);
  };

  return (
    <main>
      <div className="accommodations">
        {" "}
        <table>
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
        </table>
        <button type="button" onClick={activateModal}>
          add room
        </button>
        {modal && <AddRoomModal deactivateModal={deactivateModal} />}
      </div>
    </main>
  );
}

const stateToProps = (state) => {
  return {
    accom: state.accommodation.places,
  };
};

export default connect(stateToProps)(Accommodation);
