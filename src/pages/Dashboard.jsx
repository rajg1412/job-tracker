import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/JobCard';
import { Plus, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { jobs, getStats } = useJobs();
  const navigate = useNavigate();
  const stats = getStats();

  const recentJobs = jobs.slice(-6).reverse();

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="welcome-section">
          <h1 className="page-title">Welcome Back! 👋</h1>
          <p className="page-subtitle">Track and manage your job applications efficiently</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card stat-applied">
            <div className="stat-value">{stats.applied}</div>
            <div className="stat-label">Applied</div>
          </div>
          <div className="stat-card stat-interview">
            <div className="stat-value">{stats.interview}</div>
            <div className="stat-label">Interviews</div>
          </div>
          <div className="stat-card stat-offer">
            <div className="stat-value">{stats.offer}</div>
            <div className="stat-label">Offers</div>
          </div>
          <div className="stat-card stat-rejected">
            <div className="stat-value">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <div className="section-title-wrapper">
              <TrendingUp className="section-icon" size={24} />
              <h2 className="section-title">Recent Applications</h2>
            </div>
            <button onClick={() => navigate('/add-job')} className="btn-primary">
              <Plus size={20} />
              Add New
            </button>
          </div>

          {recentJobs.length === 0 ? (
            <div className="empty-state">
              <p className="empty-text">No applications yet. Start adding your job applications!</p>
              <button onClick={() => navigate('/add-job')} className="btn-primary">
                <Plus size={20} />
                Add First Application
              </button>
            </div>
          ) : (
            <div className="jobs-grid">
              {recentJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;