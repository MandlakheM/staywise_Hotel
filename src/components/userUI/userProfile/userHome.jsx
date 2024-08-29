import React, { useEffect, useState } from "react";

function UserHome() {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };
  return (
    <div>
      <div>
        <div>
          <h1>Name</h1>
          <h1>Email</h1>
          <br />
          <button onClick={logOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
