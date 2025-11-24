import {  useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, useRoutes, Link, Navigate } from 'react-router-dom';
import { Home, Profile, Login, Register, Splash } from './Pages';
import ProtectedRoute from './Auth/ProtectedRoute';
import { initAuthListener, isAuthenticated } from './utils/auth';

const RouterConfig = () => {
  useEffect(() => {
    const unsubscribe = initAuthListener((user) => {
    console.log('Auth state changed:', user ? 'Authenticated' : 'Not authenticated');

  });

  return () => unsubscribe();
}, []);

  return useRoutes([
    { path: '/', element: (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
    ) },
    { path: '/:eventId', element: (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
    ) },
    { path: '/login', element: isAuthenticated() ? <Navigate to="/" /> : <Login /> },
    { path: '/register', element: isAuthenticated() ? <Navigate to="/" /> : <Register /> },
    { path: '/profile', element: (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
    ) },
  ])
}

function App() {
  console.log('=== APP INITIALIZED ===');
  const [isSplashShown, setIsSplashShown] = useState(false);
  const defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE || 'en';

  useEffect(() => {
    setIsSplashShown(sessionStorage.getItem(process.env.REACT_APP_SPLASH_SHOWN_KEY) !== 'true');
    document.documentElement.dir = localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = localStorage.getItem('language') || defaultLanguage;
  }, []);

  if (isSplashShown) {
    return <Router>
        <Splash onComplete={() => setIsSplashShown(false)} />
      </Router>;
  }

  return (
    <div className="App">
      <Router>
        <RouterConfig />
      </Router>
    </div>
  );
}

export default App;
