import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;

  if (!result) return <h2>No Result Found</h2>;

  return (
    <div className="result-card">
      <h1>🎉 Quiz Result</h1>

      <h2>
        Score: {result.score} / {result.total}
      </h2>

      <hr />

      {result.review.map((q, i) => (
        <div
          key={i}
          style={{
            background: q.isCorrect ? "#e7f9ed" : "#ffecec",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "10px",
          }}
        >
          <h3>
            {i + 1}. {q.question}
          </h3>

          <p>
            <b>Your Answer:</b> {q.selected || "Not Answered"}
          </p>

          <p>
            <b>Correct Answer:</b> {q.correct}
          </p>

          <p>
            <b>Status:</b> {q.isCorrect ? "✅ Correct" : "❌ Wrong"}
          </p>

          {/* ONLY show explanation for wrong answers */}
          {!q.isCorrect && (
            <p>
              <b>Explanation:</b> {q.explanation}
            </p>
          )}
        </div>
      ))}

      <button onClick={() => navigate("/")}>➕ Generate New Quiz</button>
    </div>
  );
}

export default ResultPage;
