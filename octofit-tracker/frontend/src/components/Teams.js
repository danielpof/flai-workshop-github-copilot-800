import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const endpoint = `${API_BASE_URL}/teams/`;
      console.log('Fetching teams from:', endpoint);
      
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-light">👥 Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div key={team.id} className="col-md-6 mb-3">
            <div className="card bg-dark border-secondary text-light">
              <div className="card-body">
                <h5 className="card-title text-light">{team.name}</h5>
                <p className="card-text text-light"><small className="text-muted">Members:</small></p>
                <ul className="list-group list-group-flush">
                  {Array.isArray(team.members) ? (
                    team.members.map((member, idx) => (
                      <li key={idx} className="list-group-item bg-dark text-light border-secondary">{member}</li>
                    ))
                  ) : (
                    JSON.parse(team.members || '[]').map((member, idx) => (
                      <li key={idx} className="list-group-item bg-dark text-light border-secondary">{member}</li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teams.length === 0 && <p className="text-muted">No teams found.</p>}
    </div>
  );
}

export default Teams;
