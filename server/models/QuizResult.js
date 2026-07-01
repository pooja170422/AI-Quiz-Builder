const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    review: [
      {
        question: String,

        selected: String,

        correct: String,

        explanation: String,

        isCorrect: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("QuizResult", QuizResultSchema);
