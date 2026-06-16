import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const numberRef = useRef();
  const otpRef = useRef();
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [enteredNumber, setEnteredNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const heroTexts = [
    "Review, Verify & Manage Electoral Records.",
    "Empowering Survey Teams for Efficient Verification.",
    "SIR for Accurate & Transparent Records."
  ];
  const badgeTexts = [
    "Government + Survey Review Portal",
    "Election Verification Platform",
    "Special Intensive Revision Portal",
    "Survey Monitoring & Review System"
  ];
  const [heroText,setHeroText]=useState("");
  const [badgeText,setBadgeText]=useState("");
  const [heroIndex,setHeroIndex]=useState(0);
  const [badgeIndex,setBadgeIndex]=useState(0);

  useEffect(() => {

let heroTimeout;
let switchTimeout;

setHeroText("");

const typeHero = (index = 0) => {

if(index <= heroTexts[heroIndex].length){

setHeroText(
heroTexts[heroIndex]
.slice(0,index)
);

heroTimeout =
setTimeout(
()=>typeHero(index+1),
55
);

}

};

typeHero();

switchTimeout =
setTimeout(()=>{

setHeroIndex(
(prev)=>
(prev+1)%heroTexts.length
);

setBadgeIndex(
(prev)=>
(prev+1)%badgeTexts.length
);

},7000);

return ()=>{

clearTimeout(heroTimeout);

clearTimeout(switchTimeout);

};

},[heroIndex]);

  // SEND OTP
  const handleAccess = async () => {
    try {
      setLoading(true);
      const number = numberRef.current.value.trim();
      if (!number) return alert("Please enter your mobile number");
      if (number.length !== 10)
        return alert("Enter valid 10 digit number");
      sessionStorage.setItem("mobileNumber", number);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/master`,
        {
          mobile_no: sessionStorage.getItem("mobileNumber"),
        }
      );

      if (response.data.status) {
        setEnteredNumber(number);
        setShowOTP(true);
        alert("OTP sent successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // VERIFY OTP
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const otp = otpRef.current.value.trim();
      if (otp.length !== 4)
        return alert("Please enter a valid 4-digit OTP");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/verify-otp`,
        {
          number: enteredNumber,
          otp,
        }
      );

      if (res.data.status) {
        sessionStorage.setItem("token", res.data.token);

        alert("OTP Verified Successfully!");
        navigate("/BoothSelection");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      alert("OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">

      {/* NAV */}
      <nav className="top-nav">
        <div className="logo">
          <img src="icon1.png" alt="ElectRevise"  />
        </div>

        <div className="nav-right">
          <div className="nav-tag">
            Voter Record Management Platform
          </div>

          <Link
            to="/Admin"
            className="admin-btn"
          >
            Admin Panel →
          </Link>
        </div>
      </nav>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="gov-badge">
            <span
              key={badgeIndex}
              className="badge-slide"
            >
              {badgeTexts[badgeIndex]}
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-typing">
              {heroText}
            </span>
          </h1>
          <p>
            ElectRevise is a collaborative voter record
            management platform designed to support
            SIR verification, home-to-home survey review,
            booth assignment workflows, and completion
            tracking across administrative levels.
          </p>
          <div className="vision">
            <h3>Vision</h3>
            <p>
              Build a structured, transparent and scalable
              ecosystem for voter verification where
              administrators and survey teams can
              coordinate effectively and review every
              stage of the process.
            </p>
          </div>

          <div className="feature-grid">

            <div className="feature-card">
              🪷 SIR Verification
            </div>

            <div className="feature-card">
              🏠 Home to Home Survey
            </div>

            <div className="feature-card">
              🗳 Booth Management
            </div>

            <div className="feature-card">
              📋 Completion Review
            </div>

          </div>

        </div>

        {/* LOGIN */}
        <div id="home-wrapper">

          <div className="demo-box">

            <h4>Demo Login</h4>
              <p>
              Mobile:
                <strong>
                9876500266 (After uploading the sample sheets from Admin panel)
                </strong>
              </p>
              <p>
              OTP:
                <strong>
                1111
                </strong>
              </p>
            <hr />
              <p>
              Admin Passcode:
                <strong>
                2025
                </strong>
              </p>
            </div>

          <h2>Portal Login</h2>

          <p className="login-sub">
            Continue using mobile verification
          </p>

          <label>Enter Mobile Number</label>

          <input
            type="tel"
            placeholder="Enter your 10 digit number"
            ref={numberRef}
            maxLength="10"
          />

          <button
            className="access-btn"
            onClick={handleAccess}
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>

        </div>

      </section>

      {/* ADMIN */}
      <section className="portal-section">

        <h2>Admin Capabilities</h2>

        <div className="portal-grid">

          <div>📊 Download Reports</div>
          <div>📤 Excel Upload Workflow</div>
          <div>📋 Jilla Assignment</div>
          <div>🗳 Booth Allocation</div>
          <div>⚙ Voter Management</div>
          <div>📄 Completion Dashboard</div>
          <div>📁 SIR Processing</div>
          <div>🔐 Jilla Login Control</div>

        </div>

      </section>

      {/* USER */}
      <section className="portal-section">

        <h2>User Functionalities</h2>

        <div className="portal-grid">

          <div>📋 Assigned Booth Details</div>

          <div>
            Voter Data Collection
          </div>

          <div>
            SIR Based Verification
          </div>

          <div>
            Family Distribution View
          </div>

        </div>

      </section>

<footer className="dev-section">

<div className="dev-title">

<span>
Built Collaboratively
</span>

<h2>
Meet The Developers
</h2>

<p>
Designed and developed for ElectRevise —
building structured voter verification and
survey management experiences.
</p>

</div>

<div className="dev-grid">

<div className="dev-card">

<div className="dev-header">

<div className="dev-avatar">
YD
</div>

<div>

<h3>
Yatharth Dubey
</h3>

</div>

</div>

<div className="dev-links">

<a
href="https://github.com/Yatharth-Dubey"
target="_blank"
rel="noreferrer"

>

GitHub </a>

<a
href="https://www.linkedin.com/in/yatharth-dubey-34a532316"
target="_blank"
rel="noreferrer"

>

LinkedIn </a>

<a
href="https://yatharthdubey.vercel.app/"
target="_blank"
rel="noreferrer"

>

Portfolio </a>

</div>

</div>

<div className="dev-card">

<div className="dev-header">

<div className="dev-avatar">
SD
</div>

<div>

<h3>
Sachin Diwakar
</h3>
</div>

</div>

<div className="dev-links">

<a
href="https://github.com/sachindiwakar35"
target="_blank"
rel="noreferrer"

>

GitHub </a>

<a
href="https://www.linkedin.com/in/sachin-diwakar-604aa5338"
target="_blank"
rel="noreferrer"

>

LinkedIn </a>

<a
href="https://sachin-portfolio-plum.vercel.app/"
target="_blank"
rel="noreferrer"

>

Portfolio </a>

</div>

</div>

</div>

</footer>


      {/* OTP */}

      {showOTP && (
        <div className="otp-popup">

          <div className="otp-box">

            <h3>Enter OTP</h3>

            <input
              type="number"
              ref={otpRef}
              className="otp-input"
              placeholder="4 Digit OTP"
            />

            <div className="otp-actions">

              <button
                onClick={handleVerifyOTP}
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

              <button
                onClick={() =>
                  setShowOTP(false)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};