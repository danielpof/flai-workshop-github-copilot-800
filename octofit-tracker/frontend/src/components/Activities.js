import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const endpoint = `${API_BASE_URL}/activities/`;
      console.log('Fetching activities from:', endpoint);
      
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-light">⚡ Exploits</h2>
      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover text-light">
          <thead>
            <tr>
              <th className="text-light">Hacker</th>
              <th className="text-light">Exploit Type</th>
              <th className="text-light">Duration</th>
              <th className="text-light">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="text-light">{activity.user}</td>
                <td className="text-light">{activity.activity_type}</td>
                <td className="text-light">{activity.duration}</td>
                <td className="text-light">{new Date(activity.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activities.length === 0 && <p className="text-muted">No exploits found.</p>}
    </div>
  );
}

export default Activities;
