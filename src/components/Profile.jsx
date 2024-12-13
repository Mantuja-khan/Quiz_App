import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { user, quizResults, updateProfile, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg';

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteAccount();
      navigate('/login');
    }
  };

  const getQuizCategories = () => {
    const categories = {};
    quizResults.forEach(result => {
      if (!categories[result.category]) {
        categories[result.category] = {
          attempts: 0,
          totalScore: 0,
          bestScore: 0
        };
      }
      categories[result.category].attempts += 1;
      categories[result.category].totalScore += result.percentage;
      categories[result.category].bestScore = Math.max(
        categories[result.category].bestScore,
        result.percentage
      );
    });
    return categories;
  };

  const categories = getQuizCategories();

  return (
    <div className="profile-container">
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Back to Home
      </button>

      <div className="profile-header">
        <div className="profile-image-container">
          <img 
            src={user.profilePic || defaultAvatar} 
            alt={user.name}
            className="profile-avatar"
          />
          <label className="image-upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            Change Photo
          </label>
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <button 
            onClick={handleDeleteAccount}
            className="delete-account-button"
          >
            Delete Account
          </button>
        </div>
      </div>

      <div className="profile-sections">
        <div className="section categories-section">
          <h2>Quiz Categories Performance</h2>
          <div className="categories-grid">
            {Object.entries(categories).map(([category, stats]) => (
              <div key={category} className="category-card">
                <h3>{category}</h3>
                <div className="category-stats">
                  <p>Attempts: {stats.attempts}</p>
                  <p>Average Score: {(stats.totalScore / stats.attempts).toFixed(1)}%</p>
                  <p>Best Score: {stats.bestScore.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section results-section">
          <h2>Recent Quiz Results</h2>
          <div className="results-grid">
            {quizResults.slice(-3).reverse().map((result, index) => (
              <div key={index} className="result-card">
                <div className="result-info">
                  <h3>{result.category}</h3>
                  <p className="result-date">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                  <p className="result-score">
                    Score: {result.percentage.toFixed(1)}%
                  </p>
                </div>
                <div className="result-chart">
                  <PieChart width={150} height={150}>
                    <Pie
                      data={[
                        { name: 'Correct', value: result.correct },
                        { name: 'Incorrect', value: result.incorrect },
                        { name: 'Skipped', value: result.skipped }
                      ]}
                      cx={75}
                      cy={75}
                      innerRadius={30}
                      outerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {['#22c55e', '#ef4444', '#94a3b8'].map((color, i) => (
                        <Cell key={`cell-${i}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;