import { useState } from "react";
import "./App.css";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signUp" element={<Signup />}></Route>
            <Route
              path="/home"
              element={<Home/>}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
