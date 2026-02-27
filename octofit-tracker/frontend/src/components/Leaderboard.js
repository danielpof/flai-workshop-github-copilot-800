import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const endpoint = `${API_BASE_URL}/leaderboard/`;
      console.log('Fetching leaderboard from:', endpoint);
      
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-light">�‍☠️ Hall of Fame</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card bg-dark border-secondary text-light">
            <div className="card-body">
              <div className="list-group list-group-flush">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className="list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold me-3">{getMedalEmoji(index)}</span>
                    <span className="flex-grow-1 fs-5">{entry.user}</span>
                    <span className="badge bg-primary rounded-pill fs-6">{entry.score} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {leaderboard.length === 0 && <p className="text-muted">No hackers ranked yet.</p>}
    </div>
  );
}

export default Leaderboard;
