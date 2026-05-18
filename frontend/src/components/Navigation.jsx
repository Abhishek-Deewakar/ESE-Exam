import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navigation.css';

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Employee Analytics</h2>
        </div>

        <ul className="nav-menu">
          <li>
            <button className="nav-link" onClick={() => navigate('/employees')}>
              Employees
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => navigate('/add-employee')}>
              Add Employee
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => navigate('/recommendations')}>
              AI Recommendations
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => navigate('/analytics')}>
              Analytics
            </button>
          </li>
        </ul>

        <div className="nav-user">
          <span className="user-info">{user?.name} ({user?.role})</span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
