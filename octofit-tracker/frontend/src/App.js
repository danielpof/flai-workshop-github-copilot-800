import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">🐙 OctoFit Tracker</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/users">Users</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/teams">Teams</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/leaderboard">Leaderboard</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="text-center">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your fitness activities and compete with your team!</p>
      <p>API Endpoint: {process.env.REACT_APP_API_URL || 'http://localhost:8000/api/'}</p>
    </div>
  );
}

function UsersList() {
  return <div><h2>Users</h2><p>Users list will be displayed here</p></div>;
}

function TeamsList() {
  return <div><h2>Teams</h2><p>Teams list will be displayed here</p></div>;
}

function Leaderboard() {
  return <div><h2>Leaderboard</h2><p>Leaderboard will be displayed here</p></div>;
}

export default App;
