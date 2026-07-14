const express = require("express");
const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

app.engine("hbs", exphbs.engine({
    extname: ".hbs"
}));

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const filePath = "./requests.json";

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/submit", (req, res) => {

    let requests = [];

    if (fs.existsSync(filePath)) {
        requests = JSON.parse(fs.readFileSync(filePath));
    }

    requests.push(req.body);

    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

    res.redirect("/requests");
});

app.get("/requests", (req, res) => {

    let requests = [];

    if (fs.existsSync(filePath)) {
        requests = JSON.parse(fs.readFileSync(filePath));
    }

    res.render("requests", { requests });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});