import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function App() {
  console.log('OctoFit Tracker App initialized');
  console.log('API Base URL:', API_BASE_URL);
  console.log('Environment:', process.env.REACT_APP_CODESPACE_NAME ? 'Codespaces' : 'Local');

  return (
    <Router>
      <div className="App bg-dark text-light min-vh-100">
        {/* Vaporwave animated background */}
        <div className="vw-scene" aria-hidden="true">
          <div className="vw-sun"></div>
          <div className="vw-horizon"></div>
          <div className="vw-grid-wrap"><div className="vw-grid"></div></div>
          <div className="vw-scanlines"></div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fs-4 fw-bold" to="/">
              🐙 OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">🦸 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">👥 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">🏃 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container-fluid py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
        <footer className="container-fluid text-center text-muted py-3 mt-5">
          <small>OctoFit Tracker © 2026 | Connected to: {API_BASE_URL}</small>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-3 fw-bold mb-4">Welcome to OctoFit Tracker</h1>
      <p className="lead fs-4 mb-4">Track your fitness activities and compete with your team!</p>
      <div className="card bg-dark border-secondary mt-4">
        <div className="card-body">
          <h5 className="card-title">API Connection</h5>
          <p className="card-text">
            <small className="text-muted">Backend URL:</small><br />
            <code className="text-info">{API_BASE_URL}</code>
          </p>
          <p className="card-text">
            <small className="text-muted">Environment:</small><br />
            <span className="badge bg-success">
              {process.env.REACT_APP_CODESPACE_NAME ? 'GitHub Codespaces' : 'Local Development'}
            </span>
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-4 mb-3">
          <div className="card bg-dark border-primary h-100">
            <div className="card-body">
              <h5 className="card-title">🦸 Users</h5>
              <p className="card-text">View all registered users and their profiles</p>
              <Link to="/users" className="btn btn-primary">View Users</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-dark border-success h-100">
            <div className="card-body">
              <h5 className="card-title">👥 Teams</h5>
              <p className="card-text">Check out team rosters and memberships</p>
              <Link to="/teams" className="btn btn-success">View Teams</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-dark border-warning h-100">
            <div className="card-body">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">See who's leading the fitness challenge</p>
              <Link to="/leaderboard" className="btn btn-warning">View Leaderboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
