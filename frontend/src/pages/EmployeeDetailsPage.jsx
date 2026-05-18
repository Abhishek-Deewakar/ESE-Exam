import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeAPI, aiAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Pages.css';

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [update, setUpdate] = useState({ performanceScore: '' });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const safeTokenRedirect = useMemo(() => {
    if (!token) navigate('/login');
  }, [token]);

  // eslint-disable-next-line no-unused-vars
  useEffect(() => {}, [safeTokenRedirect]);

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEmployee = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await employeeAPI.getEmployeeById(id);
      setEmployee(response.data.employee);
      setUpdate({ performanceScore: response.data.employee.performanceScore });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load employee');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePerformance = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const performanceScore = parseInt(update.performanceScore, 10);
      await employeeAPI.updateEmployee(id, {
        performanceScore,
      });
      await fetchEmployee();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update performance score');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const ok = confirm('Are you sure you want to delete this employee?');
    if (!ok) return;

    setError('');
    setLoading(true);

    try {
      await employeeAPI.deleteEmployee(id);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  const generateAI = async () => {
    setAiError('');
    setAiLoading(true);

    try {
      await aiAPI.getRecommendation(id);
      await fetchEmployee();
    } catch (err) {
      setAiError(err.response?.data?.message || 'Failed to generate AI recommendation');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Employee Details</h1>
        <button className="btn-secondary" onClick={() => navigate('/employees')}>
          Back to List
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && <p>Loading...</p>}

      {!loading && employee && (
        <div className="card">
          <div className="detail-section">
            <h2>{employee.name}</h2>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Department:</strong> {employee.department}
            </p>
            <p>
              <strong>Experience:</strong> {employee.experience} years
            </p>
            <p>
              <strong>Skills:</strong> {employee.skills?.join(', ') || '—'}
            </p>
            <p>
              <strong>Performance Score:</strong>
              <span className={`score ${employee.performanceScore > 80 ? 'high' : 'medium'}`}>
                {' '}
                {employee.performanceScore}
              </span>
            </p>
          </div>

          <hr />

          <div className="detail-section">
            <h3>Update Performance Score</h3>
            <form onSubmit={handleUpdatePerformance} className="form-small">
              <label>New Performance Score (0-100) *</label>
              <input
                type="number"
                min="0"
                max="100"
                value={update.performanceScore}
                onChange={(e) => setUpdate({ performanceScore: e.target.value })}
                required
              />
              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  Save
                </button>
              </div>
            </form>
          </div>

          <hr />

          <div className="detail-section">
            <h3>AI Recommendation</h3>

            {aiError && <div className="error-message">{aiError}</div>}

            <button className="btn-primary" onClick={generateAI} disabled={aiLoading}>
              {aiLoading ? 'Generating...' : 'Generate AI Recommendation'}
            </button>

            {employee.aiRecommendations ? (
              <div className="recommendation-details" style={{ marginTop: 16 }}>
                <div className="detail-section">
                  <h4>Promotion Recommendation</h4>
                  <p>{employee.aiRecommendations.promotionSuggestion || '—'}</p>
                </div>

                <div className="detail-section">
                  <h4>Training Suggestions</h4>
                  {employee.aiRecommendations.trainingSuggestions?.length ? (
                    <ul>
                      {employee.aiRecommendations.trainingSuggestions.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>—</p>
                  )}
                </div>

                <div className="detail-section">
                  <h4>Skill Gaps</h4>
                  {employee.aiRecommendations.skillGaps?.length ? (
                    <ul>
                      {employee.aiRecommendations.skillGaps.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>—</p>
                  )}
                </div>

                <div className="detail-section">
                  <h4>Feedback</h4>
                  <p>{employee.aiRecommendations.feedback || '—'}</p>
                </div>

                <p className="muted">
                  Generated at:{' '}
                  {employee.aiRecommendations.generatedAt
                    ? new Date(employee.aiRecommendations.generatedAt).toLocaleString()
                    : '—'}
                </p>
              </div>
            ) : (
              <p style={{ marginTop: 12 }}>No AI recommendation generated yet.</p>
            )}
          </div>

          <hr />

          <div className="detail-section">
            <h3>Danger Zone</h3>
            <button className="btn-small btn-danger" onClick={handleDelete} disabled={loading}>
              Delete Employee
            </button>
          </div>
        </div>
      )}

      {!loading && !employee && !error && <p>No employee found.</p>}
    </div>
  );
}

