import React from 'react';
import { useJobs } from '../context/JobContext';
import { TrendingUp, Target, Award, XCircle, Calendar } from 'lucide-react';
import './Statistics.css';

const Statistics = () => {
  const { jobs, getStats } = useJobs();
  const stats = getStats();

  const successRate = stats.total > 0 
    ? ((stats.offer / stats.total) * 100).toFixed(1) 
    : 0;

  const getMonthlyData = () => {
    const monthCounts = {};
    jobs.forEach(job => {
      const month = new Date(job.appliedDate).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    return Object.entries(monthCounts).slice(-6);
  };

  const monthlyData = getMonthlyData();

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="section-card">
          <h1 className="page-title">Statistics & Analytics</h1>
          <p className="page-subtitle">Track your job search progress</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <h3 className="metric-title">Total Applications</h3>
              <Target className="metric-icon" size={24} />
            </div>
            <div className="metric-value">{stats.total}</div>
            <p className="metric-subtitle">All time</p>
          </div>

          <div className="metric-card metric-success">
            <div className="metric-header">
              <h3 className="metric-title">Success Rate</h3>
              <TrendingUp className="metric-icon" size={24} />
            </div>
            <div className="metric-value">{successRate}%</div>
            <p className="metric-subtitle">{stats.offer} offers received</p>
          </div>

          <div className="metric-card metric-interview">
            <div className="metric-header">
              <h3 className="metric-title">Active Interviews</h3>
              <Award className="metric-icon" size={24} />
            </div>
            <div className="metric-value">{stats.interview}</div>
            <p className="metric-subtitle">In progress</p>
          </div>

          <div className="metric-card metric-response">
            <div className="metric-header">
              <h3 className="metric-title">Response Rate</h3>
              <XCircle className="metric-icon" size={24} />
            </div>
            <div className="metric-value">
              {stats.total > 0 ? ((1 - stats.rejected / stats.total) * 100).toFixed(0) : 0}%
            </div>
            <p className="metric-subtitle">{stats.rejected} rejections</p>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Application Status Breakdown</h2>
          
          <div className="progress-list">
            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Applied</span>
                <span className="progress-value progress-applied">{stats.applied}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar progress-bar-applied"
                  style={{ width: `${stats.total > 0 ? (stats.applied / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Interview</span>
                <span className="progress-value progress-interview">{stats.interview}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar progress-bar-interview"
                  style={{ width: `${stats.total > 0 ? (stats.interview / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Offer</span>
                <span className="progress-value progress-offer">{stats.offer}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar progress-bar-offer"
                  style={{ width: `${stats.total > 0 ? (stats.offer / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span className="progress-label">Rejected</span>
                <span className="progress-value progress-rejected">{stats.rejected}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar progress-bar-rejected"
                  style={{ width: `${stats.total > 0 ? (stats.rejected / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {monthlyData.length > 0 && (
          <div className="section-card">
            <div className="section-title-wrapper">
              <Calendar className="section-icon" size={24} />
              <h2 className="section-title">Monthly Applications</h2>
            </div>
            
            <div className="progress-list">
              {monthlyData.map(([month, count]) => (
                <div key={month} className="progress-item">
                  <div className="progress-header">
                    <span className="progress-label">{month}</span>
                    <span className="progress-value progress-monthly">{count} applications</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar progress-bar-monthly"
                      style={{ 
                        width: `${Math.max((count / Math.max(...monthlyData.map(d => d[1]))) * 100, 5)}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;