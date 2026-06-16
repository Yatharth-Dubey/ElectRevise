import React, { useEffect, useState } from "react";
import axios from "axios";
import './CreateVidhanTable.css'

export default function CreateVidhanTable() {
  const [jillaList, setJillaList] = useState([]);
  const [vidhanList, setVidhanList] = useState([]);
  const [selectedJilla, setSelectedJilla] = useState("");
  const [selectedVidhan, setSelectedVidhan] = useState("");
  const [selectedVidhanNo, setSelectedVidhanNo] = useState("");
  const [tableName, setTableName] = useState("");
  const [sirTableName, setSirTableName] = useState("");
  const [message, setMessage] = useState("");
  const [sirMessage, setSirMessage] = useState("");
  
  useEffect(() => {
    fetchJilla();
  }, []);
  
  const fetchJilla = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getJillaList`);
    setJillaList(res.data);
  };
  
  const handleJillaChange = async (e) => {
    const selected = e.target.value;
    setSelectedJilla(selected);
    setSelectedVidhan("");
    setSelectedVidhanNo("");
    setTableName("");
    setSirTableName("");
    if (!selected) return;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/getVidhansabhaByJilla?jilla=${selected}`
    );
    setVidhanList(res.data);
  };
  
  function toUpperCaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleVidhanSelect = (value) => {
    const details = JSON.parse(value);
    setSelectedVidhan(details.vidhansabha);
    setSelectedVidhanNo(details.vidhansabha_no);
    // Auto-generate table name
    const autoName = toUpperCaseFirstLetter(
      `${selectedJilla}_${details.vidhansabha_no}`
        .replace(/\s+/g, "_")
        .replace(/[^\u0900-\u097FFA-Za-z0-9_]/g, "")
    );

    setTableName(autoName);
    // Auto-generate SIR table name with prefix
    const sirName = `sir_${autoName}`;
    setSirTableName(sirName);
  };
  
  const createTable = async () => {
    if (!selectedJilla || !selectedVidhan || !tableName) {
      return setMessage("⚠️ Please select Jilla and Vidhansabha.");
    }
    
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/createVidhanTables`, {
      jilla: selectedJilla,
      vidhansabha: selectedVidhan,
      vidhansabha_no: selectedVidhanNo,
      tableName,
    });
    setMessage(res.data.message);
  };
  
  const createSirTable = async () => {
    if (!selectedJilla || !selectedVidhan || !sirTableName) {
      return setSirMessage("⚠️ Please select Jilla and Vidhansabha.");
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/createSirTable`, {
        jilla: selectedJilla,
        vidhansabha: selectedVidhan,
        vidhansabha_no: selectedVidhanNo,
        tableName: sirTableName,
      });
      setSirMessage(res.data.message);
    } catch (error) {
      setSirMessage("Error: " + (error.response?.data?.message || error.message));
    }
  };
  
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Create Vidhansabha Table</h2> 
      {/* Common Selection Section */}
      <div className="selection-section" style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "5px" }}>
        <label>Jilla:</label>
        <select value={selectedJilla} onChange={handleJillaChange} className="form-control">
          <option value="">Select Jilla</option>
          {jillaList.map((item, i) => (
            <option key={i} value={item.jilla}>{item.jilla}</option>
          ))}
        </select>
        <br />
        <label>Vidhansabha:</label>
        <select
          value={selectedVidhan ? JSON.stringify({}) : ""}
          onChange={(e) => handleVidhanSelect(e.target.value)}
          className="form-control"
        >
          <option value="">Select Vidhansabha</option>
          {vidhanList.map((item, i) => (
            <option key={i} value={JSON.stringify(item)}>
              {item.vidhansabha} (No: {item.vidhansabha_no})
            </option>
          ))}
        </select>
        <br />
      </div>
      {/* Original Table Creation Section */}
      <div className="table-creation-section" style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
        <h4>Create Standard Voter Table</h4>
        <label>Generated Table Name:</label>
        <input type="text" className="form-control" value={tableName} readOnly />
        <br />
        <button onClick={createTable} className="btn btn-primary">
          Create Standard Table
        </button>
        {message && <p style={{ marginTop: "10px", fontWeight: "bold", color: "#0d6efd" }}>{message}</p>}
      </div>
      {/* SIR Table Creation Section */}
      <div className="sir-table-section" style={{ padding: "20px", border: "1px solid #28a745", borderRadius: "5px", backgroundColor: "#f0fff4" }}>
        <h4 style={{ color: "#28a745" }}>Add SIR Table</h4>
        <label>SIR Table Name (Auto-generated with prefix):</label>
        <input type="text" className="form-control" value={sirTableName} readOnly />
        <small style={{ color: "#666" }}>Table will be created with "sir_" prefix</small>
        <br /><br />
        <button onClick={createSirTable} className="btn btn-success">
          Create SIR Table
        </button>
        {sirMessage && <p style={{ marginTop: "10px", fontWeight: "bold", color: "#28a745" }}>{sirMessage}</p>}
      </div>
    </div>
  );
}