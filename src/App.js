import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Attendance from '../src/pages/Attendance';
import EngagementMonitor from './components/EngagementMonitor';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import Auth from './components/Auth';
import NavbarH from './components/Navbar-Home';
import Home from '../src/pages/Home';
import Monitoring from '../src/pages/Monitoring';
import Leaderboard from '../src/pages/Leaderboard'; // Import Leaderboard component

const App = () => {
  return (
    <Router>
      <div>
        <NavbarH />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/engagement" element={<EngagementMonitor />} />
          <Route path="/performance" element={<PerformanceAnalytics />} />
          <Route path="/monitor" element={<Monitoring />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
