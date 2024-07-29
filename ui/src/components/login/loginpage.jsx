import { useState } from "react";
import React from "react";
import "./loginpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function Loginpage() {
  const { setAdminLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:4000/loginapi", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setAdminLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          <div className="col-md-6 side-image">
            <img src="images/white.png" alt="" />
            <div className="login-text">
              <p>
                Employee Management System <i>- EMS</i>
              </p>
            </div>
          </div>
          <div className="col-md-6 right">
            <div className="login-input-box">
              <header>ADMIN LOGIN</header>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <form onSubmit={handleLogin}>
                <div className="login-input-field">
                  <input
                    type="text"
                    className="login-input"
                    id="username"
                    required=""
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="username">UserName</label>
                </div>
                <div className="login-input-field">
                  <input
                    type="password"
                    className="login-input"
                    id="pass"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="pass">Password</label>
                </div>
                <div className="login-input-field">
                  <input type="submit" id="login-submit" value="Login" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
