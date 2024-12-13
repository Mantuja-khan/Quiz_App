import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminPanel.css';

function AdminPanel() {
  const { user, quizData, addCategory, updateCategory, deleteCategory, addQuestion, updateQuestion, deleteQuestion } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    topic: ''
  });

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      addCategory({
        name: newCategory.name,
        questions: []
      });
      setNewCategory({ name: '' });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(categoryId);
      setSelectedCategory(null);
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (selectedCategory && newQuestion.question.trim()) {
      addQuestion(selectedCategory.id, newQuestion);
      setNewQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        topic: ''
      });
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(selectedCategory.id, questionId);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>
      
      <div className="admin-grid">
        <div className="categories-section">
          <h2>Categories</h2>
          <form onSubmit={handleAddCategory} className="add-form">
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ name: e.target.value })}
              placeholder="New category name"
              className="admin-input"
            />
            <button type="submit" className="admin-button">Add Category</button>
          </form>

          <div className="categories-list">
            {quizData.map(category => (
              <div 
                key={category.id} 
                className={`category-item ${selectedCategory?.id === category.id ? 'selected' : ''}`}
              >
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="category-button"
                >
                  {category.name}
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {selectedCategory && (
          <div className="questions-section">
            <h2>Questions for {selectedCategory.name}</h2>
            <form onSubmit={handleAddQuestion} className="add-form">
              <input
                type="text"
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                placeholder="Question"
                className="admin-input"
              />
              {newQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="admin-input"
                />
              ))}
              <input
                type="text"
                value={newQuestion.correctAnswer}
                onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                placeholder="Correct Answer"
                className="admin-input"
              />
              <input
                type="text"
                value={newQuestion.topic}
                onChange={(e) => setNewQuestion({ ...newQuestion, topic: e.target.value })}
                placeholder="Topic"
                className="admin-input"
              />
              <button type="submit" className="admin-button">Add Question</button>
            </form>

            <div className="questions-list">
              {selectedCategory.questions.map(question => (
                <div key={question.id} className="question-item">
                  <h3>{question.question}</h3>
                  <ul>
                    {question.options.map((option, index) => (
                      <li key={index} className={option === question.correctAnswer ? 'correct' : ''}>
                        {option}
                      </li>
                    ))}
                  </ul>
                  <p>Topic: {question.topic}</p>
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="delete-button"
                  >
                    Delete Question
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;