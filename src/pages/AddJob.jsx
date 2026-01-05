import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { Save, ArrowLeft } from 'lucide-react';
import './AddJob.css';

const AddJob = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { addJob, updateJob, getJobById } = useJobs();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    if (editId) {
      const job = getJobById(editId);
      if (job) {
        setFormData(job);
      }
    }
  }, [editId, getJobById]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position) {
      alert('Please fill in Company and Position fields');
      return;
    }

    if (editId) {
      updateJob(parseInt(editId), formData);
    } else {
      addJob(formData);
    }

    navigate('/all-jobs');
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <button onClick={() => navigate(-1)} className="back-button">
              <ArrowLeft size={24} />
            </button>
            <h1 className="form-title">
              {editId ? 'Edit Application' : 'Add New Application'}
            </h1>
          </div>

          <div className="form-content">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Google"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Frontend Developer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Salary Range</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., $80k - $100k"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Applied Date *</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="form-input form-textarea"
                placeholder="Add any additional notes about this application..."
              />
            </div>

            <div className="form-actions">
              <button onClick={() => navigate(-1)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSubmit} className="btn-primary">
                <Save size={20} />
                {editId ? 'Update' : 'Save'} Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;