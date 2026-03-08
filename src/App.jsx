import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import Dashboard from './Dashboard';
import './styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on initial load
    const storedUser = localStorage.getItem('basketball_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
    setLoading(false);
  }, []);

  const handleUserSubmit = (userData) => {
    setUser(userData);
    localStorage.setItem('basketball_user', JSON.stringify(userData));
  };

  const handleReset = () => {
    setUser(null);
    localStorage.removeItem('basketball_user');
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Entrenador de Baloncesto</h1>
        <p className="subtitle">Tu plan de mejora técnica y mental</p>
      </header>

      <main>
        {!user ? (
          <UserForm onSubmit={handleUserSubmit} />
        ) : (
          <Dashboard user={user} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;

