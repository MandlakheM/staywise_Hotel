import React, { useEffect, useState } from "react";
import "./adminHome.css";

function AdminHome({}) {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "./login";
  };

  return (
    <div>
      <div>
        <h3>Welcome Admin</h3>

        {/* <button>add new room</button> */}

        <button onClick={logOut}>Log Out</button>

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
                  <a href="#overview">Dashboard</a>
                </li>
                <li>
                  <a href="#accommodations">Accommodations</a>
                </li>
                <li>
                  <a href="#reservations">Reservations</a>
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
          <main>
            <section id="overview"></section>
            <section id="accommodations"></section>
            <section id="reservations"></section>
            <section id="settings"></section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
