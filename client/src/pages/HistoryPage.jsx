import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/quiz/history");
        setHistory(res.data.history);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h1>📚 Quiz History</h1>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        history.map((h) => (
          <div key={h._id} className="history-card">
            <h3>{h.topic}</h3>
            <p>
              Score: {h.score} / {h.total}
            </p>
          </div>
        ))
      )}

      <button onClick={() => navigate("/")}>➕ Generate New Quiz</button>
    </div>
  );
}

export default HistoryPage;
