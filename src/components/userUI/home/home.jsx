import React from "react";
import "./home.css";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';

function Home() {
  return (
    <body className="body">
      <section className="homeContainer gutter">
        <div className="home gutter"></div>
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
      <h3 className="homeHeading">Experience Unparalleled Luxury in the Heart of Sandton</h3>
      </section>
    </body>
  );
}

export default Home;
