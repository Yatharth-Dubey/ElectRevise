import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VoterMerge.css";

export default function SettingSir() {
  const [selectedOption, setSelectedOption] = useState("");
  const [jillaList, setJillaList] = useState([]);
  // Separate state variables for each section
  const [vidhanSabhaListForMerge, setVidhanSabhaListForMerge] = useState([]);
  const [pollingStationListForMerge, setPollingStationListForMerge] = useState([]);
  const [vidhanSabhaListForUF, setVidhanSabhaListForUF] = useState([]);
  const [pollingStationListForUF, setPollingStationListForUF] = useState([]);
  
  const [boothNumber, setBoothNumber] = useState("");
  const [loading, setLoading] = useState(false);
  
  // DELETE SECTION STATE (New - like Insert.jsx)
  const [voterTables, setVoterTables] = useState([]);
  const [selectedDeleteTable, setSelectedDeleteTable] = useState("");
  const [pollingStationsForDelete, setPollingStationsForDelete] = useState([]);
  const [selectedDeletePollingStation, setSelectedDeletePollingStation] = useState("");
  
  const [dropdownValues, setDropdownValues] = useState({
    jilla1: "", jilla2: "",
    vidhan1: "", vidhan2: "",
    polling1: "", polling2: "",
  });
  const [updateFinalValues, setUpdateFinalValues] = useState({
    type: "",
    jillaUF: "", 
    vidhanUF: "", 
    pollingUF: ""
  });

  // Fetch Jilla list on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/getJillaList`)
      .then((res) => {
        const jillaValues = res.data.map(item => item.jilla);
        setJillaList(jillaValues);
      })
      .catch((err) => console.error("Error fetching Jilla:", err));
    setLoading(false);
  }, []);

  // Fetch voter tables for DELETE section (like Insert.jsx)
  useEffect(() => {
    const fetchVoterTables = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllSirTables`);
        if (res.data.status) {
            console.log(res.data.data);
          setVoterTables(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching voter tables:", err);
      }
    };
    fetchVoterTables();
  }, []);

  // Fetch polling stations when table is selected (for DELETE section)
  useEffect(() => {
    const fetchPollingStations = async () => {
      if (!selectedDeleteTable) {
        setPollingStationsForDelete([]);
        setSelectedDeletePollingStation("");
        return;
      }
      
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/getAllPollingStations?table=${selectedDeleteTable}`
        );
        if (res.data.status) {
          setPollingStationsForDelete(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching polling stations for delete:", err);
        setPollingStationsForDelete([]);
      }
    };
    
    fetchPollingStations();
  }, [selectedDeleteTable]);

  // Rest of your existing useEffect hooks...
  // Fetch Vidhan Sabha for MERGE section
  useEffect(() => {
    setLoading(true);
    if (dropdownValues.jilla1) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/getVidhansabhaList`, {
          params: { jilla: dropdownValues.jilla1 },
        })
        .then((res) => {
          const vidhanValues = res.data.map(item => item.vidhansabha);
          setVidhanSabhaListForMerge(vidhanValues);
        })
        .catch((err) => console.error("Error fetching Vidhan Sabha for Merge:", err));
    } else {
      setVidhanSabhaListForMerge([]);
      setPollingStationListForMerge([]);
    }
    setLoading(false);
  }, [dropdownValues.jilla1]);

  // Fetch Polling Station for MERGE section
  useEffect(() => {
    setLoading(true);
    if (dropdownValues.jilla1 && dropdownValues.vidhan1) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/getPollingStations`, {
          params: {
            jilla: dropdownValues.jilla1,
            vidhansabha: dropdownValues.vidhan1,
          },
        })
        .then((res) => {
          setPollingStationListForMerge(res.data);
        })
        .catch((err) => {
          console.error("Error fetching Polling Station for Merge:", err);
          setPollingStationListForMerge([]);
        });
    } else {
      setPollingStationListForMerge([]);
    }
    setLoading(false);
  }, [dropdownValues.jilla1, dropdownValues.vidhan1]);

  // Fetch Vidhan Sabha for UPDATE FINAL section
  useEffect(() => {
    setLoading(true);
    if (updateFinalValues.jillaUF) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/getVidhansabhaList`, {
          params: { jilla: updateFinalValues.jillaUF }
        })
        .then((res) => {
          const vidhanValues = res.data.map(item => item.vidhansabha);
          setVidhanSabhaListForUF(vidhanValues);
        })
        .catch((err) => console.error("UF Vidhan Sabha Error:", err));
    } else {
      setVidhanSabhaListForUF([]);
      setUpdateFinalValues(prev => ({ ...prev, vidhanUF: "", pollingUF: "" }));
    }
    setLoading(false);
  }, [updateFinalValues.jillaUF]);

  // Fetch Polling Station for UPDATE FINAL section
  useEffect(() => {
    setLoading(true);
    if (updateFinalValues.jillaUF && updateFinalValues.vidhanUF) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/getSirPollingStations`, {
          params: {
            jilla: updateFinalValues.jillaUF,
            vidhansabha: updateFinalValues.vidhanUF,
          },
        })
        .then((res) => {
          setPollingStationListForUF(res.data);
        })
        .catch((err) => {
          console.error("UF Polling Station Error:", err);
          setPollingStationListForUF([]);
        });
    } else {
      setPollingStationListForUF([]);
      setUpdateFinalValues(prev => ({ ...prev, pollingUF: "" }));
    }
    setLoading(false);
  }, [updateFinalValues.jillaUF, updateFinalValues.vidhanUF]);

  // Reset dependent dropdowns when jilla changes for MERGE
  const handleChange = (field, value) => {
    setDropdownValues((prev) => {
      const newValues = { ...prev, [field]: value };
      // Reset dependent dropdowns
      if (field === "jilla1") {
        newValues.vidhan1 = "";
        newValues.vidhan2 = "";
        newValues.polling1 = "";
        newValues.polling2 = "";
      } else if (field === "vidhan1") {
        newValues.polling1 = "";
        newValues.polling2 = "";
      }
      return newValues;
    });
  };

  const handleUFChange = (field, value) => {
    setUpdateFinalValues((prev) => {
      const newValues = { ...prev, [field]: value };  
      // Reset dependent dropdowns
      if (field === "jillaUF") {
        newValues.vidhanUF = "";
        newValues.pollingUF = "";
      } else if (field === "vidhanUF") {
        newValues.pollingUF = "";
      }
      return newValues;
    });
  };

  const handleMerge = async () => {
    try {
      let type = selectedOption;
      let fromValue, toValue;
      let jilla, vidhansabha;
      if (type === "jilla") {
        fromValue = dropdownValues.jilla1;
        toValue = dropdownValues.jilla2;
      } else if (type === "vidhansabha") {
        fromValue = dropdownValues.vidhan1;
        toValue = dropdownValues.vidhan2;
        jilla = dropdownValues.jilla1;
      } else if (type === "pollingstation") {
        fromValue = dropdownValues.polling1;
        toValue = dropdownValues.polling2;
        jilla = dropdownValues.jilla1;
        vidhansabha = dropdownValues.vidhan1;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/sirmergedata`, {
        type,
        fromValue,
        toValue,
        jilla,
        vidhansabha,
        boothNumber: type === "pollingstation" ? boothNumber : undefined, // Add booth number
      });  
      alert(`✅ ${response.data.message}\nRows Updated: ${response.data.rowsAffected}`);
      window.location.reload();
    } catch (err) {
      console.error("Merge Error:", err);
      if (err.response?.data?.error) {
        alert(`❌ ${err.response.data.error}`);
      } else {
        alert("❌ Merge failed. Please try again.");
      }
    }
  };

  // NEW: Handle Delete Data
  const handleDeleteData = async () => {
    if (!selectedDeleteTable) {
      alert("⚠️ Please select a Voter Table!");
      return;
    }

    const confirmMessage = selectedDeletePollingStation 
      ? `Delete Polling Station data?\n\nTable: ${selectedDeleteTable}\nPolling Station: ${selectedDeletePollingStation}\n\nThis will delete ONLY this polling station's data.`
      : `Delete ENTIRE Voter Table?\n\nTable: ${selectedDeleteTable}\n\n⚠️ WARNING: This will delete ALL data in this table!`;

    if (!window.confirm(confirmMessage)) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/deletevoterdata`,
        {
          type: selectedDeletePollingStation ? "delete_polling_station" : "delete_entire_table",
          voter_table: selectedDeleteTable,
          polling_station: selectedDeletePollingStation || undefined,
        }
      );
      alert(`✅ ${res.data.message}`);
      window.location.reload();
    } catch (err) {
      console.error("Delete Error:", err);
      if (err.response?.data?.error) {
        alert(`❌ ${err.response.data.error}`);
      } else {
        alert("❌ Failed to delete data.");
      }
    }
  };

  const renderDropdownOrInput = (value, setValue, options, isEditable = true) => {
    if (isEditable) {
      return (
        <div className="editable-dropdown-container">
          <input
            list={`datalist-${options.join('').replace(/\s+/g, '')}`}
            className="merge-input editable-dropdown"
            placeholder="Select or type new value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <datalist id={`datalist-${options.join('').replace(/\s+/g, '')}`}>
            <option value="">Select existing</option>
            {options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </datalist>
        </div>
      );
    }
    const hasEmptyOption = options.includes("");
    if (hasEmptyOption) {
      return (
        <input
          type="text"
          className="merge-input"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    }
    return (
      <select
        className="styled-dropdown"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">Select</option>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div>
      {/* Merge Section */}
      <div className="voter-merge-container">
        <h2>🗳 वोटर डेटा मर्ज विकल्प</h2>
        <div className="radio-group">
          {[
            { id: "jilla", label: "जिला मर्ज" },
            { id: "vidhansabha", label: "विधानसभा मर्ज" },
            { id: "pollingstation", label: "पोलिंग स्टेशन मर्ज" },
          ].map((item) => (
            <label
              key={item.id}
              className={`radio-option ${selectedOption === item.id ? "active-radio" : ""}`}
            >
              <input
                type="radio"
                name="mergeType"
                value={item.id}
                checked={selectedOption === item.id}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="radio-label">{item.label}</span>
            </label>
          ))}
        </div>
        <div className="dropdown-section">
          {selectedOption === "jilla" && (
            <div className="merge-block">
              <h4>जिला मर्ज</h4>
              <div className="dropdown-group">
                {renderDropdownOrInput(
                  dropdownValues.jilla1,
                  (val) => handleChange("jilla1", val),
                  jillaList
                )}
                {renderDropdownOrInput(
                  dropdownValues.jilla2,
                  (val) => handleChange("jilla2", val),
                  jillaList
                )}
              </div>
            </div>
          )}
          {selectedOption === "vidhansabha" && (
            <div className="merge-block">
              <h4>विधानसभा मर्ज</h4>
              <div className="dropdown-group">
                {renderDropdownOrInput(
                  dropdownValues.jilla1,
                  (val) => handleChange("jilla1", val),
                  jillaList
                )}
                {renderDropdownOrInput(
                  dropdownValues.vidhan1,
                  (val) => handleChange("vidhan1", val),
                  vidhanSabhaListForMerge
                )}
                {renderDropdownOrInput(
                  dropdownValues.vidhan2,
                  (val) => handleChange("vidhan2", val),
                  vidhanSabhaListForMerge
                )}
              </div>
            </div>
          )}
          {selectedOption === "pollingstation" && (
            <div className="merge-block">
              <h4>पोलिंग स्टेशन मर्ज</h4>
              <div className="dropdown-group">
                {renderDropdownOrInput(
                  dropdownValues.jilla1,
                  (val) => handleChange("jilla1", val),
                  jillaList
                )}
                {renderDropdownOrInput(
                  dropdownValues.vidhan1,
                  (val) => handleChange("vidhan1", val),
                  vidhanSabhaListForMerge
                )}
                {renderDropdownOrInput(
                  dropdownValues.polling1,
                  (val) => handleChange("polling1", val),
                  pollingStationListForMerge
                )}
                {renderDropdownOrInput(
                  dropdownValues.polling2,
                  (val) => handleChange("polling2", val),
                  pollingStationListForMerge
                )}
                {/* Add Booth Number Input */}
                <div className="input-group">
                  <label className="input-label">Booth Number:</label>
                  <input
                    type="text"
                    className="merge-input"
                    placeholder="Enter booth number"
                    value={boothNumber}
                    onChange={(e) => setBoothNumber(e.target.value)}
                    maxLength={5}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {selectedOption && (
          <div className="merge-btn-container">
            <button
              className="merge-btn"
              disabled={
                (selectedOption === "jilla" &&
                  (!dropdownValues.jilla1 || !dropdownValues.jilla2)) ||
                (selectedOption === "vidhansabha" &&
                  (!dropdownValues.vidhan1 || !dropdownValues.vidhan2)) ||
                (selectedOption === "pollingstation" &&
                  (!dropdownValues.polling1 || !dropdownValues.polling2 || !boothNumber)) // Add booth number validation
              }
              onClick={handleMerge}
            >
              🔄 Merge Now
            </button>
          </div>
        )}
      </div>
      {/* NEW DELETE SECTION - Like Insert.jsx */}
      <div className="delete-voter-section">
        <h2>🗑️ मतदाता डेटा हटाएं</h2>
        <p className="section-description">
          Select a voter table to delete data. Optionally select a specific polling station.
        </p>
        
        <div className="dropdown-group" style={{ flexDirection: "column", gap: "20px" }}>
          {/* Voter Table Selection */}
          <div className="dropdown-item">
            <label>Select Voter Table:</label>
            <select
              value={selectedDeleteTable}
              onChange={(e) => {
                setSelectedDeleteTable(e.target.value);
                setSelectedDeletePollingStation(""); // Reset polling station
              }}
              className="styled-dropdown"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <option value="">-- Select Voter Table --</option>
              {voterTables.map((table, i) => (
                <option key={i} value={table.sir_voter_table_name}>
                  {table.sir_voter_table_name}
                </option>
              ))}
            </select>
          </div>
          {/* Polling Station Selection (Optional) */}
          <div className="dropdown-item">
            <label>Select Polling Station (Optional - Leave empty to delete entire table):</label>
            <select
              value={selectedDeletePollingStation}
              onChange={(e) => setSelectedDeletePollingStation(e.target.value)}
              className="styled-dropdown"
              style={{ width: "100%", maxWidth: "500px" }}
              disabled={!selectedDeleteTable}
            >
              <option value="">-- All Polling Stations (Delete Entire Table) --</option>
              {pollingStationsForDelete.map((station, i) => (
                <option key={i} value={station.polling_station}>
                  {station.polling_station}
                </option>
              ))}
            </select>
            <p className="helper-text">
              {selectedDeletePollingStation 
                ? `Only "${selectedDeletePollingStation}" will be deleted.`
                : "⚠️ Entire table will be deleted if no polling station is selected."}
            </p>
          </div>
        </div>

        <button
          className="delete-btn"
          onClick={handleDeleteData}
          disabled={!selectedDeleteTable}
          style={{ 
            backgroundColor: selectedDeletePollingStation ? "#ff9800" : "#f44336",
            marginTop: "20px"
          }}
        >
          🗑️ {selectedDeletePollingStation ? "Delete Polling Station" : "Delete Entire Table"}
        </button>
      </div>
    </div>
  );
}