const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "login_db"
});

db.connect((err) => {
    if (err) return console.log(err);
    console.log("MySQL Connected Successfully");
});

module.exports = db;