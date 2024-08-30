import React, { useState } from "react";
import "./adminHome.css";
import Overview from "../overview/overview";
import Accommodation from "../accomodationList/accommodation";
import Reservations from "../reservations/reservations";

function AdminHome() {
  const [currentPage, setCurrentPage] = useState("overview");

  const logOut = () => {
    localStorage.clear();
    window.location.href = "./login";
  };

  const display = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />;
      case "accommodations":
        return <Accommodation />;
      case "reservations":
        return <Reservations />;
      // default:
      //   return <Overview />;
    }
  };

  return (
    <div>
      <h3>Welcome Admin</h3>
      {/* <button onClick={logOut}>Log Out</button> */}

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
                  <button onClick={() => setCurrentPage("overview")}>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage("accommodations")}>
                    Accommodations
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage("reservations")}>
                    Reservations
                  </button>
                </li>
                <li>
                  <button onClick={logOut}>Log Out</button>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
        <main>{display()}</main>
      </div>
    </div>
  );
}

export default AdminHome;
