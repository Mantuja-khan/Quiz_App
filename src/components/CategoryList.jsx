import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/CategoryList.css';

export function CategoryList() {
  const { quizData } = useAuth();

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1 className="category-title">Choose a Quiz Category</h1>
      </div>
      
      <div className="categories-grid">
        {quizData.map((category) => (
          <Link
            key={category.id}
            to={`/quiz/${category.id}`}
            className="category-card"
          >
            <h2 className="category-title">{category.name}</h2>
            <p className="category-info">{category.questions.length} Questions</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;