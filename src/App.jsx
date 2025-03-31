import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signup";
import UserDetails from "./components/userUI/userProfile/userDetails";
import Navbar from "./components/userUI/header/navBar";
import AdminHome from "./components/admin/adminHome/adminHome";
import Gallery from "./components/userUI/rooms/gallery";
import About from "./components/userUI/roomList/about";
import Home from "./components/userUI/home/home";
import ProtectedRoute from "./components/router/protectedRoute";
import IndividualRoom from "./components/userUI/roomList/individualRoom";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const userType = localStorage.getItem("userType");

  return (
    <Router>
      <div className="appContainer">
        <Navbar isLoggedIn={isLoggedIn} userType={userType} />

        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
            </>
          )}

          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType != "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                {/* <Route path="/booking" element={<Booking />} /> */}
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                {/* <Route path="/booking" element={<Navigate to="/" />} /> */}
                <Route path="/admin-dashboard" element={<AdminHome />} />
              </>
            )}
          </Route>

          <Route path="/room/:roomId" element={<IndividualRoom />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
