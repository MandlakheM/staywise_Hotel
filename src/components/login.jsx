import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="auth">
        <p>
          <b>Log In</b>
        </p>
        <input
          type="email"
          name="username"
          id=""
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <p>
          Dont have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
