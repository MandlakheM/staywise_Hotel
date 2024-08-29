import React, { useState } from "react";
import "../index.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "@dmin") {
      e.preventDefault();
      alert("Invalid Admin");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType == "Admin" ? (
            <div>
              <label>Secret Key</label>
              <input
                type="text"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

          <div>
            <label>First name</label>
            <input
              type="text"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label>Last name</label>
            <input
              type="text"
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
          <p>
            Already registered <a href="/login">Login?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
