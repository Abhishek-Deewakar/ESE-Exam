import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Pages.css';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    return navigate('/login');
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await employeeAPI.getAnalytics();
      setAnalytics(response.data.analytics);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="page-container">
        <p>No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <button className="btn-primary" onClick={fetchAnalytics}>
          Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Employees</h3>
          <div className="summary-value">{analytics.totalEmployees}</div>
        </div>

        <div className="summary-card">
          <h3>Average Performance Score</h3>
          <div className="summary-value">
            {analytics.performanceStats?.avgScore?.toFixed(1) || 'N/A'}
          </div>
        </div>

        <div className="summary-card">
          <h3>Highest Score</h3>
          <div className="summary-value">{analytics.performanceStats?.maxScore || 'N/A'}</div>
        </div>

        <div className="summary-card">
          <h3>Lowest Score</h3>
          <div className="summary-value">{analytics.performanceStats?.minScore || 'N/A'}</div>
        </div>
      </div>

      {/* Department Statistics */}
      <div className="card">
        <h2>Department Statistics</h2>
        {analytics.departmentStats && analytics.departmentStats.length > 0 ? (
          <div className="table-responsive">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Employees</th>
                  <th>Average Performance</th>
                </tr>
              </thead>
              <tbody>
                {analytics.departmentStats.map((dept, idx) => (
                  <tr key={idx}>
                    <td>{dept._id}</td>
                    <td>{dept.count}</td>
                    <td>
                      <span className={`score ${dept.avgPerformance > 80 ? 'score-high' : 'score-medium'}`}>
                        {dept.avgPerformance.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No department data available</p>
        )}
      </div>

      {/* Top Performers */}
      <div className="card">
        <h2>Top 5 Performers</h2>
        {analytics.topPerformers && analytics.topPerformers.length > 0 ? (
          <div className="top-performers-grid">
            {analytics.topPerformers.map((employee, idx) => (
              <div key={idx} className="performer-card">
                <div className="performer-rank">#{idx + 1}</div>
                <h3>{employee.name}</h3>
                <p className="performer-score">{employee.performanceScore} / 100</p>
                <p className="performer-dept">{employee.department}</p>
                <button
                  className="btn-small"
                  onClick={() => navigate(`/employee/${employee._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No top performers data available</p>
        )}
      </div>

      {/* Performance Distribution */}
      <div className="card">
        <h2>Performance Distribution</h2>
        <div className="performance-distribution">
          <div className="distribution-item">
            <div className="distribution-label">90-100 (Excellent)</div>
            <div className="distribution-bar">
              <div
                className="distribution-fill excellent"
                style={{
                  width: `${
                    ((analytics.topPerformers?.filter((e) => e.performanceScore >= 90).length || 0) /
                      analytics.totalEmployees) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="distribution-item">
            <div className="distribution-label">80-89 (Good)</div>
            <div className="distribution-bar">
              <div
                className="distribution-fill good"
                style={{
                  width: `${
                    ((analytics.topPerformers?.filter((e) => e.performanceScore >= 80 && e.performanceScore < 90).length || 0) /
                      analytics.totalEmployees) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="distribution-item">
            <div className="distribution-label">Below 80 (Average)</div>
            <div className="distribution-bar">
              <div
                className="distribution-fill average"
                style={{
                  width: `${
                    ((analytics.topPerformers?.filter((e) => e.performanceScore < 80).length || 0) /
                      analytics.totalEmployees) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
