import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      userType: email === "admin@example.com" ? "Admin" : "User", 
    };

    localStorage.setItem("loggedIn", true);
    localStorage.setItem("userType", data.userType);

    if (data.userType === "Admin") {
      window.location.href = "/admin-dashboard";
    } else {
      window.location.href = "/userDetails";
    }
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
