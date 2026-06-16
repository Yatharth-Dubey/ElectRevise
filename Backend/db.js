const mysql = require("mysql2");
const data = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"YATdub147@",
    database:"bjtvotercollection",
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Use promises
const con = data.promise();
// Test connection
data.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ MySQL Pool Connected...");
    connection.release();
  }
});
module.exports = con;