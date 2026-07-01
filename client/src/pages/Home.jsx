import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateQuiz = async () => {
    if (!topic.trim()) return alert("Enter a topic");

    try {
      setLoading(true);

      const res = await api.post("/quiz/generate", {
        topic,
      });

      navigate("/quiz", {
        state: { quiz: res.data.quiz },
      });
    } catch (err) {
      console.log(err);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>🧠 AI Quiz Builder</h1>

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <h3>Generating AI Quiz...</h3>
          <p>Please wait...</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Enter topic (e.g. Photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <br />

      <button onClick={generateQuiz} disabled={loading}>
        Generate Quiz
      </button>

      <button onClick={() => navigate("/history")}>View History</button>
    </div>
  );
}

export default Home;
