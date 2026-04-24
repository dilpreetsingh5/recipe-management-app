import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { ClerkLoaded, ClerkLoading, useAuth } from '@clerk/clerk-react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import { setClerkTokenGetter } from './lib/clerkAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  const { getToken } = useAuth();

  useLayoutEffect(() => {
    setClerkTokenGetter(getToken);

    return () => {
      setClerkTokenGetter(async () => null);
    };
  }, [getToken]);

  return (
    <>
      <ClerkLoading>
        <main className="auth-page">
          <div className="auth-card">
            <h1>Loading…</h1>
          </div>
        </main>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route
                path="/"
                element={
                  <Home />
                }
              />

              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-recipe"
                element={
                  <ProtectedRoute>
                    <AddRecipe />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </ClerkLoaded>
    </>
  );
}

export default App;
