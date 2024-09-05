import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        const userType = email === "admin@example.com" ? "Admin" : "User";
        
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userType", userType);

        if (userType === "Admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/userDetails";
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error.message);
        alert("Invalid login credentials. Please try again.");
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
        <p>
          <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
