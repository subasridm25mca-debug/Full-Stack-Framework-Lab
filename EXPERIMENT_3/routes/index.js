const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
    const books = await Book.find();
    res.render("index", { books });
});

router.get("/add", (req, res) => {
    res.render("add");
});

router.post("/add", async (req, res) => {
    await Book.create(req.body);
    res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render("edit", { book });
});

router.put("/edit/:id", async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

// Delete Book
router.delete("/delete/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;