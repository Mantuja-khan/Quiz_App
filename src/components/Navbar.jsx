import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg';

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-links">
          <Link to="/" className="nav-brand">Quiz App</Link>
          
          <div className="nav-user-section">
            {user ? (
              <div className="nav-profile">
                <button 
                  className="profile-button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img 
                    src={user.profilePic || defaultAvatar} 
                    alt={user.name}
                    className="profile-image"
                  />
                </button>
                
                {showProfileMenu && (
                  <div className="profile-menu">
                    <div className="menu-header">
                      <img 
                        src={user.profilePic || defaultAvatar}
                        alt={user.name}
                        className="menu-profile-image"
                      />
                      <div className="menu-user-info">
                        <span className="menu-username">{user.name}</span>
                        <span className="menu-email">{user.email}</span>
                      </div>
                    </div>
                    <div className="menu-items">
                      <Link to="/profile" className="menu-item">
                        <span className="menu-icon">👤</span>
                        Profile
                      </Link>
                      {user.isAdmin && (
                        <Link to="/admin" className="menu-item">
                          <span className="menu-icon">⚙️</span>
                          Admin Panel
                        </Link>
                      )}
                      <button onClick={logout} className="menu-item logout">
                        <span className="menu-icon">🚪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth-buttons">
                <Link to="/login" className="nav-button primary">Login</Link>
                <Link to="/signup" className="nav-button primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;