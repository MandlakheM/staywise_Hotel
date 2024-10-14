import React, { useState } from "react";
import "./signup.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const userType = email === "admin@example.com" ? "Admin" : "User";

        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userType", userType);

        setLoading(false);
        if (userType === "Admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/userDetails";
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error logging in:", error.message);
        alert("Invalid login credentials. Please try again.");
      });
  }

  return (
    <div className="loginContainer">
      <div className="loginBox">
        {/* <div className="logo">STAYWISE</div> */}
        <h2>Welcome back</h2>
        <p>Please enter your details to login.</p>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

              required
            />
          </div>
          <button className="loginBtn" type="submit">
            Login
          </button>
        </form>

        <div className="register">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
      {loading && (
        <div className="loaderCont">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
