import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = `${API_BASE_URL}/users/`;
      console.log('Fetching users from:', endpoint);
      
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-light">🕵️ Hackers</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card bg-dark border-secondary text-light">
              <div className="card-body">
                <h5 className="card-title text-light">{user.name}</h5>
                <p className="card-text text-light">
                  <small className="text-muted">Email:</small><br />
                  <span className="text-info">{user.email}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {users.length === 0 && <p className="text-muted">No hackers found.</p>}
    </div>
  );
}

export default Users;
