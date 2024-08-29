import React, { useEffect, useState } from "react";
import "./adminHome.css";
import Overview from "../overview/overview";
import Accommodation from "../accomodationList/accommodation";
import Reservations from "../reservations/reservations";

function AdminHome({}) {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "./login";
  };

  const display = (page) => {
    switch (page) {
      case "overview":
        return <Overview />;
      case "accommodations":
        return <Accommodation />;
      case "reservations":
        return <Reservations />;
    }
  };

  // console.log(display("overview"))

  return (
    <div>
      <h3>Welcome Admin</h3>
      {/* <button>add new room</button> */}
      <button onClick={logOut}>Log Out</button>

      <div className="adminContainer">
        <div className="asideContainer">
          <aside>
            <header>
              <div>
                <span>Admin Name</span>
              </div>
            </header>
            <nav>
              <ul className="asideLinks">
                <li>
                  <button onClick={display("overview")}>Dashboard</button>
                </li>
                <li>
                  <button onClick={display("accommodations")}>
                    Accommodations
                  </button>
                </li>
                <li>
                  <button onClick={display("reservations")}>
                    Reservations
                  </button>
                </li>
                <li>
                  <a href="#settings">Settings</a>
                </li>
                <li>
                  <a href="#logout">Logout</a>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
        <main>
          {display("reservations")}
          {/* <Overview />
          <Accommodation />
          <Reservations /> */}
        </main>
      </div>
    </div>
  );
}

export default AdminHome;
