import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AddRecipe from './pages/AddRecipe';
import './Nav.css';
import type { Recipe } from './types/Recipe';

function App() {
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

    const addToFavorites = (recipe: Recipe) => {
        setFavoriteRecipes(prev => [...prev, recipe]);
    };
    return (
    <BrowserRouter>
        <div className="app">
            <Header />
            <nav className="navigation">
                <Link to="/">Home</Link>
                <Link to="/favorites">MyFavorites</Link>
                <Link to="/add-recipe">AddRecipe</Link>
            </nav>

            <div className="app-main">
                <Routes>
                    <Route path="/" element={<Home favoriteRecipes={favoriteRecipes} addToFavorites={addToFavorites} />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/add-recipe" element={<AddRecipe />} />
                </Routes>
            </div>

            <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
