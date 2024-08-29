import React, { useEffect, useState } from "react";
import "../App.css";

function AdminHome({}) {
  const logOut = () => {
    localStorage.clear();
    window.location.href = "./login";
  };

  return (
    <div>
      <div>
        <h3>Welcome Admin</h3>

        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminHome;
