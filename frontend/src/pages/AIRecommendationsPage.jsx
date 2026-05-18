import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Pages.css';

export default function AIRecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bulk');
  const [department, setDepartment] = useState('Development');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    return navigate('/login');
  }

  useEffect(() => {
    if (activeTab === 'bulk') {
      fetchBulkRecommendations();
    } else if (activeTab === 'ranking') {
      fetchRankings();
    } else if (activeTab === 'promotion') {
      fetchPromotionCandidates();
    }
  }, [activeTab]);

  const fetchBulkRecommendations = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await aiAPI.generateBulkRecommendations();
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  const fetchRankings = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await aiAPI.rankEmployees();
      setRecommendations(response.data.ranking || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch rankings');
    } finally {
      setLoading(false);
    }
  };

  const fetchPromotionCandidates = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await aiAPI.getPromotionCandidates();
      setRecommendations(response.data.candidates || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch promotion candidates');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentRecommendations = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await aiAPI.getDepartmentRecommendations(department);
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch department recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>AI Recommendations & Analytics</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'bulk' ? 'active' : ''}`}
          onClick={() => setActiveTab('bulk')}
        >
          Bulk Recommendations
        </button>
        <button
          className={`tab ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => setActiveTab('ranking')}
        >
          Employee Rankings
        </button>
        <button
          className={`tab ${activeTab === 'promotion' ? 'active' : ''}`}
          onClick={() => setActiveTab('promotion')}
        >
          Promotion Candidates
        </button>
        <button
          className={`tab ${activeTab === 'department' ? 'active' : ''}`}
          onClick={() => setActiveTab('department')}
        >
          By Department
        </button>
      </div>

      {/* Content */}
      <div className="card">
        {/* Department Filter */}
        {activeTab === 'department' && (
          <div className="department-selector">
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option>Development</option>
              <option>HR</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Operations</option>
              <option>Finance</option>
            </select>
            <button className="btn-primary" onClick={fetchDepartmentRecommendations}>
              Load Recommendations
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading recommendations...</p>
        ) : recommendations.length === 0 ? (
          <p>No recommendations available</p>
        ) : (
          <div className="recommendations-grid">
            {recommendations.map((item, index) => (
              <div key={index} className="recommendation-card">
                {activeTab === 'ranking' ? (
                  <>
                    <h3>#{item.rank} - {item.name}</h3>
                    <p><strong>Performance Score:</strong> {item.performanceScore}</p>
                    <p><strong>Experience:</strong> {item.experience} years</p>
                  </>
                ) : activeTab === 'promotion' ? (
                  <>
                    <h3>{item.name}</h3>
                    <p><strong>Department:</strong> {item.department}</p>
                    <p><strong>Score:</strong> {item.performanceScore}</p>
                    <p><strong>Recommendation:</strong> {item.promotionRecommendation}</p>
                  </>
                ) : (
                  <>
                    <h3>{item.name}</h3>
                    <div className="recommendation-details">
                      <div className="detail-section">
                        <h4>Promotion Suggestion</h4>
                        <p>{item.recommendation?.promotionSuggestion || 'Pending analysis'}</p>
                      </div>

                      {item.recommendation?.trainingSuggestions && (
                        <div className="detail-section">
                          <h4>Training Suggestions</h4>
                          <ul>
                            {item.recommendation.trainingSuggestions.map((training, idx) => (
                              <li key={idx}>{training}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.recommendation?.skillGaps && (
                        <div className="detail-section">
                          <h4>Skill Gaps</h4>
                          <ul>
                            {item.recommendation.skillGaps.map((skill, idx) => (
                              <li key={idx}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.recommendation?.feedback && (
                        <div className="detail-section">
                          <h4>Feedback</h4>
                          <p>{item.recommendation.feedback}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
