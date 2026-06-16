import React, { useRef } from "react";
import "./User.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const User = () => {
  const passref = useRef();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const passkey = passref.current.value.trim();

    if (!passkey) {
      alert("Please enter the passkey.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/checkUser`,
        { passkey }
      );

      if (response.data.status) {
        alert(response.data.message);
        navigate("/AdminHome");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error checking user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="user-login-page">

      <div className="user-login-bg"></div>

      <div className="user-login-card">

        <img
          src="/icon1.png"
          alt="ElectRevise Logo"
          className="user-login-logo"
        />

        <h1 className="user-login-title">
          User Access Portal
        </h1>

        <p className="user-login-subtitle">
          Enter your assigned access passkey
          to continue.
        </p>

        <div className="user-login-form">

          <label>
            Passkey
          </label>

          <input
            type="text"
            ref={passref}
            placeholder="Enter Passkey"
            className="user-login-input"
          />

          <button
            className="user-login-button"
            onClick={handleSubmit}
          >
            Continue →
          </button>

          <div className="user-dev-section">
            <div className="user-back-wrapper">
              <Link
                to="/"
                className="user-back-btn"
              >
                ← Back to Home
              </Link>
            </div>
              <div className="user-dev-title">
                Developed Collaboratively
              </div>

              <div className="user-dev-grid">

                <div className="user-dev-card">

                  <div className="user-dev-avatar">
                    YD
                  </div>

                  <div className="user-dev-info">

                    <h4>
                      Yatharth Dubey
                    </h4>

                    <div className="user-dev-links">

                      <a
                        href="https://github.com/Yatharth-Dubey"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>

                      <a
                        href="https://www.linkedin.com/in/yatharth-dubey-34a532316"
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>

                      <a
                        href="https://yatharthdubey.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Portfolio
                      </a>

                    </div>

                  </div>

                </div>
                <div className="user-dev-card">
                  <div className="user-dev-avatar">
                    SD
                  </div>
                  <div className="user-dev-info">
                    <h4>
                      Sachin Diwakar
                    </h4>
                    <div className="user-dev-links">
                      <a
                        href="https://github.com/sachindiwakar35"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>

                      <a
                        href="https://www.linkedin.com/in/sachin-diwakar-604aa5338"
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>

                      <a
                        href="https://sachin-portfolio-plum.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Portfolio
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            </div>
        </div>
      </div>
    </div>
  );
};