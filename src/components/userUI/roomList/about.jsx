import React, { useState, useEffect } from "react";
import "./roomlidt.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Map from "./map";
import Roomcard from "./roomcard";
import RoomDisplay from "./roomDisplay";
import Footer from "../footer/footer";
import { p } from "framer-motion/client";

function About() {
  const [accommodations, setAccommodations] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [bedCount, setBedCount] = useState(null);
  const [bathroomCount, setBathroomCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const colRef = collection(db, "accommodationList");

      let conditions = [];

      if (minPrice) {
        conditions.push(where("roomPrice", ">=", minPrice));
      }
      if (maxPrice) {
        conditions.push(where("roomPrice", "<=", maxPrice));
      }
      if (bedCount) {
        conditions.push(where("bedCount", "==", bedCount));
      }
      if (bathroomCount) {
        conditions.push(where("bathroomCount", "==", bathroomCount));
      }

      console.log("Query conditions:", conditions);

      const roomQuery = conditions.length
        ? query(colRef, ...conditions)
        : colRef;

      const snapshot = await getDocs(roomQuery);
      const accommodationList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched accommodations:", accommodationList);
      setAccommodations(accommodationList);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  if (isLoading) {
    return (
      <div className="loaderCont">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bodyList gutter">
        <div className="listContainer">
          <div className="list">
            <div className="sticky">
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
            </div>
            <div className="accomList">
              {accommodations.length === 0 ? (
                <p>No accommodations found matching your criteria.</p>
              ) : (
                accommodations.map((room) => (
                  <RoomDisplay key={room.id} room={room} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
