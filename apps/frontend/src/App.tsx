import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignIn, useAuth } from '@clerk/clerk-react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import type { Recipe } from '../../../shared/types/Recipe';
import { setClerkTokenGetter } from './lib/clerkAuth';

const FAVORITES_STORAGE_KEY = 'favoriteRecipes';

function App() {
  const { getToken } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    try {
      return JSON.parse(storedFavorites) as Recipe[];
    } catch {
      window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteRecipes)
    );
  }, [favoriteRecipes]);

  useEffect(() => {
    setClerkTokenGetter(getToken);

    return () => {
      setClerkTokenGetter(async () => null);
    };
  }, [getToken]);


  const addToFavorites = (recipe: Recipe) => {
    setFavoriteRecipes(prev =>
      prev.some(r => r.id === recipe.id) ? prev : [...prev, recipe]
    );
  };

  const removeFromFavorites = (id: number) => {
    setFavoriteRecipes(prev => prev.filter(r => r.id !== id));
  };

  return (
    <>
      <SignedOut>
        <main className="auth-page">
          <div className="auth-card">
            <h1>Recipe Management System</h1>
            <p>Sign in with your email to manage recipes, favorites, and custom dishes.</p>
            <SignIn routing="hash" fallbackRedirectUrl="/" signUpForceRedirectUrl="/" />
          </div>
        </main>
      </SignedOut>

      <SignedIn>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    favoriteRecipes={favoriteRecipes}
                    addToFavorites={addToFavorites}
                  />
                }
              />

              <Route
                path="/favorites"
                element={
                  <Favorites
                    favoriteRecipes={favoriteRecipes}
                    removeFromFavorites={removeFromFavorites}
                  />
                }
              />

              <Route path="/add-recipe" element={<AddRecipe />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </SignedIn>
    </>
  );
}

export default App;
