import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Pages.css';

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({
    department: '',
    name: '',
    minScore: '',
  });
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) {
    return navigate('/login');
  }

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await employeeAPI.getAllEmployees(page, 10);
      setEmployees(response.data.employees);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPage(1);

    try {
      const params = {};
      if (searchParams.department) params.department = searchParams.department;
      if (searchParams.name) params.name = searchParams.name;
      if (searchParams.minScore) params.minScore = searchParams.minScore;

      const response = await employeeAPI.searchEmployees(params);
      setEmployees(response.data.employees);
      setTotalPages(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete employee');
      }
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Employee Management</h1>
        <button
          className="btn-primary"
          onClick={() => navigate('/register-employee')}
        >
          + Employee Registration
        </button>
      </div>

      {/* Search Section */}
      <div className="card">
        <h3>Search & Filter</h3>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            value={searchParams.name}
            onChange={handleSearchChange}
          />
          <select name="department" value={searchParams.department} onChange={handleSearchChange}>
            <option value="">All Departments</option>
            <option>Development</option>
            <option>HR</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Operations</option>
            <option>Finance</option>
          </select>
          <input
            type="number"
            name="minScore"
            placeholder="Min Score"
            min="0"
            max="100"
            value={searchParams.minScore}
            onChange={handleSearchChange}
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setSearchParams({ department: '', name: '', minScore: '' });
              fetchEmployees();
            }}
          >
            Clear
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Employees Table */}
      <div className="card">
        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No employees found</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="employees-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Performance Score</th>
                    <th>Experience (Years)</th>
                    <th>Skills</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee._id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.department}</td>
                      <td>
                        <span className={`score score-${employee.performanceScore > 80 ? 'high' : 'medium'}`}>
                          {employee.performanceScore}
                        </span>
                      </td>
                      <td>{employee.experience}</td>
                      <td>{employee.skills.join(', ')}</td>
                      <td>
                        <button
                          className="btn-small"
                          onClick={() => navigate(`/employee/${employee._id}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn-small btn-danger"
                          onClick={() => handleDelete(employee._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn-secondary"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
