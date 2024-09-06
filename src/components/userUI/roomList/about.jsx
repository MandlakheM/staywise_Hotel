import React from "react";
import "./roomlidt.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Map from "./map";
import Roomcard from "./roomcard";

function about() {
  return (
    <div className="bodyList gutter">
      <div className="listContainer">
        <div className="list">
          <div className="sticky">
            <div className="searchHeading">
              <p>Search results for your ideal room by :</p>
            </div>
            {/* <div className="locationSearch">
            <label htmlFor="location">Location</label>
            <input type="text" name="location" />
          </div> */}
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
                <button>search</button>
              </div>
            </div>
          </div>
          <Roomcard />
          <Roomcard />
          <Roomcard />
        </div>
        {/* <h1>About Page</h1> */}
        <div className="mapContainer">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default about;
