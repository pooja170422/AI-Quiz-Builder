const { getWikipediaSummary } = require("../services/wikipediaService");
const { generateQuiz } = require("../services/groqService");
const QuizResult = require("../models/QuizResult");

exports.generateQuiz = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const summary = await getWikipediaSummary(topic);

    const quiz = await generateQuiz(topic, summary);

    res.json({
      success: true,
      quiz: {
        topic,
        questions: quiz.questions,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Quiz generation failed",
    });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { topic, questions, answers } = req.body;

    let score = 0;

    const review = questions.map((question, index) => {
      const selected = answers[index];

      const correct = question.correctAnswer;

      const isCorrect = selected === correct;

      if (isCorrect) score++;

      return {
        question: question.question,
        options: question.options, // Add this
        selected,
        correct,
        explanation: question.explanation,
        isCorrect,
      };
    });

    const result = await QuizResult.create({
      topic,
      score,
      total: questions.length,
      review,
    });

    res.json({
      success: true,
      score,
      total: questions.length,
      review,
      id: result._id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Submission Failed",
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await QuizResult.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};
