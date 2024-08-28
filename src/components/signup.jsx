import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignup() {
    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
        alert("Sign up successful");
        console.log(createUserWithEmailAndPassword);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <form onSubmit={handleSignup}>
      <div className="auth">
        <p>
          <b>Sign Up</b>
        </p>
        <input
          type="email"
          name="username"
          id=""
          placeholder="email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to={"/"}>Log In</Link>
        </p>
      </div>
    </form>
  );
}

export default Signup;
