import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Pages.css';

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Development',
    skills: '',
    performanceScore: '',
    experience: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    return navigate('/login');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s);

      await employeeAPI.addEmployee({
        ...formData,
        skills: skillsArray,
        performanceScore: parseInt(formData.performanceScore),
        experience: parseInt(formData.experience),
      });

      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New Employee</h1>
      </div>

      <div className="card">
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form-large">
          <div className="form-row">
            <div className="form-group">
              <label>Employee Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., John Doe"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g., john@company.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department *</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                <option>Development</option>
                <option>HR</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Finance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Years of Experience *</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g., 3"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Performance Score (0-100) *</label>
              <input
                type="number"
                name="performanceScore"
                value={formData.performanceScore}
                onChange={handleChange}
                required
                min="0"
                max="100"
                placeholder="e.g., 85"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Skills (comma separated) *</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Adding Employee...' : 'Add Employee'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/employees')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
