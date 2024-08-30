import React from "react";
import "./accommodation.css";
import { connect } from "react-redux";

function Accommodation({ accom }) {
  console.log(accom);

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
