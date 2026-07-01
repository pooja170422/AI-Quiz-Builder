const express = require("express");

const router = express.Router();

const {
    generateQuiz,
    submitQuiz,
    getHistory
} = require("../controllers/quizController");

router.post("/generate", generateQuiz);

router.post("/submit", submitQuiz);

router.get("/history", getHistory);

module.exports = router;