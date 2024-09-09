import React, { useState, useEffect } from "react";
import "./roomlidt.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Map from "./map";
import Roomcard from "./roomcard";
import RoomDisplay from "./roomDisplay";

function About() {
  const [accommodations, setAccommodations] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedCount, setBedCount] = useState("");
  const [bathroomCount, setBathroomCount] = useState("");

  const fetchData = async () => {
    try {
      const colRef = collection(db, "accommodationList");

      let roomQuery = colRef;

      if (minPrice) {
        roomQuery = query(
          roomQuery,
          where("roomPrice", ">=", Number(minPrice))
        );
      }
      if (maxPrice) {
        roomQuery = query(
          roomQuery,
          where("roomPrice", "<=", Number(maxPrice))
        );
      }
      if (bedCount) {
        roomQuery = query(roomQuery, where("bedCount", "==", Number(bedCount)));
      }
      if (bathroomCount) {
        roomQuery = query(
          roomQuery,
          where("bathroomCount", "==", Number(bathroomCount))
        );
      }

      const snapshot = await getDocs(roomQuery);
      const accommodationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccommodations(accommodationList);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bodyList gutter">
      <div className="listContainer">
        <div className="list">
          {/* <div className="sticky">
            <div className="searchHeading">
              <p>Search results for your ideal room by :</p>
            </div>

            <div className="filters">
              <div className="minprice">
                <label htmlFor="minPrice">Min price</label>
                <input
                  type="number"
                  name="minPrice"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)} 
                />
              </div>
              <div className="maxprice">
                <label htmlFor="maxPrice">Max price</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)} 
                />
              </div>
              <div className="bedCount">
                <label htmlFor="bedCount">Bed count</label>
                <input
                  type="number"
                  name="bedCount"
                  value={bedCount}
                  onChange={(e) => setBedCount(e.target.value)} 
                />
              </div>
              <div className="bathroomCount">
                <label htmlFor="bathroomCount">Bathroom count</label>
                <input
                  type="number"
                  name="bathroomCount"
                  value={bathroomCount}
                  onChange={(e) => setBathroomCount(e.target.value)} 
                />
              </div>
              <div className="filterButton">
                <button onClick={handleSearch}>Search</button> 
              </div>
            </div>
          </div> */}

          {accommodations.map((room) => (
            <RoomDisplay key={room.id} room={room} />
          ))}
          {/* <RoomDisplay /> */}
        </div>

        {/* <div className="mapContainer">
          <Map />
        </div> */}
      </div>
    </div>
  );
}

export default About;
