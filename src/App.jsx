import React from "react";
import {
  BrowserRouter as Router,
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          {!isLoggedIn && (
            <>
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
            </>
          )}

          <Route path="/home" element={<Home />} />

          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            {isLoggedIn ? (
              userType !== "Admin" ? (
                <>
                  <Route path="/userDetails" element={<UserDetails />} />
                  <Route path="/admin-dashboard" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/admin-dashboard" element={<AdminHome />} />
                  <Route path="/userDetails" element={<Navigate to="/" />} />
                </>
              )
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
