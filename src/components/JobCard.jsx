import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import './JobCard.css';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { deleteJob } = useJobs();

  const handleEdit = () => {
    navigate(`/add-job?edit=${job.id}`);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-info">
          <h3 className="job-position">{job.position}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        <span className={`status-badge status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>

      <div className="job-details">
        {job.location && (
          <div className="detail-item">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="detail-item">
            <DollarSign size={16} />
            <span>{job.salary}</span>
          </div>
        )}
        <div className="detail-item">
          <Calendar size={16} />
          <span>Applied: {new Date(job.appliedDate).toLocaleDateString()}</span>
        </div>
        {job.notes && (
          <p className="job-notes">{job.notes}</p>
        )}
      </div>

      <div className="job-actions">
        <button onClick={handleEdit} className="btn btn-edit">
          <Edit2 size={16} />
          Edit
        </button>
        <button onClick={() => deleteJob(job.id)} className="btn btn-delete">
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;