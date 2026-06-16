import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./Upload.css";

export const UploadSir = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [savedFileNames, setSavedFileNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  /** Load SIR tables & saved filenames */
  useEffect(() => {
    loadSirTables();
    const savedNames = sessionStorage.getItem("uploadedSirFileNames");
    if (savedNames) setSavedFileNames(JSON.parse(savedNames));
  }, []);

  /** Fetch DB SIR table names */
  const loadSirTables = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllSirTables`);
      
      if (res.data.status && res.data.data) {
        setTables(res.data.data || []);
      } else {
        console.error("Unexpected response structure:", res.data);
        setTables([]);
      }
    } catch (err) {
      console.error("Failed to load SIR tables:", err);
      setTables([]);
    } finally {
      setLoading(false);
    }
  };

  /** Clean string (same as regular Upload component) */
  const cleanString = (text) => {
    if (!text) return "";
    let cleaned = text.toString();

    if (cleaned.includes(":")) {
      cleaned = cleaned.split(":").slice(1).join(":");
    }
    cleaned = cleaned.replace(/^न्‍\s*/g, "");
    cleaned = cleaned.replace(/\s*न्‍$/g, "");
    cleaned = cleaned.replace(/\s+/g, " ");
    cleaned = cleaned.replace(/[\n\r\t]+/g, "");
    return cleaned.trim();
  };

  /** Normalize column header */
  const normalizeColumnName = (name) => {
    return name.toString().trim().toLowerCase().replace(/\s+/g, "_");
  };

  /** Extract first number from text */
  const extractFirstNumber = (t) => {
    if (!t) return null;
    const converted = t.toString().replace(/[०-९]/g, (d) => 
      "०१२३४५६७८९".indexOf(d)
    );
    const m = converted.match(/^\s*(\d+)\s*-?/);
    return m ? parseInt(m[1]) : null;
  };

  /** Save selected files */
  const handleFileChange = (e) => {
    if (loading || uploading) return;
    const selectedFilesArr = Array.from(e.target.files);
    if (selectedFilesArr.length > 101) {
      setMessage("⚠️ You can upload up to 100 Excel files at once.");
      return;
    }
    setFiles(selectedFilesArr);
    const newFileNames = selectedFilesArr.map((f) => f.name);
    const oldNames = JSON.parse(sessionStorage.getItem("uploadedSirFileNames") || "[]");
    const combined = [...oldNames, ...newFileNames];
    sessionStorage.setItem("uploadedSirFileNames", JSON.stringify(combined));
    setSavedFileNames(combined);
  };

  /** Clear buffer list */
  const handleClearFiles = () => {
    if (loading || uploading) return;
    sessionStorage.removeItem("uploadedSirFileNames");
    setSavedFileNames([]);
    setFiles([]);
    setMessage("🗑️ File list cleared.");
  };

  /** Map normalized Excel columns to SIR database columns */
  const mapExcelToDbColumns = (normalizedRow) => {
    // SIR database column mappings
    const columnMapping = {
      // Excel normalized name -> SIR database column name
      'number': 'number',
      'sr_no': 'number',
      's_no': 'number',
      'serial_no': 'number',
      'sir_number': 'number',
      'id': 'id',
      'voter_id': 'id',
      'voterid': 'id',
      'name': 'name',
      'voter_name': 'name',
      'father': 'father',
      'father_name': 'father',
      'house': 'house',
      'house_no': 'house',
      'house_number': 'house',
      'age': 'age',
      'gender': 'gender',
      'sex': 'gender',
      'polling_station': 'polling_station',
      'station': 'polling_station',
      'booth': 'polling_station',
      'station_address': 'station_address',
      'address': 'station_address',
      'kintype': 'kinType',
      'relation': 'kinType',
      'year': 'year',
      'date1': 'date1',
      'registration_date': 'date1',
      'date': 'date1',
      'date2': 'date2',
      'add1': 'add1',
      'address1': 'add1',
      'add2': 'add2',
      'address2': 'add2',
      'postcode': 'postcode',
      'pincode': 'postcode',
      'pin': 'postcode',
      'status': 'status',
      'family_id': 'family_id',
      'family': 'family_id',
      'booth_number': 'booth_number',
      'booth_no': 'booth_number',
      'add1_number': 'add1_number',
      'add2_number': 'add2_number',
      'jilla': 'jilla',
      'district': 'jilla'
    };

    // Map to SIR database structure
    const dbRow = {};
    
    // Map known columns
    Object.keys(columnMapping).forEach(excelCol => {
      if (normalizedRow[excelCol] !== undefined) {
        dbRow[columnMapping[excelCol]] = normalizedRow[excelCol];
      }
    });

    // Special handling for SIR number extraction
    if (!dbRow.number && normalizedRow.sir_number) {
      dbRow.number = extractFirstNumber(normalizedRow.sir_number) || 0;
    }

    // Ensure jilla is set
    if (!dbRow.jilla) {
      dbRow.jilla = "";
    }

    // Copy the extracted numbers (already done in the main processing)
    if (normalizedRow.booth_number !== undefined) {
      dbRow.booth_number = normalizedRow.booth_number;
    }
    if (normalizedRow.add1_number !== undefined) {
      dbRow.add1_number = normalizedRow.add1_number;
    }
    if (normalizedRow.add2_number !== undefined) {
      dbRow.add2_number = normalizedRow.add2_number;
    }

    return dbRow;
  };

  /** MAIN UPLOAD for SIR data - EXACT SAME PATTERN AS REGULAR UPLOAD */
  const handleUpload = async () => {
    if (!selectedTable) {
      setMessage("⚠️ Select a target SIR table first.");
      return;
    }
    if (!files.length) {
      setMessage("⚠️ Select at least one Excel file.");
      return;
    }
    
    setUploading(true);
    setMessage("⏳ Reading & cleaning SIR Excel files...");
    
    let finalAllRows = [];
    
    /** PROCESS ALL FILES - EXACT SAME PATTERN AS REGULAR UPLOAD */
    for (let f of files) {
      try {
        const data = await f.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);
        
        rows.forEach((row) => {
          // STEP 1: First normalize ALL columns and clean ALL values (EXACT SAME)
          let cleanRow = {};
          for (const key in row) {
            const newKey = normalizeColumnName(key);
            cleanRow[newKey] = cleanString(row[key]);
          }
          
          // STEP 2: Additional cleaning on specific fields (EXACT SAME)
          cleanRow.add1 = cleanString(cleanRow.add1);
          cleanRow.add2 = cleanString(cleanRow.add2);
          cleanRow.polling_station = cleanString(cleanRow.polling_station);
          cleanRow.station_address = cleanString(cleanRow.station_address);
          
          // STEP 3: Extract numbers from specific fields (EXACT SAME)
          cleanRow.booth_number = extractFirstNumber(cleanRow.polling_station) || 0;
          cleanRow.add1_number = extractFirstNumber(cleanRow.add1) || 0;
          cleanRow.add2_number = extractFirstNumber(cleanRow.add2) || 0;
          
          // STEP 4: Now map to SIR database columns (SIR-SPECIFIC PART)
          const mappedRow = mapExcelToDbColumns(cleanRow);
          
          // Only add if we have essential data
          if (mappedRow.id || mappedRow.name || mappedRow.number) {
            finalAllRows.push(mappedRow);
          }
        });
        
        console.log(`Processed ${rows.length} rows from ${f.name}`);
      } catch (error) {
        console.error(`Error processing file ${f.name}:`, error);
      }
    }
    
    console.log(`Total rows to upload: ${finalAllRows.length}`);
    
    /** SEND CLEAN JSON TO BACKEND for SIR tables */
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/uploadCleanToSelectedTable`,
        {
          tableName: selectedTable,
          rows: finalAllRows,
        }
      );
      setMessage(`✅ ${response.data.message} (${finalAllRows.length} records)`);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      setMessage(`❌ SIR Upload failed: ${error.response?.data?.message || error.message}`);
    }
    
    setUploading(false);
  };

  return (
    <div className="bjp-card">
      <h2 className="bjp-badge">📤 Upload SIR Excel Files</h2>
      
      {/* Loading Overlay */}
      {(loading || uploading) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">
            {loading ? "Loading SIR Tables..." : "Uploading SIR Data..."}
          </p>
        </div>
      )}

      {/* Table dropdown */}
      <div>
        <label>Select Target SIR Table: </label>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="bjp-select"
          disabled={loading || uploading}
        >
          <option value="">-- Choose SIR Table --</option>
          {tables.map((t, i) => (
            <option key={i} value={t.sir_voter_table_name}>
              {t.sir_voter_table_name}
            </option>
          ))}
        </select>
      </div>

      <p style={{ color: "#ff8800" }}>You can upload up to 100 SIR Excel files at once.</p>

      <button 
        className="delete-button" 
        onClick={handleClearFiles} 
        disabled={loading || uploading}
      >
        🗑️ Clear Buffer List
      </button>

      <input 
        type="file" 
        accept=".xlsx,.xls" 
        multiple 
        onChange={handleFileChange} 
        disabled={loading || uploading}
      />

      <button 
        className="bjp-button" 
        onClick={handleUpload} 
        disabled={loading || uploading || !selectedTable || files.length === 0}
      >
        {uploading ? "⏳ Uploading SIR Data..." : "Upload SIR Data"}
      </button>

      {message && <p className="bjp-message">{message}</p>}

      {savedFileNames.length > 0 && (
        <div className="uploaded-file-list">
          <h4>📄 SIR Files Selected:</h4>
          <ul>{savedFileNames.map((n, i) => <li key={i}>{n}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default UploadSir;