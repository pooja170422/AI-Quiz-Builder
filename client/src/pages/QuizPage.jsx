import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function QuizPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const quiz = state?.quiz; 

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return <h2>No Quiz Found</h2>;

  const handleSubmit = async () => {
    if (submitted) return; // prevent double submit

    const res = await api.post("/quiz/submit", {
      topic: quiz.topic,
      questions: quiz.questions,
      answers,
    });

    setSubmitted(true);

    navigate("/result", {
      state: { result: res.data },
    });
  };

  return (
    <div className="quiz-container">
      <h1>{quiz.topic}</h1>

      {quiz.questions.map((q, index) => (
        <div key={index} className="question-card">
          <h3>
            Q{index + 1}. {q.question}
          </h3>

          <div className="options">
            {Object.entries(q.options).map(([key, value]) => (
              <label
                key={key}
                className={`option ${answers[index] === key ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={key}
                  checked={answers[index] === key}
                  disabled={submitted}
                  onChange={() =>
                    setAnswers({
                      ...answers,
                      [index]: key,
                    })
                  }
                />

                <span>
                  <b>{key}.</b> {value}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} disabled={submitted}>
        {submitted ? "Submitted" : "Submit Quiz"}
      </button>
    </div>
  );
}

export default QuizPage;
