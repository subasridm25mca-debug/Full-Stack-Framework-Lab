const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: "signup_login_secret",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("public"));

app.post("/signup", async (req, res) => {
    const { fullname, username, email, mobile, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).send("Database Error");
        if (result.length) return res.send("Email already registered");

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users(fullname, username, email, mobile, password) VALUES(?,?,?,?,?)",
            [fullname, username, email, mobile, hashedPassword],
            (err) => {
                if (err) return res.status(500).send("Registration Failed");
                res.send("Registration Successful");
            }
        );
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).send("Database Error");
        if (!result.length) return res.send("Invalid Email or Password");

        const user = result[0];
        const check = await bcrypt.compare(password, user.password);

        if (!check) return res.send("Invalid Email or Password");

        req.session.user = user.id;
        res.cookie("username", user.fullname);
        res.send("Login Successful");
    });
});

app.get("/dashboard", (req, res) => {
    if (req.session.user)
        return res.send("Welcome " + req.cookies.username);

    res.send("Please Login First");
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.clearCookie("username");
    res.send("Logout Successful");
});

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});