import React, { useState, useEffect } from "react";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../config/firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

function SignUp() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({
    // firstName:"",
    // lastName:"",
    // email:"",
    // password:""
  });
  const [userType, setUserType] = useState("User");
  const [secretKey, setSecretKey] = useState("");
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      // console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUserInfo((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    console.log(userInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === "Admin" && secretKey !== "@dmin") {
      alert("Invalid Admin Secret Key");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...userInfo,
        timeStamp: serverTimestamp(),
      });
      // navigate(-1);
      window.location.href = "/login";
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div>
          Register As
          <input
            type="radio"
            name="UserType"
            value="User"
            onChange={(e) => setUserType(e.target.value)}
            defaultChecked
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
        {userType === "Admin" && (
          <div>
            <label>Secret Key</label>
            <input
              type="text"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        )}
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="file">
            Upload image: <DriveFolderUploadOutlinedIcon className="icon" />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
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
  );
}

export default SignUp;
