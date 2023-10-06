import React, { useState, useEffect } from "react";
import stag from "../images/image 13.png";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [nameError, setNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [checkError, setCheckError] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setUserNameError("");
    setEmailError("");
    setMobileError("");
    setCheckError("");

    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      setNameError("Name contains letters and spaces");
      isValid = false;
    }

    if (!userName.trim()) {
      setUserNameError("Username is required");
      isValid = false;
    } else if (!/^[A-Za-z0-9]+$/.test(userName)) {
      setUserNameError("Name contains letters and spaces");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[A-za-z0-9._%+-]+@gmail\.com$/.test(email)) {
      setEmailError("Invalid email.it should be a gmail address");
      isValid = false;
    }
    if (!mobile.trim()) {
      setMobileError("Mobile number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Mobilenumber Contains 10 numbers");
      isValid = false;
    }
    if (!isChecked) {
      setCheckError("Check this box,if you want to Proceed");
      isValid = false;
    }
    if (isValid) {
      const newUser = {
        name,
        userName,
        email,
        mobile,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      console.log(newUser);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="col-1">
        <img src={stag} alt="stageimage"></img>
        <h2>Discover new things on Superapp</h2>
      </div>
      <div className="col-2">
        <div className="col2-1">
          <h1>Super app</h1>
          <h2>Create your new account</h2>
        </div>
        <div className="col2-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={nameError ? "error-input" : ""}
          ></input>
          <div className="error">{nameError}</div>
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className={userNameError ? "error-input" : ""}
          ></input>
          <div className="error">{userNameError}</div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={emailError ? "error-input" : ""}
          ></input>
          <div className="error">{emailError}</div>
          <input
            type="text"
            placeholder="Mobile"
            maxLength={10}
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            className={mobileError ? "error-input" : ""}
          ></input>
          <div className="error">{mobileError}</div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              setCheckError("");
            }}
          ></input>
          <h3>Share my registration data with Superapp</h3>
          <div className="error">{checkError}</div>
        </div>
        <div className="col2-3">
          <button onClick={handleSubmit}>SIGN UP</button>
        </div>
        <div className="col2-4">
          <h2>
            By clicking on Signup, you agree to Superapp{" "}
            <span>Terms and Conditions of Use</span>
          </h2>
          <h2>
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head Superapp <span>Privacy Policy</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
export default Register;
