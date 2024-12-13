import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Quiz.css';

function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { addQuizResult, quizData } = useAuth();
  const category = quizData.find(cat => cat.id === parseInt(categoryId));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const handleAnswer = (answer) => {
    if (!answeredQuestions.has(currentQuestion)) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion]: answer
      }));
      setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
    }
  };

  const handleSubmit = () => {
    const correct = category.questions.filter((q, index) => 
      answers[index] === q.correctAnswer
    ).length;
    
    const incorrect = category.questions.filter((q, index) => 
      answers[index] && answers[index] !== q.correctAnswer
    ).length;
    
    const skipped = category.questions.length - Object.keys(answers).length;
    
    const results = {
      category: category.name,
      questions: category.questions,
      answers,
      correct,
      incorrect,
      skipped,
      totalQuestions: category.questions.length,
      percentage: (correct / category.questions.length) * 100
    };

    addQuizResult(results);
    navigate('/results', { state: { results } });
  };

  if (!category) return <div>Category not found</div>;

  const question = category.questions[currentQuestion];
  const isAnswered = answeredQuestions.has(currentQuestion);

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <span className="quiz-progress">
            Question {currentQuestion + 1} of {category.questions.length}
          </span>
          <span className="quiz-topic">
            Topic: {question.topic}
          </span>
        </div>
        
        <h2 className="quiz-question">{question.question}</h2>
        
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`option-button ${
                answers[currentQuestion] === option ? 'selected' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="quiz-warning">
            <p>You have already answered this question. Move to the next one.</p>
          </div>
        )}

        <div className="quiz-navigation">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="nav-button secondary"
          >
            Previous
          </button>
          
          {currentQuestion === category.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="nav-button primary"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => 
                Math.min(category.questions.length - 1, prev + 1)
              )}
              className="nav-button primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;