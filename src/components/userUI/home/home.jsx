import React from "react";
import "./home.css";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import OfferingsCard from "./offeringsCard";
import spa from "../../../assets/spa.jpg";
import mandela from "../../../assets/Nelson-Mandela-Square-sandton.jpg";
import sandton from "../../../assets/sandton-hotel.jpg";
import StarIcon from "@mui/icons-material/Star";
import person1 from "../../../assets/avataaars (3).png";
import person2 from "../../../assets/avataaars (4).png";
import Footer from "../footer/footer";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  return (
    <>
      <section className="body">
        <div className="home ">
          <div className="homeContent">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Experience luxury at Staywise, your ultimate destination.</p>
          </div>
          <div class="bookingContainer">
            <button class="btn" onClick={()=>navigate("/about")}>
              {/* <SearchIcon /> */} 
              Explore our rooms
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
        <div className="cardContainer">
          <OfferingsCard
            image={sandton}
            heading="Breathtaking City Views Await You at staywise"
            text="Indulge in our exquisite luxury rooms, designed to provide the utmost comfort and style."
          />
          <OfferingsCard
            image={mandela}
            heading="Discover the Best of Sandton's Local Attractions"
            text="Our prime location puts you just moments away from the city's top landmarks and entertainment venues."
          />
          <OfferingsCard
            image={spa}
            heading="Unwind in Style at staywise's Luxurious Spa and Wellness Center"
            text="Pamper yourself with our range of rejuvenating treatments and state-of-the-art facilities."
          />
        </div>
      </section>
      <section className="happyGuests gutter">
        <h3 className="homeHeading">Happy Guests</h3>
        <p>Read what our guests have to say about their stay</p>
        <div className="ratingsContainer">
          <div className="ratings">
            <div className="stars">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <div className="comment">
              <p>
                Our stay at staywise was absolutely amazing! The staff was
                friendly and the rooms were luxurious.
              </p>
            </div>
            <div className="reviewuser">
              <div className="reviewimg">
                <img src={person2} alt="" />
              </div>
              <div className="reviewName">John Doe</div>
            </div>
          </div>
          <div className="ratings">
            <div className="stars">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <div className="comment">
              <p>
                I had a fantastic experience at staywise. The service was
                impeccable and the amenities were top-notch.
              </p>
            </div>
            <div className="reviewuser">
              <div className="reviewimg">
                <img src={person1} alt="" />
              </div>
              <div className="reviewName">Jane Smith</div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Home;
