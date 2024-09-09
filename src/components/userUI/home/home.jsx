import React from "react";
import "./home.css";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";

function Home() {
  return (
    <>
      <section className="body">
        <div className="home gutter">
          <div class="homeContent">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Experience luxury at Staywise, your ultimate destination.</p>
          </div>
          <div class="bookingContainer">
            <form>
              <div class="formGroup">
                <div class="inputGroup">
                  <input type="date" />
                  {/* <label>Check In</label> */}
                </div>
                <p>Add date</p>
              </div>
              <div class="formGroup">
                <div class="inputGroup">
                  <input type="date" />
                  {/* <label>Check Out</label> */}
                </div>
                <p>Add date</p>
              </div>
              <div class="formGroup">
                <div class="inputGroup">
                  <input type="number" min={1} name="guestNumber" />
                  <label htmlFor="guestNumber">Guests</label>
                </div>
                <p>Add guests</p>
              </div>
            </form>
            <button class="btn">
              <i class="ri-search-line"></i>
            </button>
          </div>
        </div>
      </section>
      <section className="amenitiesContainer gutter">
        <div className="amenitiesText">
          <h3 className="homeHeading">
            Indulge in Unparalleled Luxury <br /> and Serenity
          </h3>
          <p>
            Experience a world of relaxation and <br /> sophistication at
            staywise. Our hotel offers a <br /> range of top-notch amenities and
            services to ensure <br />
            an unforgettable stay.
          </p>
          <div className="amenitiesType">
            <SpaOutlinedIcon />
            <p>Pamper Yourself at Our Exquisite Spa</p>
          </div>
          <div className="amenitiesType">
            <LocalDiningOutlinedIcon />
            <p>Savor Culinary Delights at Our Fine Dining Restaurants</p>
          </div>{" "}
          <div className="amenitiesType">
            <PoolOutlinedIcon />
            <p>Unwind by Our Stunning Rooftop Pool</p>
          </div>
        </div>
        <div className="amenitiesPic"></div>
      </section>
      <section className="offeringsContainer gutter">
        <h3 className="homeHeading">
          Experience Unparalleled Luxury in the Heart of Sandton
        </h3>
      </section>
    </>
  );
}

export default Home;
