const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect("mongodb+srv://user:Subasri123@cluster0.vzgjqnz.mongodb.net/?appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Model
const Post = require("./models/Post");

// Home Page - Display Posts
app.get("/", async (req, res) => {
    const posts = await Post.find();
    res.render("index", { posts });
});

// Admin Page
app.get("/admin", (req, res) => {
    res.render("admin");
});

// Add New Post
app.post("/add", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    await post.save();
    res.redirect("/");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});