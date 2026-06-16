const express = require("express");
const router = express.Router();
const con = require("../db");

router.post("/verifyJillaLogin", async (req, res) => {
  const { passkey } = req.body;
  if (!passkey)
    return res.status(400).json({ error: "Missing passkey" });
  try {
    const [rows] = await con.query(
      "SELECT jilla FROM jillaPasskey WHERE passkey = ?",
      [passkey]
    );
    if (rows.length === 0) {
      return res.json({ success: false,  error: "Invalid credentials" });
    }
    return res.json({ success: true, jilla: rows[0].jilla, message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;