import { createContext, useContext, useState } from 'react';
import { quizCategories as defaultQuizData } from '../data/quizData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [quizData, setQuizData] = useState(() => {
    const savedQuizData = localStorage.getItem('quizData');
    return savedQuizData ? JSON.parse(savedQuizData) : defaultQuizData;
  });

  const [quizResults, setQuizResults] = useState(() => {
    const savedResults = localStorage.getItem('quizResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    const allResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const userResults = allResults.filter(result => result.userId === userData.id);
    setQuizResults(userResults);
  };

  const logout = () => {
    setUser(null);
    setQuizResults([]);
    localStorage.removeItem('user');
  };

  const deleteAccount = () => {
    if (!user) return;

    // Remove user from users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter(u => u.id !== user.id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Remove user's quiz results
    const allResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const updatedResults = allResults.filter(result => result.userId !== user.id);
    localStorage.setItem('quizResults', JSON.stringify(updatedResults));

    // Remove current user session
    localStorage.removeItem('user');
    setUser(null);
    setQuizResults([]);
  };

  const addQuizResult = (result) => {
    if (!user) return;
    
    const newResult = {
      ...result,
      userId: user.id,
      date: new Date().toISOString()
    };

    const allResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const updatedResults = [...allResults, newResult];
    localStorage.setItem('quizResults', JSON.stringify(updatedResults));

    const userResults = updatedResults.filter(r => r.userId === user.id);
    setQuizResults(userResults);
  };

  const updateProfile = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      deleteAccount,
      quizResults, 
      addQuizResult,
      updateProfile,
      quizData,
      setQuizData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);