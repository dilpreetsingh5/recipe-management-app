import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignIn, useAuth } from '@clerk/clerk-react';
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
                  <Home
                    favoriteRecipes={favoriteRecipes}
                    addToFavorites={addToFavorites}
                  />
                }
              />

              <Route
                path="/favorites"
                element={
                  <>
                    <SignedOut>
                      <main className="auth-page">
                        <div className="auth-card">
                          <h1>Sign in required</h1>
                          <p>Sign in to view and manage your favorites.</p>
                          <SignIn routing="hash" fallbackRedirectUrl="/favorites" signUpForceRedirectUrl="/favorites" />
                        </div>
                      </main>
                    </SignedOut>

                    <SignedIn>
                      <Favorites
                        favoriteRecipes={favoriteRecipes}
                        removeFromFavorites={removeFromFavorites}
                      />
                    </SignedIn>
                  </>
                }
              />

              <Route
                path="/add-recipe"
                element={
                  <>
                    <SignedOut>
                      <main className="auth-page">
                        <div className="auth-card">
                          <h1>Sign in required</h1>
                          <p>Sign in to submit your own recipes.</p>
                          <SignIn routing="hash" fallbackRedirectUrl="/add-recipe" signUpForceRedirectUrl="/add-recipe" />
                        </div>
                      </main>
                    </SignedOut>

                    <SignedIn>
                      <AddRecipe />
                    </SignedIn>
                  </>
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
