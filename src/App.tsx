import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import type { Recipe } from './types/Recipe';

function App() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);


  const addToFavorites = (recipe: Recipe) => {
    setFavoriteRecipes(prev =>
      prev.some(r => r.id === recipe.id) ? prev : [...prev, recipe]
    );
  };

  const removeFromFavorites = (id: number) => {
    setFavoriteRecipes(prev => prev.filter(r => r.id !== id));
  };

  return (
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
    
  );
}

export default App;
