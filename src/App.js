import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './context/JobContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import AllJobs from './pages/AllJobs';
import Statistics from './pages/Statistics';
import './App.css';

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/all-jobs" element={<AllJobs />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;