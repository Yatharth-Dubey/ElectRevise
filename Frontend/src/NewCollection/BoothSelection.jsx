import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BoothSelection.css";

export const BoothSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedLok, selectedVidhan } = location.state || {};

  const [stations, setStations] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState("");
  const [selectedStationData, setSelectedStationData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);

  // 🔴 LOGOUT FUNCTION
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear(); // ❗ If you want to keep cache, remove this line.
    navigate("/");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        let data;

        if (navigator.onLine) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/getMasterNew`,
            {
              params: { mobile_no: sessionStorage.getItem("mobileNumber") },
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          console.log("📥 Full API Response:", response.data);

          const station = response.data.data?.[0];

          if (station) {
            sessionStorage.setItem(
              "vidhansabha_name",
              station.vidhansabha || ""
            );
            sessionStorage.setItem(
              "vidhansabha_no",
              station.vidhansabha_no || ""
            );
            sessionStorage.setItem("booth_number", station.booth_number || "");
          }

          data = response.data.data || [];

          localStorage.setItem(
            `stations_${selectedLok}_${selectedVidhan}`,
            JSON.stringify(data)
          );
        } else {
          const cached = localStorage.getItem(
            `stations_${selectedLok}_${selectedVidhan}`
          );

          if (cached) data = JSON.parse(cached);
          else {
            alert("⚠ No internet and no cached data found.");
            return;
          }
        }

        setStations(data);
        console.log("📌 Stations Loaded:", data);

        if (data.length > 0) {
          setSelectedBooth(data[0].booth_number);
          setSelectedStationData(data[0]);
        }
      } catch (err) {
        console.error("❌ Frontend Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, [selectedLok, selectedVidhan]);

  useEffect(() => {
    if (selectedBooth && stations.length > 0) {
      const station = stations.find(
        (station) => station.booth_number === selectedBooth
      );
      setSelectedStationData(station || null);
    }
  }, [selectedBooth, stations]);

  const handleBoothChange = (event) => {
    setSelectedBooth(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedStationData || !selectedBooth) {
      alert("Please select a booth number");
      return;
    }

    navigate("/CompleteList", {
      state: {
        vidhansabha_no: selectedStationData.vidhansabha_no,
        booth_number: selectedStationData.booth_number,
        allotted_table_name: selectedStationData.allotted_table_name,
        allotted_newvoter_table_name:
          selectedStationData.allotted_newvoter_table_name,
      },
    });
  };
  const handleSir = () => {
    navigate("/Sir2025", {
      state: {
        vidhansabha_no: selectedStationData.vidhansabha_no,
        booth_number: selectedStationData.booth_number,
        allotted_table_name: selectedStationData.allotted_table_name,
        allotted_newvoter_table_name:
          selectedStationData.allotted_newvoter_table_name,
      },
    });
  };

  const handleViewFamilyList = () => {
    if (!selectedStationData || !selectedBooth) {
      alert("Please select a booth number");
      return;
    }

    navigate("/Dashbooth", {
      state: {
        vidhansabha_no: selectedStationData.vidhansabha_no,
        booth_number: selectedStationData.booth_number,
        vidhansabha_name: selectedStationData.vidhansabha,
        polling_station: selectedStationData.polling_station,
        allotted_table_name: selectedStationData.allotted_table_name,
        allotted_newvoter_table_name:
          selectedStationData.allotted_newvoter_table_name,
      },
    });
  };

  const uniqueBooths = [
    ...new Set(stations.map((station) => station.booth_number)),
  ];
  return (
    <div className="booth-selection-container">

      {/* 🔴 LOGOUT BUTTON */}
      <button className="logout-btn" onClick={handleLogout}>
        🔒 Logout
      </button>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2>📋 Assigned Booth Details</h2>

      {loading && <div className="loader">Loading booths...</div>}

      {!loading && stations.length > 0 && (
        <div className="booth-selector">
          <label htmlFor="booth-select">
            {stations.length > 1
              ? "Select Booth Number:"
              : "Your Booth Number:"}
          </label>
          <select
            id="booth-select"
            value={selectedBooth}
            onChange={handleBoothChange}
            className="booth-dropdown"
            required
          >
            <option value="">-- Select Booth Number --</option>
            {uniqueBooths.map((boothNumber) => (
              <option key={boothNumber} value={boothNumber}>
                Booth {boothNumber}
              </option>
            ))}
          </select>
          {!selectedBooth && (
            <p className="error-message">
              Please select a booth number to continue
            </p>
          )}
        </div>
      )}

      {!loading && selectedStationData && (
        <div className="data-list">
          <div className="data-card">
            <p>
              <strong>Jilla:</strong> {selectedStationData.jilla}
            </p>
            <p>
              <strong>Vidhansabha:</strong> {selectedStationData.vidhansabha}
            </p>
            <p>
              <strong>Vidhansabha No:</strong>{" "}
              {selectedStationData.vidhansabha_no}
            </p>
            <p>
              <strong>Worker Name:</strong> {selectedStationData.worker_name}
            </p>
            <p>
              <strong>Allotted Table:</strong>{" "}
              {selectedStationData.allotted_table_name}
            </p>
            <p>
              <strong>New Voter Table:</strong>{" "}
              {selectedStationData.allotted_newvoter_table_name}
            </p>
            <p>
              <strong>Position:</strong> {selectedStationData.position}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedStationData.mobile_no}
            </p>
          </div>
        </div>
      )}

      {!loading && stations.length > 0 && !selectedStationData && (
        <div className="no-booth-selected">
          <p>Please select a booth number above to view details</p>
        </div>
      )}

      {!loading && stations.length === 0 && <p>No booth data found.</p>}

      {loadingTable && <div className="loader">Loading booth details...</div>}

      <div className="button-group">
        <button
          onClick={handleSir}
          className="btn-sir"
        >
          SIR 2025
        </button>

        <button
          onClick={handleSubmit}
          className="btn-submit"
          disabled={!selectedStationData || !selectedBooth}
        >
          Submit
        </button>

        <button
          onClick={handleViewFamilyList}
          className="btn-secondary"
          disabled={!selectedStationData || !selectedBooth}
        >
          View Family List
        </button>
      </div>
    </div>
  );
};