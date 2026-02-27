import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const endpoint = `${API_BASE_URL}/workouts/`;
      console.log('Fetching workouts from:', endpoint);
      
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-light">�️ Missions</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card bg-dark border-secondary h-100 text-light">
              <div className="card-body">
                <h5 className="card-title text-light">{workout.name}</h5>
                <p className="card-text text-light">{workout.description}</p>
                <p className="card-text text-light">
                  <small className="text-muted">Duration: {workout.duration}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p className="text-muted">No missions found.</p>}
    </div>
  );
}

export default Workouts;
