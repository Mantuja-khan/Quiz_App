import { useLocation, Link, Navigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { learningResources } from '../data/quizData';
import '../styles/Results.css';

function Results() {
  const location = useLocation();
  const { user } = useAuth();
  const { results } = location.state || {};

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!results) {
    return <Navigate to="/" />;
  }

  const COLORS = ['#22c55e', '#ef4444', '#94a3b8'];

  const data = [
    { name: 'Correct', value: results.correct },
    { name: 'Incorrect', value: results.incorrect },
    { name: 'Skipped', value: results.skipped }
  ];

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Very Good';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const getSuggestions = () => {
    const incorrectTopics = new Set();
    results.questions.forEach((question, index) => {
      if (results.answers[index] !== question.correctAnswer) {
        incorrectTopics.add(question.topic);
      }
    });

    return Array.from(incorrectTopics).map(topic => ({
      topic,
      resources: learningResources[topic] || []
    }));
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <div className="results-header">
          <h1>Quiz Results - {results.category}</h1>
          <p className="results-date">
            {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="results-grid">
          <div className="stat-card correct">
            <h3>Correct Answers</h3>
            <p className="stat-value">{results.correct}</p>
          </div>
          <div className="stat-card incorrect">
            <h3>Incorrect Answers</h3>
            <p className="stat-value">{results.incorrect}</p>
          </div>
          <div className="stat-card skipped">
            <h3>Skipped Questions</h3>
            <p className="stat-value">{results.skipped}</p>
          </div>
          <div className="stat-card score">
            <h3>Final Score</h3>
            <p className="stat-value">
              {results.percentage.toFixed(1)}% - {getGrade(results.percentage)}
            </p>
          </div>
        </div>

        <div className="chart-container">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="suggestions-section">
          <h2>Improvement Suggestions</h2>
          {getSuggestions().map(({ topic, resources }) => (
            <div key={topic} className="suggestion-card">
              <h3>{topic}</h3>
              <ul className="resource-list">
                {resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <Link to="/" className="try-again-button">
            Try Another Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Results;