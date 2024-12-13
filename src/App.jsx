import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import CategoryList from './components/CategoryList';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.isAdmin ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <PrivateRoute>
            <CategoryList />
          </PrivateRoute>
        } />
        <Route path="/quiz/:categoryId" element={
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        } />
        <Route path="/results" element={
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;