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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

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
      setLoading(false);
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        {/* <div className="logo">STAYWISE</div> */}
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="registerAs">
            Register As
            <div className="inputGroup">
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => setUserType(e.target.value)}
                defaultChecked
              />
            </div>
            User
            <div className="inputGroup">
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
              />
            </div>
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
          <div className="inputGroup">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputGroup">
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
          <button className="loginBtn" type="submit">
            Sign up
          </button>
        </form>

        <div className="register">
          Have an account? <a href="/login">Log in</a>
        </div>
      </div>
      {loading && (
        <div className="loaderCont">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
