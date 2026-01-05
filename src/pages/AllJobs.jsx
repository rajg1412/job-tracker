import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import JobCard from '../components/JobCard';
import { Search, Filter } from 'lucide-react';
import './AllJobs.css';

const AllJobs = () => {
  const { jobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="section-card">
          <h1 className="page-title">All Job Applications</h1>

          <div className="filters-container">
            <div className="filter-input-wrapper">
              <Search className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-input-wrapper">
              <Filter className="input-icon" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-input filter-select"
              >
                <option>All</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="results-count">
            Showing {filteredJobs.length} of {jobs.length} applications
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="section-card">
            <div className="empty-state">
              <p className="empty-text">No applications found</p>
            </div>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;