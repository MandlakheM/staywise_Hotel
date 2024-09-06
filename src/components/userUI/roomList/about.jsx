import React, { useState, useEffect } from "react";
import "./roomlidt.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Map from "./map";
import Roomcard from "./roomcard";

function About() {
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
        setAccommodations(accommodationList);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bodyList gutter">
      <div className="listContainer">
        <div className="list">
          <div className="sticky">
            <div className="searchHeading">
              <p>Search results for your ideal room by :</p>
            </div>

            <div className="filters">
              <div className="minprice">
                <label htmlFor="minPrice">Min price</label>
                <input type="number" name="minPrice" />
              </div>
              <div className="maxprice">
                <label htmlFor="maxPrice">Max price</label>
                <input type="number" name="maxPrice" />
              </div>
              <div className="bedCount">
                <label htmlFor="bedCount">Bed count</label>
                <input type="number" name="bedCount" />
              </div>
              <div className="bathroomCount">
                <label htmlFor="bathroomCount">Bathroom count</label>
                <input type="number" name="bathroomCount" />
              </div>
              <div className="filterButton">
                <button>Search</button>
              </div>
            </div>
          </div>

          {accommodations.map((room) => (
            <Roomcard key={room.id} room={room} />
          ))}
        </div>

        <div className="mapContainer">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default About;
