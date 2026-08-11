const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Load questions from JSON file
const questions = JSON.parse(
    fs.readFileSync(path.join(__dirname, "questions.json"), "utf-8")
);

// Get available topics
app.get("/topics", (req, res) => {
    res.json(Object.keys(questions));
});

// Get questions based on selected topic
app.get("/questions/:topic", (req, res) => {
    const topic = req.params.topic;

    if (!questions[topic]) {
        return res.status(404).json({
            message: "Topic not found"
        });
    }

    // Send questions without correct answers
    const quizQuestions = questions[topic].map(q => ({
        question: q.question,
        options: q.options
    }));

    res.json(quizQuestions);
});

// Check answers and calculate score
app.post("/submit", (req, res) => {
    const { topic, answers } = req.body;

    if (!questions[topic]) {
        return res.status(404).json({
            message: "Topic not found"
        });
    }

    let score = 0;

    questions[topic].forEach((q, index) => {
        if (answers[index] === q.answer) {
            score++;
        }
    });

    res.json({
        score: score,
        total: questions[topic].length
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Quiz server running at http://localhost:${PORT}`);
});