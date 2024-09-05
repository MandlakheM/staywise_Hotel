import React from "react";
import "./roomlidt.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Map from "./map";
import { useNavigate } from "react-router-dom";

function about() {
  const bookingClicked = () => {
    window.location.href = "/room";
  };

  return (
    <body className="bodyList gutter">
      <div className="listContainer">
        {/* <h1>About Page</h1> */}
        <div className="list">
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
          <div className="roomCard">
            <div className="img">
              {/* <img src="./ds1-1-bed-suite-tower.jpg" alt="" /> */}
            </div>
            <div className="roomInfo">
              <div className="title">Pent House</div>
              <div className="desciption">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequuntur expedita perferendis et nihil eius accusantium ut
                tempore voluptas nulla odio officiis quos velit, repellat
                commodi impedit dolorem aperiam quo neque.
              </div>
              <div className="roomPrice">R4500</div>
              <div className="roomAmenities"></div>
              <div className="buttons">
                <button>book now</button>
              </div>
            </div>
          </div>
          <div className="roomCard">
            <div className="img">
              {/* <img src="./ds1-1-bed-suite-tower.jpg" alt="" /> */}
            </div>
            <div className="roomInfo">
              <div className="title">Pent House</div>
              <div className="desciption">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequuntur expedita perferendis et nihil eius accusantium ut
                tempore voluptas nulla odio officiis quos velit, repellat
                commodi impedit dolorem aperiam quo neque.
              </div>
              <div className="roomPrice">R4500</div>
              <div className="roomAmenities"></div>
              <div className="buttons">
                <button>book now</button>
              </div>
            </div>
          </div>{" "}
          <div className="roomCard">
            <div className="img">
              {/* <img src="./ds1-1-bed-suite-tower.jpg" alt="" /> */}
            </div>
            <div className="roomInfo">
              <div className="title">Pent House</div>
              <div className="desciption">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequuntur expedita perferendis et nihil eius accusantium ut
                tempore voluptas nulla odio officiis quos velit, repellat
                commodi impedit dolorem aperiam quo neque.
              </div>
              <div className="roomPrice">R4500</div>
              <div className="roomAmenities"></div>
              <div className="buttons">
                <button type="button" onClick={bookingClicked}>
                  book now
                </button>
              </div>
            </div>
          </div>
          <div className="roomCard">
            <div className="img">
              {/* <img src="./ds1-1-bed-suite-tower.jpg" alt="" /> */}
            </div>
            <div className="roomInfo">
              <div className="title">Pent House</div>
              <div className="desciption">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequuntur expedita perferendis et nihil eius accusantium ut
                tempore voluptas nulla odio officiis quos velit, repellat
                commodi impedit dolorem aperiam quo neque.
              </div>
              <div className="roomPrice">R4500</div>
              <div className="roomAmenities"></div>
              <div className="buttons">
                <button>book now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mapContainer">
          <Map />
        </div>
      </div>
    </body>
  );
}

export default about;
